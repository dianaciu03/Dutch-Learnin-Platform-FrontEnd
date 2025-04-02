import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

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
          Create Account
        </Typography>
        <Typography variant="body1" className="auth-subtitle">
          Join our community of Dutch learners
        </Typography>
        
        <Box className="role-toggle-container">
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="registration role"
            className="role-toggle-group"
          >
            <ToggleButton value="student" aria-label="student">
              <MenuBookIcon className="role-icon" />
              <Typography variant="body2">Student</Typography>
            </ToggleButton>
            <ToggleButton value="teacher" aria-label="teacher">
              <SchoolIcon className="role-icon" />
              <Typography variant="body2">Teacher</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
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
          <Box className="name-fields-container">
            <TextField
              label="First Name"
              type="text"
              variant="outlined"
              className="auth-input first-name-field"
              placeholder="Enter your first name"
            />
            <TextField
              label="Last Name"
              type="text"
              variant="outlined"
              className="auth-input last-name-field"
              placeholder="Enter your last name"
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            className="auth-input"
            placeholder="Enter your email address"
          />
          {role === 'teacher' && (
            <TextField
              label="Educational Institution"
              type="text"
              fullWidth
              variant="outlined"
              className="auth-input teacher-field"
              placeholder="Enter your teaching institution"
            />
          )}
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            className="auth-input"
            placeholder="Create a strong password"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            className="auth-input"
            placeholder="Re-enter your password"
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