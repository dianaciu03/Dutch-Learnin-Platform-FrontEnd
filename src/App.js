import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamPracticeProvider } from './context/ExamPracticeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExamPractice from './pages/ExamPractice';
import './App.css';

function App() {
  return (
    <Router>
      <ExamPracticeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-exam" element={<ExamPractice />} />
        </Routes>
      </ExamPracticeProvider>
    </Router>
  );
}

export default App;
