import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
  
      if (token) {
        localStorage.setItem('token', token); 
        setTimeout(()=>navigate('/'),500); 
      } else {
        navigate('/login');
      }
    }, [navigate]);
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}
