import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jsPDF from "jspdf";

const ViewQuestionPaper = () => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredPapers, setFilteredPapers] = useState([]);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/questionPapers/getAll");
        setQuestionPapers(response.data);

        const uniqueSubjects = [...new Set(response.data.map((paper) => paper.subject))];
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("❌ Error fetching question papers:", error);
      }
    };

    fetchQuestionPapers();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      const filtered = questionPapers
        .filter((paper) => paper.subject === selectedSubject)
        .map((paper, index) => ({ ...paper, name: `Question Paper ${index + 1}` }));

      setFilteredPapers(filtered);
    } else {
      setFilteredPapers([]);
    }
  }, [selectedSubject, questionPapers]);

  const downloadPDF = (paper) => {
    const doc = new jsPDF();
    doc.setFont("times", "bold");
    doc.text("ST JOSEPH ENGINEERING COLLEGE, MANGALURU", 40, 10);
    doc.setFont("times", "italic");
    doc.text("An Autonomous Institution", 70, 18);
    doc.setFont("times", "normal");
    doc.text("DEPARTMENT OF COMPUTER APPLICATIONS", 60, 26);
    doc.text(`Semester Examination - 2025`, 75, 34);
    doc.text(`Subject: ${paper.subject}`, 75, 42);

    doc.setFont("times", "bold");
    doc.text("Instructions:", 10, 52);
    doc.setFont("times", "normal");
    doc.text("- Answer all questions.", 10, 60);
    doc.text("- Part A: Answer all 5 questions (2 marks each).", 10, 68);
    doc.text("- Part B: Answer all 5 questions (8 marks each).", 10, 76);

    doc.setFont("times", "bold");
    doc.text("Part A - (5 x 2 = 10 Marks)", 10, 90);
    doc.setFont("times", "normal");
    paper.partA.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.question}`, 10, 100 + index * 8);
    });

    doc.setFont("times", "bold");
    doc.text("Part B - (5 x 8 = 40 Marks)", 10, 150);
    doc.setFont("times", "normal");
    paper.partB.forEach((q, index) => {
      doc.text(`${index + 6}. ${q.question}`, 10, 160 + index * 10);
    });

    doc.save(`${paper.name}_${paper.subject}.pdf`);
  };

  return (
    <Box sx={{ width: "70%", margin: "auto", padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        View & Download Question Papers
      </Typography>

      {/* Improved Dropdown Display */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: "bold", mb: 1, color: "#1565c0" }}>
          Select Subject
        </Typography>
        <FormControl
          sx={{
            width: "350px", // Increased Width
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              height: "50px", // Increased Height
              borderRadius: "8px",
              "& fieldset": { borderColor: "#1976d2" },
              "&:hover fieldset": { borderColor: "#1565c0" },
              "&.Mui-focused fieldset": { borderColor: "#0d47a1" },
            },
          }}
        >
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
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
                <MenuItem
                  key={subject}
                  value={subject}
                  sx={{
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  {subject}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No subjects available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      {filteredPapers.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Question Paper Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPapers.map((paper) => (
                <React.Fragment key={paper._id}>
                  <TableRow>
                    <TableCell>{paper.name}</TableCell>
                    <TableCell>{paper.subject}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: "0.8rem", padding: "5px 10px" }}
                        onClick={() => downloadPDF(paper)}
                      >
                        Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Section for Viewing Questions */}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography sx={{ fontWeight: "bold" }}>View Questions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography fontWeight="bold">Part A - (5 x 2 = 10 Marks)</Typography>
                          {paper.partA.map((q, index) => (
                            <Typography key={index}>
                              {index + 1}. {q.question} ({q.marks} Marks)
                            </Typography>
                          ))}
                          <br />
                          <Typography fontWeight="bold">Part B - (5 x 8 = 40 Marks)</Typography>
                          {paper.partB.map((q, index) => (
                            <Typography key={index}>
                              {index + 6}. {q.question} ({q.marks} Marks)
                            </Typography>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : selectedSubject ? (
        <Typography textAlign="center" sx={{ mt: 2, color: "red" }}>
          No question papers available for this subject.
        </Typography>
      ) : (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Select a subject to view question papers.
        </Typography>
      )}
    </Box>
  );
};

export default ViewQuestionPaper;
