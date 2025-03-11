import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/users/login", user);
      alert("✅ Login Successful!");
      console.log(response.data); // Handle token or user data
    } catch (error) {
      setError("❌ Invalid Email or Password");
    }
  };

  return (
    <Box sx={{ width: "400px", margin: "auto", paddingTop: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
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
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
