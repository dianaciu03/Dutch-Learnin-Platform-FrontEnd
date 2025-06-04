import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../icons/logo.jpg';
import { Button, Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../context/AuthContext';
import useAuthStore from '../store/authStore';

function Navbar() {
  const { login, logout } = useAuth();
  const { isAuthenticated, user, role } = useAuthStore();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <Box className="navbar-buttons" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {isAuthenticated ? (
          <>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Welcome, {user.name}
            </Typography>
            <Avatar
              onClick={handleMenu}
              sx={{ cursor: 'pointer', bgcolor: '#4CAF50' }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem disabled>
                Role: {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem 
                onClick={handleClose}
                sx={{ 
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.08)',
                    color: 'error.main'
                  }
                }}
              >
                Delete my account
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              startIcon={<LoginIcon />}
              className="navbar-button login-button"
              onClick={() => login('student')}
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
          </>
        )}
      </Box>
    </div>
  );
}

export default Navbar; 