"use server"
import mongoose from "mongoose";
import "dotenv/config"


export const CreateServer = async()=>{
    const URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(URI)
        console.log("Server connected Successfully")
    } catch (error) {
        console.log("Server connection failed")
        process.exit(1);
    }
}