import "dotenv/config"
import mongoose from "mongoose";

const connectDB = async () => {

    console.log("MONGODB_URI exists?", !!process.env.MONGODB_URI);
    console.log("First 50 chars:", process.env.MONGODB_URI?.substring(0, 50));
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, { tls: true })
        console.log(`MongoDB connected ${connection.connection.host}`)
    } catch(error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}

export default connectDB