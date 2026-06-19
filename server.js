import "dotenv/config.js"
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"

const PORT = process.env.PORT || 5000

const start = async () => {
    // connect to DB
    await connectDB()

    app.listen(PORT, () => {
        console.log(`server is running at: http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err) => {
    console.log("Failed to start server", err)
    process.exit(1)
})


// if (PORT){
//     console.log(PORT)
// } else {
//     console.log("PORT is missing!")
// }