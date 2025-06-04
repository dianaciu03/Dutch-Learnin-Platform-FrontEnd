import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

function Reading({ onDelete, id, examId }) {
  const [readingText, setReadingText] = useState(() => {
    const savedText = localStorage.getItem(`readingText_${id}`);
    return savedText || '';
  });

  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem(`questions_${id}`);
    return savedQuestions ? JSON.parse(savedQuestions) : [{ question: '', answer: '' }];
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [componentId, setComponentId] = useState(id || '');

  useEffect(() => {
    if (componentId) {
      localStorage.setItem(`readingText_${componentId}`, readingText);
    }
  }, [readingText, componentId]);

  useEffect(() => {
    if (componentId) {
      localStorage.setItem(`questions_${componentId}`, JSON.stringify(questions));
    }
  }, [questions, componentId]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSaveSection = async () => {
    if (!examId) {
      setSaveError('No exam ID provided. Please save the exam details first.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const payload = {
        id: componentId ? String(componentId) : "",
        examId: examId,
        text: readingText,
        questions: questions.map(q => ({
          question: q.question,
          answer: q.answer
        }))
      };

      console.log('Reading component payload:', JSON.stringify(payload));
      const response = await axios.post('http://localhost:5000/exams/reading', payload);

      console.log('Section saved successfully:', response.data);
      
      if (response.data && response.data.id) {
        setComponentId(response.data.id);
        console.log('Updated component ID:', response.data.id);
      }
      
      setSaveSuccess(true);
    } catch (err) {
      console.error('Error saving section:', err);
      
      if (err.response) {
        if (typeof err.response.data === 'string') {
          setSaveError(err.response.data);
        } else if (err.response.data && err.response.data.title) {
          setSaveError(err.response.data.title);
        } else if (err.response.data && err.response.data.message) {
          setSaveError(err.response.data.message);
        } else {
          setSaveError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        setSaveError('No response from server. Please check your connection.');
      } else {
        setSaveError(err.message || 'An error occurred while saving the section');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Reading Section</Typography>
        <IconButton onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={readingText}
        onChange={(e) => setReadingText(e.target.value)}
        placeholder="Enter the reading text here..."
        sx={{
          mb: 3,
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

      {questions.map((q, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Question {index + 1}</Typography>
            <IconButton onClick={() => handleDeleteQuestion(index)} color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            placeholder="Enter the question here..."
            sx={{
              mb: 2,
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
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Answer {index + 1}</Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            placeholder="Enter the answer here..."
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
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleAddQuestion}
          startIcon={<AddIcon />}
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
          Add Question
        </Button>

        <Button
          variant="contained"
          onClick={handleSaveSection}
          disabled={isSaving}
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
            textTransform: 'none',
            fontSize: '1rem',
            padding: '8px 24px',
          }}
        >
          {isSaving ? 'Saving...' : 'Save Section'}
        </Button>
      </Box>

      {saveError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {saveError}
        </Typography>
      )}

      {saveSuccess && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          Section saved successfully!
        </Typography>
      )}
    </Box>
  );
}

export default Reading; 