import React, { useState } from "react";
import axios from "axios";

const FilteredQuestions = () => {
    const [filters, setFilters] = useState({
        subject: "",
        module: "",
        levels: "",
        marks: "",
        part: "",
        limit: "10"
    });

    const [questions, setQuestions] = useState([]);

    // Handle input changes
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Fetch filtered questions
    const fetchQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/questions", {
                params: filters // Send filters as query parameters
            });

            setQuestions(response.data);
        } catch (error) {
            console.error("❌ Error fetching filtered questions:", error);
        }
    };

    return (
        <div>
            <h2>Filter Questions</h2>
            <div>
                <input type="text" name="subject" placeholder="Subject" value={filters.subject} onChange={handleChange} />
                <input type="number" name="module" placeholder="Module" value={filters.module} onChange={handleChange} />
                <input type="text" name="levels" placeholder="Difficulty Level" value={filters.levels} onChange={handleChange} />
                <input type="number" name="marks" placeholder="Marks" value={filters.marks} onChange={handleChange} />
                <input type="text" name="part" placeholder="Part" value={filters.part} onChange={handleChange} />
                <input type="number" name="limit" placeholder="Limit" value={filters.limit} onChange={handleChange} />
                <button onClick={fetchQuestions}>Search</button>
            </div>

            <h3>Results:</h3>
            <ul>
                {questions.length > 0 ? (
                    questions.map((q) => (
                        <li key={q._id}>
                            <strong>{q.subject}</strong> (Module {q.module}) - {q.levels}, {q.marks} Marks, Part {q.part}
                            <p>Question: {q.question}</p>
                        </li>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </ul>
        </div>
    );
};

export default FilteredQuestions;
