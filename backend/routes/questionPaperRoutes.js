import express from "express";
import QuestionPaper from "../models/questionPaperModel.js";

const router = express.Router();

// ✅ Save a Question Paper
router.post("/save", async (req, res) => {
    try {
        const { subject, partA, partB } = req.body;

        const newQuestionPaper = new QuestionPaper({
            subject,
            partA,
            partB,
            createdAt: new Date(),
        });

        await newQuestionPaper.save();
        res.status(201).json({ message: "✅ Question Paper Saved Successfully!" });
    } catch (error) {
        console.error("❌ Error saving question paper:", error);
        res.status(500).json({ message: "❌ Error saving question paper" });
    }
});

// ✅ Get Saved Question Papers
router.get("/getAll", async (req, res) => {
    try {
        const questionPapers = await QuestionPaper.find();
        res.status(200).json(questionPapers);
    } catch (error) {
        console.error("❌ Error fetching question papers:", error);
        res.status(500).json({ message: "❌ Error fetching question papers" });
    }
});

export default router;
