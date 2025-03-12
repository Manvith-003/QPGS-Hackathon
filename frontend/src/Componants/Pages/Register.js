import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Registration Successful");
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    QPGS Management
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField fullWidth margin="normal" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <TextField fullWidth margin="normal" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default Register;
