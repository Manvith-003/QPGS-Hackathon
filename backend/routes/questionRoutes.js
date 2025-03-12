import express from "express";
import Questions from "../models/questionModel.js";


const router = express.Router();

// ✅ GET - Fetch questions
router.get("/", async (req, res) => {
    try {
        const questions = await Questions.find(); // Fetch all records
        res.json(questions);
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ POST - Add a new question
router.post("/", async (req, res) => {
    try {
        const newQuestion = new Questions(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("❌ Error adding question:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ PUT - Update an existing question
router.put("/:id", async (req, res) => {
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(updatedQuestion);
    } catch (error) {
        console.error("❌ Error updating question:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ DELETE - Delete a question
router.delete("/:id", async (req, res) => {
    try {
        const deletedQuestion = await Questions.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json({ message: "✅ Question deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting question:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
