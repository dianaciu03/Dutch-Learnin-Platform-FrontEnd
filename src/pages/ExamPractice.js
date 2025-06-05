import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import Reading from '../components/Reading';
import { useExamPractice } from '../context/ExamPracticeContext';

function ExamPractice() {
  const navigate = useNavigate();
  const { fetchExamPractices } = useExamPractice();

  // Load initial state from localStorage or use defaults
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('examPracticeLevel');
    return savedLevel || '';
  });

  const [maxGrade, setMaxGrade] = useState(() => {
    const savedMaxGrade = localStorage.getItem('examPracticeMaxGrade');
    return savedMaxGrade || '';
  });

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem('examPracticeName');
    return savedName || '';
  });

  const [createdExamId, setCreatedExamId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [readingComponents, setReadingComponents] = useState(() => {
    const savedComponents = localStorage.getItem('examPracticeReadingComponents');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });

  useEffect(() => {
    if (window.Cypress) {
      window.setLevel = setLevel;
      window.setMaxGrade = setMaxGrade;
      window.setName = setName;
    }
  }, [setLevel, setMaxGrade, setName]);
  

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('examPracticeLevel', level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('examPracticeMaxGrade', maxGrade);
  }, [maxGrade]);

  useEffect(() => {
    localStorage.setItem('examPracticeName', name);
  }, [name]);

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
      const payload = {
        id: createdExamId, 
        name: name,
        level: String(level),
        maxPoints: parseInt(maxGrade) 
      };

      console.log('Sending exam details to backend:', payload);
      
      const response = await axiosInstance.post('/exams', payload);

      const examId = response.data.id;
      console.log('Exam ID received from backend:', examId);
      console.log('Full response data:', response.data);
      
      setCreatedExamId(examId);
      console.log('Created exam ID added to state:', examId);
      console.log('Current state after update:', { createdExamId: examId, name, level, maxGrade });
    } catch (err) {
      console.error('Error saving exam details:', err);
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data && err.response.data.title) {
          setError(err.response.data.title);
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && err.response.data.errors) {
          setError(err.response.data.errors.join(', '));
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message || 'An error occurred while saving the exam details');
      }
      
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

  const handleDeleteReading = (index) => {
    setReadingComponents(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handlePostExamPractice = async () => {
    try {
      // Clear all local storage data
      localStorage.removeItem('examPracticeLevel');
      localStorage.removeItem('examPracticeMaxGrade');
      localStorage.removeItem('examPracticeReadingComponents');
      readingComponents.forEach(component => {
        localStorage.removeItem(`readingText_${component.id}`);
        localStorage.removeItem(`questions_${component.id}`);
      });

      // Clear all state
      setLevel('');
      setMaxGrade('');
      setName('');
      setReadingComponents([]);
      setCreatedExamId(null);
      setError(null);

      // Fetch updated exam list before navigation
      await fetchExamPractices();

      // Navigate to home page
      navigate('/');
    } catch (err) {
      setError('An error occurred while cleaning up the exam practice.');
    }
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
              <select
                value={level}
                onChange={handleLevelChange}
                required
                data-testid="level-select"
                className="custom-select"
                label="Level"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '16px',
                  '&:hover': {
                    borderColor: '#4caf50',
                  },
                  '&:focus': {
                    outline: 'none',
                    borderColor: '#81c784',
                    boxShadow: '0 0 0 2px rgba(129, 199, 132, 0.2)',
                  },
                }}
              >
                <option value="">Select a level</option>
                {CEFRLevelOptions.map((option) => (
                  <option key={option.value} value={option.value} data-testid={`level-option-${option.value}`}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                InputProps={{
                  inputProps: {
                    'data-testid': 'max-grade-input',
                    min: 1,
                    step: 1,
                  },
                }}
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
                inputProps={{ 'data-testid': 'exam-name-input' }}
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
              data-testid="save-exam-btn"
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
                label="reading-section-btn"
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
             label="post-exam-btn"
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