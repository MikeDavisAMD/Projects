import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
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

        setLoading(true)
        try {
          const response = await axios.get('http://localhost:2000/user/me',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.data.isExistingUser) {
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
        } finally {
          setLoading(false)
        }
      }
      checkUser()
    }, [navigate]);

    const handleConsent = async (value) => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:2000/user/auth-consent',{isCompany: value},{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setTimeout(() => {
          navigate('/')
        }, 500);
      } catch (error) {
        setError(error.message)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {showConsent ? 
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{width:{lg:'70%',md:'80%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}> 
          <CardContent>
            <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
              <span>Would you like to sign in as an organization?</span>
            </Typography>
          </CardContent>
          <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
          <Button variant='outlined' size='large' onClick={()=>handleConsent(false)} disabled={loading}
              sx={{
                color:'#00BFFF',
                borderColor:'#00BFFF',
                '&:hover':{
                  backgroundColor:'#FF6EC7',
                  borderColor:'#FF6EC7',
                  color:'#fff'
                }
              }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'no'}</Button> <br /> 
            <Button variant='outlined' size='large' onClick={()=>handleConsent(true)} disabled={loading}
              sx={{
                color:'#00BFFF',
                borderColor:'#00BFFF',
                '&:hover':{
                  backgroundColor:'#FF6EC7',
                  borderColor:'#FF6EC7',
                  color:'#fff'
                }
              }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'yes'}</Button> <br /> 
          </CardActions>
        </Card>
      </Box> : <CircularProgress />}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' severity='error'
        sx={{
            backgroundColor: '#FF4D6D'
        }}>
            {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
