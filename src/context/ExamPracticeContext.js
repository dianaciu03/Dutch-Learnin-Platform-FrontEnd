import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../config/axiosConfig';

const ExamPracticeContext = createContext();

export function ExamPracticeProvider({ children }) {
  const [examPractices, setExamPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExamPractices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/exams');
      // Ensure response.data is an array before sorting
      const practices = response.data.examList;
      setExamPractices(practices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message || 'Failed to fetch exam practices');
      setExamPractices([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExamPractices();
  }, [fetchExamPractices]);

  const fetchExamPracticeDetails = useCallback(async (examId) => {
    try {
      const response = await axiosInstance.get(`/exams/${examId}`);
      // Handle the response structure where it returns examList with 1 element
      const detailedExam = response.data.examList ? response.data.examList[0] : response.data;
      
      console.log('Fetched detailed exam data:', detailedExam);
      console.log('Exam components with details:', detailedExam.examComponents);
      
      // Update the examPractices state with the detailed data
      setExamPractices(prev => {
        const updated = prev.map(exam => 
          exam.id === examId ? detailedExam : exam
        );
        console.log('Updated exam practices state:', updated);
        return updated;
      });
      
      return detailedExam;
    } catch (err) {
      console.error('Error fetching exam practice details:', err);
      throw err;
    }
  }, []);

  const addExamPractice = async (newPractice) => {
    try {
      const response = await axiosInstance.post('/exams', newPractice);
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
    <ExamPracticeContext.Provider value={{ 
      examPractices, 
      loading, 
      error, 
      addExamPractice, 
      fetchExamPractices,
      fetchExamPracticeDetails 
    }}>
      {children}
    </ExamPracticeContext.Provider>
  );
}

export const useExamPractice = () => {
  const context = useContext(ExamPracticeContext);
  if (!context) {
    throw new Error('useExamPractice must be used within an ExamPracticeProvider');
  }
  return context;
}; 