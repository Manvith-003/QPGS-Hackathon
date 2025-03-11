import React, { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
    const [formData, setFormData] = useState({
        subject: "",
        module: "",
        question: "",
        levels: "",
        marks: "",
        part: ""
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/questions", formData);
            alert("✅ Question added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("❌ Error adding question:", error);
            alert("⚠️ Failed to add question.");
        }
    };

    return (
        <div>
            <h2>Add a New Question</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                <input type="number" name="module" placeholder="Module" value={formData.module} onChange={handleChange} required />
                <input type="text" name="question" placeholder="Question" value={formData.question} onChange={handleChange} required />
                <input type="text" name="levels" placeholder="Difficulty Level" value={formData.levels} onChange={handleChange} required />
                <input type="number" name="marks" placeholder="Marks" value={formData.marks} onChange={handleChange} required />
                <input type="text" name="part" placeholder="Part" value={formData.part} onChange={handleChange} required />
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestion;
