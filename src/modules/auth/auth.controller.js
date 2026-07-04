import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js"

const register = async (req, res) => {
    //something
    const user = await authService.register(req.body)
    ApiResponse.created(res, "Registration Success", user)
}

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body)
   
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // 15 Minutes
    })

    ApiResponse.ok(res, "Login Successful", { user, accessToken })
}

const refreshToken = async (req, res) => {
    const token = req.cookie?.refreshToken

    const { accessToken } = await authService.refresh(token)

    ApiResponse.ok(res, "Token refreshed", { accessToken })
} 

const logout = async (req, res) => {
    await authService.logout(req.user.id)

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    ApiResponse.ok(res, "Logout Success")
}

const verifyEmail = async (req, res) => {
    const { token } = req.query    // token from url => ` http://localhost:3000/verify-email?token=${token} `

    if (!token) throw ApiError.unauthorized("Token is missing")
    
    const user = await authService.verifyEmail(token)

    ApiResponse.ok(res, "Email verified successfully", user)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    await authService.forgotPassword(email)

    ApiResponse.ok(res, "Reset email sent")
}

const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    if (!token) {
        throw ApiError.badRequest("Token is misssing")
    }

    await authService.resetPassword({token, newPassword: password})

    ApiResponse.ok(res, "Password reset successful")
}

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id)
    ApiResponse.ok(res, "User Profile", user)
}

const uploadAvatar = async (req, res) => {
    try {
        const file = req.file

        if (!file) {
            return ApiError.badRequest(
                res, 
                "No file uploaded. Please send file with field name 'avatar'"
            )
        }

        const result = await authService.avatarUpload(req.user.id, file)
        
        return ApiResponse.ok(
            res, 
            "Avatar uploaded successfully", 
            { 
                avatarUrl: result.url 
            }
        )

    } catch (error) {
        
        console.log("Upload error:", error)
        return ApiError.internal(
            error.message || "Failed to upload avatar"
        )
        
    }
}

export { 
    register, 
    login,
    refreshToken,
    logout, 
    getMe, 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    uploadAvatar 
}