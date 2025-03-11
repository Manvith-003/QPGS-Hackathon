import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const GenerateQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionPaper, setQuestionPaper] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/questions");
        const uniqueSubjects = [...new Set(response.data.map((q) => q.subject))];
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("❌ Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = async (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);

    try {
      const response = await axios.get(`http://localhost:3001/api/questions?subject=${subject}`);
      setQuestions(response.data);
      setQuestionPaper(null);
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
    }
  };

  const generateQuestionPaper = () => {
    if (questions.length === 0) {
      alert("No questions available for this subject.");
      return;
    }

    const partAQuestions = questions.filter((q) => q.marks === 2);
    const partBQuestions = questions.filter((q) => q.marks === 8);

    if (partAQuestions.length < 5 || partBQuestions.length < 5) {
      alert("Not enough questions available for the required structure.");
      return;
    }

    const getRandomQuestions = (arr, num) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    const selectedPartA = getRandomQuestions(partAQuestions, 5);
    const selectedPartB = getRandomQuestions(partBQuestions, 5);

    setQuestionPaper({
      subject: selectedSubject,
      partA: selectedPartA,
      partB: selectedPartB,
    });
  };

  const saveQuestionPaper = async () => {
    if (!questionPaper) {
      alert("Generate a question paper before saving.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/questionPapers/save", questionPaper);
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error saving question paper:", error);
      alert("Error saving question paper.");
    }
  };

  return (
    <Box sx={{ width: "60%", margin: "auto", padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Generate Question Paper
      </Typography>

      {/* Dropdown & Buttons Aligned Properly */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2, // Adds spacing between elements
          mb: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#1565c0" }}>
          Select Subject
        </Typography>
        <FormControl
          sx={{
            width: "350px", // Dropdown width
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              height: "50px",
              borderRadius: "8px",
              "& fieldset": { borderColor: "#1976d2" },
              "&:hover fieldset": { borderColor: "#1565c0" },
              "&.Mui-focused fieldset": { borderColor: "#0d47a1" },
            },
          }}
        >
          <Select
            value={selectedSubject}
            onChange={handleSubjectChange}
            displayEmpty
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px",
              color: "#333",
            }}
          >
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No subjects available</MenuItem>
            )}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={generateQuestionPaper}>
          Generate Question Paper
        </Button>
      </Box>

      {questionPaper && (
        <Box sx={{ padding: 3, border: "2px solid #000", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            ST JOSEPH ENGINEERING COLLEGE, MANGALURU
          </Typography>
          <Typography variant="h6" textAlign="center" sx={{ fontStyle: "italic" }}>
            An Autonomous Institution
          </Typography>
          <Typography variant="h6" fontWeight="bold" textAlign="center" sx={{ marginBottom: 1 }}>
            DEPARTMENT OF COMPUTER APPLICATIONS
          </Typography>

          <Typography variant="h6" textAlign="center">Semester Examination - 2025</Typography>
          <Typography variant="h6" textAlign="center">Subject: {questionPaper.subject}</Typography>

          <Typography variant="body1" fontWeight="bold" sx={{ marginBottom: 2 }}>
            Instructions:
          </Typography>
          <Typography variant="body2">- Answer all questions.</Typography>
          <Typography variant="body2">- Part A: Answer all 5 questions (2 marks each).</Typography>
          <Typography variant="body2">- Part B: Answer all 5 questions (8 marks each).</Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Part A - (5 x 2 = 10 Marks)
          </Typography>
          {questionPaper.partA.map((q, index) => (
            <Typography key={index}>{index + 1}. {q.question}</Typography>
          ))}

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Part B - (5 x 8 = 40 Marks)
          </Typography>
          {questionPaper.partB.map((q, index) => (
            <Typography key={index}>{index + 6}. {q.question}</Typography>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={saveQuestionPaper}>
              Save Question Paper
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GenerateQuestion;
