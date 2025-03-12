import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js"; // Ensure this path is correct

import rateLimit from "express-rate-limit"; // Import rate limiter

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // Replace this with a secure, environment-based key

// Rate limiter for login route
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login attempts from this IP, please try again later."
});

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", loginLimiter, async (req, res) => { // Apply rate limiter
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout Route (Optional, since JWTs are stateless)
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

export default router;
