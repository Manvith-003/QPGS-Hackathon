// import express from "express";
// import { connectDb } from "./config/db.js";
// import cors from "cors";
// import mongoose from "mongoose";
// import userroutes from "./routes/landroutes.js";
// const PORT = 3001;

// const app = express();

// app.use(cors());
// app.use(express.json());


// // app.use('/api/v1/user', router);
// // app.use('/api/v1/account', accRouter);


// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     email:String,
// //     password:String
// // });

// // const User = mongoose.model('User', userSchema);


// // API Route to Fetch Data from Local MongoDB
// // app.use("/api/users", userroutes);


// // app.get('/api/users', async (req, res) => {
// //     try {
// //         const users = await User.find(); // Fetch all records
// //         res.json(User);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// const questionSchema = new mongoose.Schema({
//     subject: String,
//     module:Number,
//     question:String
// });

// const Questions = mongoose.model('Questions',questionSchema);


// // API Route to Fetch Data from Local MongoDB
// app.get('/api/questions', async (req, res) => {
//     try {
//         const questions = await Questions.find(); // Fetch all records
//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// connectDb();

// app.listen(PORT, () => {
//     console.log(`server running at port ${PORT}`);
// })



import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const PORT = 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDb();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// Start Server 
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
