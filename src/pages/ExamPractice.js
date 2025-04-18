import React, { useState, useEffect } from 'react';
import { Typography, TextField, MenuItem, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import Reading from '../components/Reading';
import { useExamPractice } from '../context/ExamPracticeContext';

function ExamPractice() {
  const navigate = useNavigate();
  const { addExamPractice } = useExamPractice();
  // Load initial state from localStorage or use defaults
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('examPracticeLevel');
    return savedLevel || '';
  });

  const [maxGrade, setMaxGrade] = useState(() => {
    const savedMaxGrade = localStorage.getItem('examPracticeMaxGrade');
    return savedMaxGrade || '';
  });

  const [name, setName] = useState('');
  const [createdExamId, setCreatedExamId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [readingComponents, setReadingComponents] = useState(() => {
    const savedComponents = localStorage.getItem('examPracticeReadingComponents');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('examPracticeLevel', level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('examPracticeMaxGrade', maxGrade);
  }, [maxGrade]);

  useEffect(() => {
    localStorage.setItem('examPracticeReadingComponents', JSON.stringify(readingComponents));
  }, [readingComponents]);

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleMaxGradeChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setMaxGrade(value);
    }
  };

  const saveExamDetails = async () => {
    // Validate required fields
    if (!name || !level || !maxGrade) {
      setError('Please fill in all required fields (name, level, and maximum grade) before saving.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      console.log('Sending exam details to backend:', { 
        id: createdExamId, 
        name, 
        level, 
        maxPoints: parseInt(maxGrade) 
      });
      
      const response = await axios.post('http://localhost:5000/exams', {
        id: createdExamId, // Include the ID if it exists
        name,
        level,
        maxPoints: parseInt(maxGrade),
      });

      const examId = response.data.id;
      console.log('Exam ID received from backend:', examId);
      console.log('Full response data:', response.data);
      
      setCreatedExamId(examId);
      console.log('Created exam ID added to state:', examId);
      console.log('Current state after update:', { createdExamId: examId, name, level, maxGrade });
    } catch (err) {
      console.error('Error saving exam details:', err);
      setError(err.response?.data || err.message || 'An error occurred while saving the exam details');
      
      // If we already have an exam ID, don't clear it on error
      // This allows the user to continue adding sections even if the update fails
      if (!createdExamId) {
        setCreatedExamId(null);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReadingClick = () => {
    if (!createdExamId) {
      setError('Please save the exam details first');
      return;
    }
    const newReadingComponent = {
      id: '', // Empty ID initially, will be set by the backend
      component: (
        <Reading
          key={readingComponents.length}
          id=""
          examId={createdExamId}
          onDelete={() => handleDeleteReading(readingComponents.length)}
        />
      ),
    };
    setReadingComponents([...readingComponents, newReadingComponent]);
    localStorage.setItem('readingComponents', JSON.stringify([...readingComponents, newReadingComponent]));
  };

  const handleDeleteReading = (id) => {
    setReadingComponents(prev => prev.filter(component => component.id !== id));
  };

  const handlePostExamPractice = () => {
    if (!createdExamId) {
      setError('Please save the exam details before posting the exam practice.');
      return;
    }

    // Create the exam practice object
    const examPractice = {
      id: createdExamId, // Use the ID from the backend
      name,
      level,
      maxGrade,
      readingSections: readingComponents.map(component => {
        const savedText = localStorage.getItem(`readingText_${component.id}`);
        const savedQuestions = localStorage.getItem(`questions_${component.id}`);
        return {
          id: component.id,
          text: savedText || '',
          questions: savedQuestions ? JSON.parse(savedQuestions) : []
        };
      }),
      createdAt: new Date().toISOString()
    };

    console.log('Created exam practice:', examPractice);

    // Add the new exam practice using context
    addExamPractice(examPractice);
    console.log('Added exam practice to context');

    // Clear the form data from localStorage
    localStorage.removeItem('examPracticeLevel');
    localStorage.removeItem('examPracticeMaxGrade');
    localStorage.removeItem('examPracticeReadingComponents');
    readingComponents.forEach(component => {
      localStorage.removeItem(`readingText_${component.id}`);
      localStorage.removeItem(`questions_${component.id}`);
    });

    // Clear the form state
    setLevel('');
    setMaxGrade('');
    setName('');
    setReadingComponents([]);
    setCreatedExamId(null);

    // Navigate to home page
    console.log('Navigating to home page');
    navigate('/');
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ paddingBottom: '100px' }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Create an Exam Practice
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 12, maxWidth: '1400px', mb: 4 }}>
            <Box sx={{ width: '30%' }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Select the level of the exam
              </Typography>
              <TextField
                select
                fullWidth
                label="Level"
                value={level}
                onChange={handleLevelChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4caf50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#81c784',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#81c784',
                  },
                }}
              >
                {CEFRLevelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ width: '30%' }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Set the maximum grade of the exam
              </Typography>
              <TextField
                type="number"
                fullWidth
                label="Maximum Grade"
                value={maxGrade}
                onChange={handleMaxGradeChange}
                required
                inputProps={{ min: 1, step: 1 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4caf50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#81c784',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#81c784',
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Box sx={{ width: '45%', mb: 2 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Enter the name of the exam practice
              </Typography>
              <TextField
                fullWidth
                label="Exam Practice Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4caf50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#81c784',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#81c784',
                  },
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={saveExamDetails}
              disabled={isSaving}
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
                textTransform: 'none',
                fontSize: '1rem',
                padding: '8px 16px',
                height: '40px',
              }}
            >
              {isSaving ? 'Saving...' : 'Save Exam Details'}
            </Button>
          </Box>

          {error && (
            <Typography variant="body1" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {createdExamId && !error && (
            <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
              Exam details saved successfully. You can now add sections.
            </Typography>
          )}

          {readingComponents.map((component) => (
            <Reading
              key={component.id}
              id={component.id}
              examId={createdExamId}
              onDelete={() => handleDeleteReading(component.id)}
            />
          ))}

          <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between', maxWidth: '1490px', mt: 8 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => console.log('Grammar section will be added')}
                disabled={!createdExamId}
                sx={{
                  color: '#4caf50',
                  borderColor: '#4caf50',
                  '&:hover': {
                    borderColor: '#388e3c',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  },
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 24px',
                }}
              >
                + Grammar section
              </Button>
              <Button
                variant="outlined"
                onClick={() => console.log('Vocabulary section will be added')}
                disabled={!createdExamId}
                sx={{
                  color: '#4caf50',
                  borderColor: '#4caf50',
                  '&:hover': {
                    borderColor: '#388e3c',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  },
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 24px',
                }}
              >
                + Vocabulary section
              </Button>
              <Button
                variant="outlined"
                onClick={handleReadingClick}
                disabled={!createdExamId}
                sx={{
                  color: '#4caf50',
                  borderColor: '#4caf50',
                  '&:hover': {
                    borderColor: '#388e3c',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  },
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 24px',
                }}
              >
                + Reading section
              </Button>
            </Box>
            <Button
              variant="contained"
              onClick={handlePostExamPractice}
              disabled={!createdExamId}
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
                textTransform: 'none',
                fontSize: '1rem',
                padding: '8px 24px',
                minWidth: '180px',
                marginLeft: 'auto',
              }}
            >
              Post Exam Practice
            </Button>
          </Box>
        </main>
      </div>
    </div>
  );
}

export default ExamPractice; 