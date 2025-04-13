import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Reading({ onDelete }) {
  return (
    <Box 
      sx={{ 
        mb: 4,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        padding: 2,
        position: 'relative'
      }}
    >
      <IconButton
        onClick={onDelete}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#666',
          '&:hover': {
            color: '#333',
          }
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="h2" sx={{ mb: 2, pr: 4 }}>
        Reading Component
      </Typography>
    </Box>
  );
}

export default Reading; 