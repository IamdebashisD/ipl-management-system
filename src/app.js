import path from "path"
import fs from "node:fs"
import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"

import ApiError from "./common/utils/api-error.js"
import ApiResponse from "./common/utils/api-response.js"
import errorHandler from "./common/middleware/error.middleware.js"

import multer from 'multer'

import authRoute from "./modules/auth/auth.routes.js"

import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import playerRoutes from "./modules/ipl-ms/routes/player.routes.js"
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js"
import sponsorRoutes from "./modules/ipl-ms/routes/sponsor.routes.js"
import broadcasterRoutes from "./modules/ipl-ms/routes/broadcaster.routes.js"
import teamBroadcasterRoutes from "./modules/ipl-ms/routes/team-broadcaster.routes.js"
import teamSponsorRoutes from "./modules/ipl-ms/routes/team-sponsor.routes.js"
import playerStatsRoutes from "./modules/ipl-ms/routes/player-stats.routes.js"
import matchRoutes from "./modules/ipl-ms/routes/match.routes.js"


const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     console.log(file)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

//     // const ext = file.mimetype.split('/')[1]
//     const ext = path.extname(file.originalname)
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext)
//   }
// })


// const storage = multer.memoryStorage()

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5   //5mb
//   },
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/png", "image/jpeg", "application/pdf", "image/webp"]

//     if (allowed.includes(file.mimetype)) {
//       cb(null, true)
//     } else {
//       cb(new Error("File type not supported"), false)
//     }
//   }
// })

// ---------- when you use multer.memoryStorage()---------------------
// app.post("/upload", upload.single("file"), (req, res) => {
//     const ext = path.extname(req.file.originalname)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const fileName = `image-${uniqueSuffix}${ext}`
//     const filePath = path.join("public/uploads", fileName)
    
//     fs.writeFileSync(filePath, req.file.buffer)
    
//     ApiResponse.ok(res, "File uploaded")
// })

// app.post("/upload", upload.fields([{name: "avatar", maxCount: 1}]), (req, res) => {
//     console.log(req.files)
    
//     ApiResponse.ok(res, "File uploaded")
// })

// app.post("/upload", (req, res) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       if (err.code === "LIMIT_FILE_SIZE") {
//         return res.status(400).send("File too large")
//       }
//       return res.status(400).send("Upload failed!")
//     }
//     ApiResponse.ok(res, "File Uploaded Successfully")
//   })
// })



app.use("/api/auth", authRoute)

app.use("/api/owners", ownerRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/sponsors", sponsorRoutes)
app.use("/api/broadcaster", broadcasterRoutes)
app.use("/api/team-broadcaster", teamBroadcasterRoutes)
app.use("/api/team-sponsor", teamSponsorRoutes)
app.use("/api/player-stats", playerStatsRoutes)
app.use("/api/match", matchRoutes)



// Health endpoint
app.get("/health", (req, res) => {
    res
        .status(200)
        .json({
            message: "Health is OK!"
        })
})
// Test endpoint
app.post("/test", (req, res) => {
    console.log("Test body:", req.body);
    res.status(200).json({ received: req.body });
});

app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`)
})

app.use(errorHandler)

export default app