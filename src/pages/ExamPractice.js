import React, { useState, useEffect } from 'react';
import { Typography, TextField, MenuItem, Box, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import Reading from '../components/Reading';

function ExamPractice() {
  // Load initial state from localStorage or use defaults
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('examPracticeLevel');
    return savedLevel || '';
  });

  const [maxGrade, setMaxGrade] = useState(() => {
    const savedMaxGrade = localStorage.getItem('examPracticeMaxGrade');
    return savedMaxGrade || '';
  });

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

  const handleReadingClick = () => {
    setReadingComponents(prev => [...prev, { id: Date.now() }]);
  };

  const handleDeleteReading = (id) => {
    setReadingComponents(prev => prev.filter(component => component.id !== id));
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Create an Exam Practice
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 12, maxWidth: '1400px', mb: 8 }}>
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

          {readingComponents.map(component => (
            <Reading 
              key={component.id} 
              onDelete={() => handleDeleteReading(component.id)} 
            />
          ))}

          <Box sx={{ display: 'flex', gap: 2, maxWidth: '1400px' }}>
            <Button
              variant="outlined"
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
        </main>
      </div>
    </div>
  );
}

export default ExamPractice; 