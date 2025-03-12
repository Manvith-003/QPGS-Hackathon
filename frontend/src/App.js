import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Componants/layout"; 
import Dashboard from "./Componants/Admin/Dashboard";
import AddQuestion from "./Componants/Admin/AddQuestions";
import FilteredQuestions from "./Componants/Admin/FilteredQuestions";
import ViewQuestions from "./Componants/Admin/ViewQuestions";
import GenerateQuestion from "./Componants/Admin/GenerateQuestion";
import ViewQuestionPaper from "./Componants/Admin/ViewQuestionpaper"; // ✅ FIXED CASE

import Login from "./Componants/Pages/Login";
import Register from "./Componants/Pages/Register";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/filter-questions" element={<FilteredQuestions />} />
          <Route path="/view-questions" element={<ViewQuestions />} />
          <Route path="/generate-question" element={<GenerateQuestion />} />
          <Route path="/view-question-paper" element={<ViewQuestionPaper />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
