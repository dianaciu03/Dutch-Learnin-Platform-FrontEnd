import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CEFRLevelOptions } from '../enums/CEFRLevel';
import { ComponentTypeOptions } from '../enums/ComponentType';

function ExamPracticeCard({ examPractice }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/exam-practice/${examPractice.id}`);
  };

  // Determine available sections
  const sectionsSet = new Set();

  if (examPractice.examComponents && examPractice.examComponents.length > 0) {
    examPractice.examComponents.forEach(component => {
      const matchedComponent = ComponentTypeOptions.find(option => option.value === component.componentType);
      if (matchedComponent) {
        sectionsSet.add(matchedComponent.label);
      }
    });
  }
  
  const sections = Array.from(sectionsSet);
  console.log(sections);

  const selectedLevel = CEFRLevelOptions.find(option => option.value === examPractice.level);
  console.log(selectedLevel);

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
            Title: {examPractice.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {new Date(examPractice.createdAt).toLocaleDateString()} */}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <Typography variant="body1">
            <strong>Level:</strong> {selectedLevel ? selectedLevel.label : "Unknown Level"}
          </Typography>
          <Typography variant="body1">
            <strong>Maximum Points:</strong> {examPractice.maxPoints}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Exam Sections:</strong> {sections.join(', ')}
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