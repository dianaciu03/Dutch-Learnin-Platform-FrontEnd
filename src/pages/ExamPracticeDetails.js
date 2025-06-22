import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Paper, Chip, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useExamPractice } from '../context/ExamPracticeContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import { ComponentTypeOptions } from '../enums/ComponentType';

function ExamPracticeDetails() {
  const { id } = useParams();
  const { examPractices, fetchExamPracticeDetails } = useExamPractice();
  const [examPractice, setExamPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswers, setShowAnswers] = useState({});
  const hasFetchedDetails = useRef(false);

  const toggleAnswer = (questionIndex) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  useEffect(() => {
    const loadExamDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to find the exam in the existing list
        let exam = examPractices.find(practice => practice.id === String(id));
        
        // If not found or if components are missing details and we haven't fetched yet, fetch from backend
        if ((!exam || !exam.examComponents || exam.examComponents.some(comp => !comp.givenText && !comp.questions)) && !hasFetchedDetails.current) {
          console.log('Fetching detailed exam data from backend...');
          hasFetchedDetails.current = true;
          exam = await fetchExamPracticeDetails(id);
        }
        
        setExamPractice(exam);
      } catch (err) {
        console.error('Error loading exam details:', err);
        setError('Failed to load exam practice details');
      } finally {
        setLoading(false);
      }
    };

    loadExamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fetchExamPracticeDetails]); // examPractices intentionally omitted to prevent infinite loop

  if (loading) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </main>
        </div>
      </div>
    );
  }

  if (error || !examPractice) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content">
            <Typography variant="h5" color="error">
              {error || 'Exam practice not found.'}
            </Typography>
          </main>
        </div>
      </div>
    );
  }

  const selectedLevel = CEFRLevelOptions.find(option => option.value === examPractice.level);

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ paddingBottom: '100px' }}>
          {/* Exam Header */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fafafa' }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#2e7d32' }}>
              {examPractice.name}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Teacher ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {examPractice.teacherId}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Level
                  </Typography>
                  <Chip 
                    label={selectedLevel ? selectedLevel.label : "Unknown Level"} 
                    color="primary" 
                    variant="outlined"
                    sx={{ width: 'fit-content' }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Maximum Points
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {examPractice.maxPoints} points
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Components
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {examPractice.examComponents ? examPractice.examComponents.length : 0} sections
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Exam Components */}
          {examPractice.examComponents && examPractice.examComponents.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {examPractice.examComponents.map((component, index) => {
                const componentType = ComponentTypeOptions.find(option => option.value === component.componentType);
                
                return (
                  <Paper 
                    key={component.id} 
                    elevation={2} 
                    sx={{ 
                      p: 4,
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                    }}
                  >
                    {/* Component Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Chip 
                        label={componentType ? componentType.label : `Type ${component.componentType}`}
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        Section {index + 1}
                      </Typography>
                    </Box>

                    {/* Reading Instructions */}
                    {component.givenText && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1b5e20' }}>
                          Read the following text and answer the questions below.
                        </Typography>
                        <Paper 
                          elevation={1} 
                          sx={{ 
                            p: 3, 
                            backgroundColor: '#fafafa',
                            border: '1px solid #e0e0e0',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                            {component.givenText}
                          </Typography>
                        </Paper>
                      </Box>
                    )}

                    {/* Questions */}
                    {component.questions && component.questions.length > 0 && (
                      <Box>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#1b5e20' }}>
                          Questions ({component.questions.length})
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {component.questions.map((question, qIndex) => (
                            <Paper 
                              key={qIndex} 
                              elevation={1} 
                              sx={{ 
                                p: 3,
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #dee2e6',
                                borderRadius: 2,
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Chip 
                                  label={`Q${qIndex + 1}`}
                                  size="small"
                                  color="secondary"
                                  sx={{ fontWeight: 'bold' }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  Question {qIndex + 1}
                                </Typography>
                              </Box>
                              
                              <Typography variant="body1" sx={{ mb: 3, fontWeight: 'medium' }}>
                                {question.question}
                              </Typography>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                                  Your answer
                                </Typography>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={3}
                                  variant="outlined"
                                  placeholder="Type your answer here..."
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&:hover fieldset': {
                                        borderColor: '#4caf50',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#81c784',
                                      },
                                    },
                                  }}
                                />
                              </Box>
                              
                              <Button
                                variant="outlined"
                                onClick={() => toggleAnswer(qIndex)}
                                sx={{
                                  color: showAnswers[qIndex] ? '#d32f2f' : '#4caf50',
                                  borderColor: showAnswers[qIndex] ? '#d32f2f' : '#4caf50',
                                  '&:hover': {
                                    borderColor: showAnswers[qIndex] ? '#b71c1c' : '#388e3c',
                                    backgroundColor: showAnswers[qIndex] ? 'rgba(211, 47, 47, 0.04)' : 'rgba(76, 175, 80, 0.04)',
                                  },
                                  textTransform: 'none',
                                  fontWeight: 'medium',
                                }}
                              >
                                {showAnswers[qIndex] ? 'Hide Answer' : 'View Answer'}
                              </Button>
                              
                              {showAnswers[qIndex] && (
                                <Box sx={{ mt: 2, p: 2, backgroundColor: '#e8f5e9', borderRadius: 1, border: '1px solid #c8e6c9' }}>
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Correct Answer:
                                  </Typography>
                                  <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
                                    {question.answer}
                                  </Typography>
                                </Box>
                              )}
                            </Paper>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No exam components found for this practice.
              </Typography>
            </Paper>
          )}
        </main>
      </div>
    </div>
  );
}

export default ExamPracticeDetails; 