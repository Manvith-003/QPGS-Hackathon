import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const FilteredQuestions = () => {
  const [filters, setFilters] = useState({
    subject: "",
    module: "",
    levels: "",
    marks: "",
    part: "",
    limit: "10",
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
        params: filters, // Send filters as query parameters
      });

      setQuestions(response.data);
    } catch (error) {
      console.error("❌ Error fetching filtered questions:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: "12px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Filter Questions
        </Typography>

        {/* Input Fields */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Module"
              name="module"
              type="number"
              value={filters.module}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Difficulty Level"
              name="levels"
              value={filters.levels}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Marks"
              name="marks"
              type="number"
              value={filters.marks}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Part"
              name="part"
              value={filters.part}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Limit"
              name="limit"
              type="number"
              value={filters.limit}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Search Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
            onClick={fetchQuestions}
          >
            Search Questions
          </Button>
        </Box>
      </Paper>

      {/* Results Section */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Results
        </Typography>

        {questions.length > 0 ? (
          questions.map((q) => (
            <Card key={q._id} sx={{ marginBottom: 2, backgroundColor: "#e3f2fd", borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {q.subject} (Module {q.module})
                </Typography>
                <Typography variant="body1">
                  Difficulty: <strong>{q.levels}</strong>, Marks: <strong>{q.marks}</strong>, Part: <strong>{q.part}</strong>
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Question:</strong> {q.question}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center" color="textSecondary">
            No questions found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FilteredQuestions;
