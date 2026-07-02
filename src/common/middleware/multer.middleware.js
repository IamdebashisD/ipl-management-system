import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        // const ext = file.mimetype.split('/')[1]
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/gif", "image/webp"]

    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("File type not supported"), false)
    }
}



export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter
})