import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DBConnection = async () => {
    const MONGO_URL = process.env.MONGODB_URL;
    if(!MONGO_URL) {
        console.error("MONGODB_URL is not set in the environment variables");
        return;
    }
    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB Connection established successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB", error.message);
    }
};
