import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    _id: "",
    subject: "",
    module: "",
    question: "",
    levels: "",
    marks: "",
    part: "",
  });

  // ✅ Fetch questions from backend
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
    }
  };

  // ✅ Handle delete operation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:3001/api/questions/${id}`);
        fetchQuestions(); // Refresh after delete
        alert("✅ Question deleted successfully!");
      } catch (error) {
        console.error("❌ Error deleting question:", error);
        alert("⚠️ Failed to delete question.");
      }
    }
  };

  // ✅ Handle edit operation
  const handleEditOpen = (question) => {
    setCurrentQuestion(question);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/questions/${currentQuestion._id}`, currentQuestion);
      fetchQuestions(); // Refresh after update
      setEditDialogOpen(false);
      alert("✅ Question updated successfully!");
    } catch (error) {
      console.error("❌ Error updating question:", error);
      alert("⚠️ Failed to update question.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        View Questions
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>Subject</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Part</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q._id}>
                <TableCell>{q.subject}</TableCell>
                <TableCell>{q.module}</TableCell>
                <TableCell>{q.question}</TableCell>
                <TableCell>{q.levels}</TableCell>
                <TableCell>{q.marks}</TableCell>
                <TableCell>{q.part}</TableCell>
                <TableCell>
                  {/* Edit Button */}
                  <IconButton onClick={() => handleEditOpen(q)} color="primary">
                    <EditIcon />
                  </IconButton>
                  {/* Delete Button */}
                  <IconButton onClick={() => handleDelete(q._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          {Object.keys(currentQuestion).map((key) => (
            key !== "_id" && (
              <TextField
                key={key}
                fullWidth
                margin="dense"
                label={key}
                name={key}
                value={currentQuestion[key]}
                onChange={handleEditChange}
              />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewQuestions;
