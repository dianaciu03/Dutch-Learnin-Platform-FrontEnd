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
        examId: examId,  // Note: lowercase 'e' in examId to match API schema
        text: readingText,  // Note: lowercase 't' in text to match API schema
        questions: questions.map(q => ({
          question: q.question,  // Note: lowercase 'q' in question
          answer: q.answer       // Note: lowercase 'a' in answer
        }))
      };

      console.log('Reading component payload:', JSON.stringify(payload));
      const response = await axios.post('http://localhost:5000/reading', payload);

      console.log('Section saved successfully:', response.data);
      
      // Update the component ID with the one returned from the backend
      if (response.data && response.data.id) {
        setComponentId(response.data.id);
        console.log('Updated component ID:', response.data.id);
      }
      
      setSaveSuccess(true);
    } catch (err) {
      console.error('Error saving section:', err);
      
      // Handle different types of error responses
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (typeof err.response.data === 'string') {
          setSaveError(err.response.data);
        } else if (err.response.data && err.response.data.title) {
          // Handle structured error objects
          setSaveError(err.response.data.title);
        } else if (err.response.data && err.response.data.message) {
          setSaveError(err.response.data.message);
        } else {
          setSaveError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setSaveError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setSaveError(err.message || 'An error occurred while saving the section');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 3,
        mb: 3,
        mt: 8,
        position: 'relative',
        backgroundColor: 'white',
        overflow: 'hidden',
        width: '96%',
      }}
    >
      <IconButton
        onClick={onDelete}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#f44336',
          '&:hover': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
          },
        }}
      >
        <DeleteIcon />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Reading Section
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Read the following text and answer the questions below.
      </Typography>

      <Box sx={{ 
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <textarea
          value={readingText}
          onChange={(e) => setReadingText(e.target.value)}
          placeholder="Enter the reading text here..."
          style={{
            width: '100%',
            minHeight: '150px',
            maxHeight: '500px',
            maxWidth: '100%',
            padding: '16px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            fontFamily: 'inherit',
            fontSize: '1rem',
            resize: 'both',
            marginBottom: '24px',
            outline: 'none',
            transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxSizing: 'border-box',
            overflow: 'auto',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#81c784';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(0, 0, 0, 0.23)';
          }}
        />
      </Box>

      {questions.map((q, index) => (
        <Box key={index} sx={{ 
          mb: 4,
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          backgroundColor: 'white',
          position: 'relative',
        }}>
          <IconButton
            onClick={() => handleDeleteQuestion(index)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#f44336',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Question {index + 1}
          </Typography>
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
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Answer {index + 1}
          </Typography>
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