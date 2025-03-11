import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    subject: String,
    module: Number,
    question: String,
    levels:String,
    marks:Number,
    part:String
});

const Questions = mongoose.model("Questions", questionSchema, "questions");
export default Questions;
