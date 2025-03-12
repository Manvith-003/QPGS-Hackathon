import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"; 
import questionPaperRoutes from "./routes/questionPaperRoutes.js"; 

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questionPapers", questionPaperRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
