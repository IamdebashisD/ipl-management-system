import crypto from "crypto"
import { decode } from "jsonwebtoken"
import ApiError from "../../common/utils/api-error.js"

import { 
    generateAccessToken, 
    generateRefreshToken, 
    generateResetToken, 
    verifyRefreshToken 
} from "../../common/utils/jwt.utils.js"

import User from "./auth.model.js"
import { 
    sendResetPasswordEmail, 
    sendVerificationEmail 
} from "../../common/config/email.js"
import fs from "node:fs"
import imagekit from "../../common/config/imageKit.js"



const hashToken = (token) => 
    crypto.createHash("sha256").update(token).digest("hex")


const register = async ({ name, email, password, role }) => {
    
    const existingUser = await User.findOne({ email })
    if (existingUser) throw ApiError.conflict("Email already exists")

    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    })
    // TODO: Send an email to user with token: rawToken

    try {
        await sendVerificationEmail(email, rawToken)
    } catch(error) {
        console.log("somethign went wrong...", error)
    }
    

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken

    return userObj
}

const login = async ({ email, password }) => {
    // take email and find user in db
    // then check if password is correct
    // check if verified or not

    const user = await User.findOne({ email }).select("+password") 
    console.log(user)
    if (!user) throw ApiError.unauthorized("Invalid Email or password")

    // somehow I will check password
    const isMatch = await user.comparePassword(password)
    console.log(user)
    if (!isMatch) throw ApiError.unauthorized("Invalid Email or Password!")

    // if (!user.isVerified) {
    //     throw ApiError.forbidden("Please verify your email before loggin")
    // }

    const accessToken = generateAccessToken({ id: user._id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashToken(refreshToken)
    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    // TODO: need to send to the cookies

    return {user: userObj, accessToken, refreshToken}
}

const refresh = async (token) => {
    if (!token) throw ApiError.unauthorized("Refresh token missing")
    
    const decoded = verifyRefreshToken(token)

    const user = await User.findById(decoded.id).select("+refreshToken")
    if (!user) throw ApiError.unauthorized("User not found")

    if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token")
    }
    
    const accessToken = generateAccessToken({ id: user._id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave: false})

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return { accessToken, refreshToken }
}

const logout = async (userId) => {
    // const user = await User.findById(userId)
    // if (!user) throw ApiError.unauthorized("User not found")
    
    // user.refreshToken = undefined
    // await user.save({validateBeforeSave: false})

    await User.findByIdAndUpdate(userId, {refreshToken: null})
}

const forgotPassword = async (email) => {
    const user = await User.findOne({ email })
    if (!user) throw ApiError.notFound("No account with that email")

    const {rawToken, hashedToken} = generateResetToken()
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save()

    // TODO: mail bhejna nhi aata
    try {
        await sendResetPasswordEmail(user.email, rawToken)
    } catch(error){
        console.log("Failed to send email for reset password ", error)
    }
}

const resetPassword = async ({ token, newPassword }) => {
    
    const hashedToken = hashToken(token)

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    }).select("+password")

    if(!user) throw ApiError.unauthorized("Token is invalid or expired")
    
    // Update password
    user.password = newPassword

    //clear reset fields
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    return {message: "Password reset successful"}
}

const verifyEmail = async (token) => {
    const hashedToken = hashToken(token)
    const user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken")

    if (!user) throw ApiError.unauthorized("Invalid or expired token")

    if (user.isVerified) throw ApiError.badRequest("User already verified")

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken
    return userObj
}

const getMe = async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw ApiError.notFound("User not found")
    return user
}


const avatarUpload = async (userId, file) => {
    try {
        const fileStream = fs.createReadStream(file.path)
        const uploadResponse = await imagekit.files.upload({
            file: fileStream,
            fileName: file.filename,
            folder: "/user-avatars"
        })

        await User.findByIdAndUpdate(
            userId, 
            {avatar: uploadResponse.url},
            {new: true}
        )

        fs.unlinkSync(file.path)
        
        return {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId
        } 

    } catch (error) {
        try {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
        } catch (error) {
            console.log("Error deleting temp file:", error)
        }
        throw error
    }
}


export { 
    register,
    login,
    refresh,
    logout,
    forgotPassword,
    resetPassword, 
    getMe,
    verifyEmail,
    avatarUpload
}