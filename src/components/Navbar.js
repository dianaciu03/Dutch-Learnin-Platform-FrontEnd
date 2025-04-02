import React from 'react';
import logo from '../icons/logo.jpg';
import { Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <Box className="navbar-buttons">
        <Button
          variant="outlined"
          startIcon={<LoginIcon />}
          className="navbar-button login-button"
        >
          Login
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          className="navbar-button register-button"
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

export default Navbar; 