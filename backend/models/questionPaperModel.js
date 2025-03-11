import mongoose from "mongoose";

const questionPaperSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    partA: [{ question: String, marks: Number }],
    partB: [{ question: String, marks: Number }],
    createdAt: { type: Date, default: Date.now },
});

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

export default QuestionPaper;
