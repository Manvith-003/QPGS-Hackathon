import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componants/Admin/Dashboard';
import Login from './Componants/Pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
