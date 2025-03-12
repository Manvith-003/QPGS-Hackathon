import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Link } from "@mui/material";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (response.ok) {
                // Save user data & token
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect to Dashboard
                navigate("/dashboard");
            } else {
                setError(data.message || "❌ Invalid Email or Password");
            }
        } catch (error) {
            setError("❌ Error logging in. Try again.");
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
                paddingTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    borderRadius: "12px",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    QPGS Management
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Login to your account
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />

                    {error && (
                        <Typography color="error" sx={{ marginTop: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2, padding: "10px", fontSize: "1rem", fontWeight: "bold" }}
                    >
                        Login
                    </Button>

                    <Typography sx={{ marginTop: 2 }}>
                        Don't have an account?{" "}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/register")}
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            Register here
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
