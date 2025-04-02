import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h4" component="h1" className="auth-title">
          Welcome Back
        </Typography>
        <Typography variant="body1" className="auth-subtitle">
          Sign in to continue your learning journey
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
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<LoginIcon />}
            className="auth-button"
          >
            Sign In
          </Button>
        </form>
        
        <Typography variant="body2" className="auth-footer">
          Don't have an account? <a href="/register" className="auth-link">Sign up</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login; 