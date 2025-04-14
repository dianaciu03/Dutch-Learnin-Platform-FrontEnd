import React from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useExamPractice } from '../context/ExamPracticeContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function ExamPracticeDetails() {
  const { id } = useParams();
  const { examPractices } = useExamPractice();
  const examPractice = examPractices.find(practice => practice.id === Number(id));

  if (!examPractice) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content">
            <Typography variant="h5" color="error">
              Exam practice not found.
            </Typography>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ paddingBottom: '100px' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {examPractice.name}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body1">
                  <strong>Level:</strong> {examPractice.level}
                </Typography>
                <Typography variant="body1">
                  <strong>Maximum Grade:</strong> {examPractice.maxGrade}
                </Typography>
              </Box>
              <Typography variant="body1">
                <strong>Created on:</strong> {new Date(examPractice.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          {examPractice.readingSections.map((section, index) => (
            <Paper 
              key={section.id} 
              elevation={2} 
              sx={{ 
                p: 3, 
                mb: 4,
                backgroundColor: '#fafafa',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Reading Section
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, color: 'text.secondary', fontStyle: 'italic' }}>
                Read the following text and answer the questions below.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                {section.text}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Questions:
              </Typography>

              {section.questions.map((question, qIndex) => (
                <Box 
                  key={qIndex} 
                  sx={{ 
                    mb: 3,
                    p: 2,
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Question {qIndex + 1}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {question.question}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Answer {qIndex + 1}
                  </Typography>
                  <Typography variant="body1">
                    {question.answer}
                  </Typography>
                </Box>
              ))}
            </Paper>
          ))}
        </main>
      </div>
    </div>
  );
}

export default ExamPracticeDetails; 