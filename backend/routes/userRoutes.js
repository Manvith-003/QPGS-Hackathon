import express from "express";
import User from "../models/usermodel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("✅ API request received at /api/users");
    try {
        const users = await User.find();
        console.log("✅ Fetched Users:", users);
        res.json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
