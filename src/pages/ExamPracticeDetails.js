import React from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useExamPractice } from '../context/ExamPracticeContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import { ComponentTypeOptions } from '../enums/ComponentType';

function ExamPracticeDetails() {
  const { id } = useParams();
  const { examPractices } = useExamPractice();
  const examPractice = examPractices.find(practice => practice.id === String(id));

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

  // Determine available sections
  const sectionsSet = new Set();
  const readingSections = [];
  
  if (examPractice.ExamComponents && examPractice.ExamComponents.length > 0) {
    examPractice.ExamComponents.forEach(component => {
      const matchedComponent = ComponentTypeOptions.find(option => option.value === component.ComponentType);
      if (matchedComponent) {
        sectionsSet.add(matchedComponent.label);
        
        // Capture reading components separately to display their text and questions
        if (component.ComponentType === 2) { // 2 represents Reading
          readingSections.push(component);
        }
      }
    });
  }
  const sections = Array.from(sectionsSet);

  const selectedLevel = CEFRLevelOptions.find(option => option.value === examPractice.Level);

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ paddingBottom: '100px' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {examPractice.Name}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body1">
                  <strong>Level:</strong> {selectedLevel ? selectedLevel.label : "Unknown Level"}
                </Typography>
                <Typography variant="body1">
                  <strong>Maximum Points:</strong> {examPractice.MaxPoints}
                </Typography>
                <Typography variant="body1">
                  <strong>Exam Sections:</strong> {sections.join(', ')}
                </Typography>
              </Box>
            </Box>
          </Box>

          {readingSections.map((section, index) => (
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
                Reading Section {index + 1}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontStyle: 'italic' }}>
                Read the following text and answer the questions below.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                {section.GivenText}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Questions:
              </Typography>

              {section.Questions.map((question, qIndex) => (
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
                    {question.Question}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Answer {qIndex + 1}
                  </Typography>
                  <Typography variant="body1">
                    {question.Answer}
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