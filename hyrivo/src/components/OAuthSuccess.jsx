import { Alert, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { GoogleOrgUserUI } from '../Utils/GoogleOrgUserUI';
import {Loading} from './Loading'

export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [showConsent,setShowConsent] = useState(false)

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
  
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
  
    setOpen(false);
    };

    useEffect(() => {
      const checkUser = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
    
        if(!token) return navigate('/Login')

        localStorage.setItem('token',token)

        try {
          const response = await axios.get('http://localhost:2000/user/me',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.data.user.isExistingUser) {
            setTimeout(() => {
              setShowConsent(true)
            }, 500);
          } else {
            setTimeout(() => {
              navigate('/')
            }, 500);
          }
        } catch (error) {
          setError(error.message)
          setOpen(true)
          navigate('/Login')
        } 
      }
      checkUser()
    }, [navigate]);
  
  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {showConsent ? <GoogleOrgUserUI/> : <Loading/>}  
      </Box>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant='filled' severity='error' 
        sx={{
            backgroundColor: '#FF4D6D'
        }}>
            {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}