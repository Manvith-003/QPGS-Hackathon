import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button } from '@mui/material';

const GenerateQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questions, setQuestions] = useState([]);

  // Fetch unique subjects from MongoDB
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/questions');
        const uniqueSubjects = [...new Set(response.data.map((q) => q.subject))];
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  // Handle subject selection change
  const handleSubjectChange = async (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);

    try {
      const response = await axios.get(`/api/questions?subject=${subject}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <Box>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Generate Question Paper
      </Typography>

      {/* Subject Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Subject</InputLabel>
        <Select
          value={selectedSubject}
          onChange={handleSubjectChange}
          label="Select Subject"
        >
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Questions */}
      {questions.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Questions for {selectedSubject}:
          </Typography>
          {questions.map((q, index) => (
            <Box key={index} sx={{ padding: 1, borderBottom: '1px solid #ccc' }}>
              <Typography>
                <strong>Module:</strong> {q.module} | <strong>Marks:</strong> {q.marks}
              </Typography>
              <Typography>{q.question}</Typography>
              <Typography>
                <strong>Level:</strong> {q.levels} | <strong>Part:</strong> {q.part}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Generate Question Paper Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => alert('Generating Question Paper...')}
      >
        Generate Question Paper
      </Button>
    </Box>
  );
};

export default GenerateQuestion;
