import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExamPractice from './pages/ExamPractice';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exam-practice" element={<ExamPractice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
