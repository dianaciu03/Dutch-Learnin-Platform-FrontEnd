import React, { createContext, useContext, useState } from 'react';

const ExamPracticeContext = createContext();

export function ExamPracticeProvider({ children }) {
  const [examPractices, setExamPractices] = useState(() => {
    const savedPractices = JSON.parse(localStorage.getItem('examPractices') || '[]');
    return savedPractices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  const addExamPractice = (newPractice) => {
    setExamPractices(prev => {
      const updated = [newPractice, ...prev];
      localStorage.setItem('examPractices', JSON.stringify(updated));
      return updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });
  };

  return (
    <ExamPracticeContext.Provider value={{ examPractices, addExamPractice }}>
      {children}
    </ExamPracticeContext.Provider>
  );
}

export function useExamPractice() {
  return useContext(ExamPracticeContext);
} 