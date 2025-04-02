import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';

function Register() {
  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h4" component="h1" className="auth-title">
          Create Account
        </Typography>
        <Typography variant="body1" className="auth-subtitle">
          Join our community of Dutch learners
        </Typography>
        
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<GoogleIcon />}
          className="google-button"
        >
          Continue with Google
        </Button>
        
        <Divider className="auth-divider">
          <Typography variant="body2" color="textSecondary">
            or
          </Typography>
        </Divider>
        
        <form className="auth-form">
          <TextField
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            className="auth-input"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            className="auth-input"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            className="auth-input"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            className="auth-input"
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PersonAddIcon />}
            className="auth-button"
          >
            Create Account
          </Button>
        </form>
        
        <Typography variant="body2" className="auth-footer">
          Already have an account? <a href="/login" className="auth-link">Sign in</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register; 