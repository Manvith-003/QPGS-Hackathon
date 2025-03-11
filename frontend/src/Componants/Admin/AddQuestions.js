import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    Paper
} from "@mui/material";

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
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, mt: 5, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
                    Add a New Question
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Module"
                                name="module"
                                value={formData.module}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Question"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                required
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Difficulty Level"
                                name="levels"
                                value={formData.levels}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Marks"
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Part"
                                name="part"
                                value={formData.part}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            backgroundColor: "#1976D2",
                            "&:hover": { backgroundColor: "#1565C0" },
                        }}
                    >
                        Add Question
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddQuestion;
