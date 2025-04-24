import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExamPracticeContext = createContext();

export function ExamPracticeProvider({ children }) {
  const [examPractices, setExamPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExamPractices();
  }, []);

  const fetchExamPractices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/exams');
      // Ensure response.data is an array before sorting
      console.log('Response data when fetching exams:', response.data);
      const practices = response.data.examList;
      setExamPractices(practices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message || 'Failed to fetch exam practices');
      setExamPractices([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addExamPractice = async (newPractice) => {
    try {
      const response = await axios.post('http://localhost:5000/exams', newPractice);
      setExamPractices(prev => {
        const updated = [response.data, ...prev];
        return updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message || 'Failed to add exam practice');
      throw err;
    }
  };

  return (
    <ExamPracticeContext.Provider value={{ examPractices, loading, error, addExamPractice, fetchExamPractices }}>
      {children}
    </ExamPracticeContext.Provider>
  );
}

export function useExamPractice() {
  return useContext(ExamPracticeContext);
} 