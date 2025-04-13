import React, { useState } from 'react';
import { Typography, TextField, MenuItem, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CEFRLevelOptions } from '../enums/CEFRLevel';

function ExamPractice() {
  const [level, setLevel] = useState('');
  const [maxGrade, setMaxGrade] = useState('');

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

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Create an Exam Practice
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 12, maxWidth: '1400px' }}>
            <Box sx={{ width: '30%' }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Select the level of the exam:
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
                Set the maximum grade of the exam:
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
        </main>
      </div>
    </div>
  );
}

export default ExamPractice; 