import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Divider, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('teacher');
  const { login } = useAuth();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleRegister = () => {
    const flow = role === 'teacher' ? 'registerTeacher' : 'registerStudent';
    login(flow);
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
          onClick={handleRegister}
        >
          Continue with Google
        </Button>
        
        <Divider className="auth-divider">
          <Typography variant="body2" color="textSecondary">
            or
          </Typography>
        </Divider>
        
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<PersonAddIcon />}
          className="auth-button"
          onClick={handleRegister}
        >
          Create Account
        </Button>
        
        <Typography variant="body2" className="auth-footer">
          Already have an account? <Button onClick={() => login('login')} className="auth-link">Sign in</Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register; 