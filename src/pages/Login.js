import React from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <Box className="auth-container">
      <IconButton 
        className="back-home-button"
        onClick={() => navigate('/')}
        aria-label="back to home"
      >
        <HomeIcon />
      </IconButton>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>
      <div className="circle-4"></div>
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