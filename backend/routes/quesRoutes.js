import express from "express";
import Questions from "../models/questionModel.js";

const router = express.Router();

// ✅ Dynamic GET API to fetch filtered questions
router.get("/", async (req, res) => {
    try {
        const { subject, module, levels, marks, part, limit } = req.query;
        let query = {};

        // Add filters only if they are provided in the request
        if (subject) query.subject = subject;
        if (module) query.module = parseInt(module); // Ensure number conversion
        if (levels) query.levels = levels;
        if (marks) query.marks = parseInt(marks);
        if (part) query.part = part;

        // Convert limit to a number (default to 10 if not provided)
        const queryLimit = limit ? parseInt(limit) : 10;

        console.log("🔍 Filtering questions with:", query, "Limit:", queryLimit);

        // Fetch filtered questions from MongoDB
        const questions = await Questions.find(query).limit(queryLimit);
        res.json(questions);
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
