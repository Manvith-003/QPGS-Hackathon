import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import questionPaperRoutes from "./routes/questionPaperRoutes.js"; // ✅ Import new route

const PORT = 3001;
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to Database
connectDb();

// ✅ Routes
app.use("/api/questions", questionRoutes);
app.use("/api/questionPapers", questionPaperRoutes); // ✅ Add question paper route

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
});
