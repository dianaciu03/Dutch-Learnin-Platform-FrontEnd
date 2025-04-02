import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../icons/logo.jpg';
import { Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <Box className="navbar-buttons">
        <Button
          variant="outlined"
          startIcon={<LoginIcon />}
          className="navbar-button login-button"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          className="navbar-button register-button"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

export default Navbar; 