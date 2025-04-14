import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ExamPracticeCard({ examPractice }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/exam-practice/${examPractice.id}`);
  };

  return (
    <Card sx={{ 
      mb: 2, 
      border: '1px solid #e0e0e0',
      maxWidth: '727px',
      width: '100%',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {examPractice.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(examPractice.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Typography variant="body1">
            <strong>Level:</strong> {examPractice.level}
          </Typography>
          <Typography variant="body1">
            <strong>Maximum Grade:</strong> {examPractice.maxGrade}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Sections:</strong> {examPractice.readingSections.length} Reading Section{examPractice.readingSections.length !== 1 ? 's' : ''}
        </Typography>

        <Button
          variant="outlined"
          onClick={handleViewDetails}
          sx={{
            color: '#4caf50',
            borderColor: '#4caf50',
            '&:hover': {
              borderColor: '#388e3c',
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
            },
            textTransform: 'none',
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default ExamPracticeCard; 