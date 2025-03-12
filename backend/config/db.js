import mongoose from "mongoose";
import { mongoUrl } from "../utils/url.js";

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("✅ Connected to MongoDB...");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
    }
};

export { connectDb };
