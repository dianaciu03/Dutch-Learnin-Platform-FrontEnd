import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Helper to get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function KnowtimeStudySet() {
  const [isLoading, setIsLoading] = useState(true);
//   const [partnerData, setPartnerData] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        await axios.post('http://localhost:5002/accounts/partner', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        });
        // Wait a tick for the cookie to be set
        setTimeout(() => {
          const partnerToken = getCookie('partner_token');
          console.log('partner_token:', partnerToken);
          setToken(partnerToken);
          setIsLoading(false);
        }, 100); // 100ms delay to ensure cookie is set
      } catch (err) {
        console.error('Error fetching partner data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  // Compose the iframe URL with the token as a query parameter
  const iframeUrl = token
  ? `https://knowtime.me/iframe/create-study-set?jwt=${encodeURIComponent(token)}`
  : null;

  if (!isLoading && !error) {
    console.log('iframeUrl:', iframeUrl);
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ padding: 0, height: 'calc(100vh - 9vh)' }}>
          {isLoading ? (
            <Box 
              sx={{ 
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <CircularProgress sx={{ color: '#4CAF50' }} />
            </Box>
          ) : error ? (
            <Box 
              sx={{ 
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: 'error.main'
              }}
            >
              Error: {error}
            </Box>
          ) : (
            <Box sx={{ height: '100%', width: '100%' }}>
              <iframe
                src={iframeUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  overflow: 'hidden'
                }}
                title="Knowtime Study Set Creator"
              />
            </Box>
          )}
        </main>
      </div>
    </div>
  );
}

export default KnowtimeStudySet; 