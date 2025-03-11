import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const PORT = 3001;
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to Database
connectDb();

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
});
