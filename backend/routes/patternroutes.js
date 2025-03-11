import express from "express";
import Questions from "../models/questionModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("✅ API request received at /api/questions");
    try {
        const questions = await Questions.find();
        console.log("✅ Fetched Questions:", questions);
        res.json(questions);
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;

