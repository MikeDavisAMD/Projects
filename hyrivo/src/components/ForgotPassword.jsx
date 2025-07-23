import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import forgotpw from '../Assets/Images/forgotpw.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [loading,setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:2000/pw-reset/username',{username})
      const userId = response.data.userId

      navigate('/FPWVerification',{state: {userId}})

    } catch (error) {
      setError('Username not found')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Snackbar
  const [open,setOpen] = useState(false)
  const [error,setError] = useState('')

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }

  setOpen(false);
  };
  
  return (
    <Grid container sx={{minHeight:'100vh',alignItems:'center'}}>
      <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'end',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={forgotpw}
          height={{lg:'400px',md:'350px',sm:'250px'}}></Box>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'start',md:'start',sm:'center',xs:'center'},alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px',xs:'500px'}}}>
          <Card className='animate__animated animate__fadeInTopRight' sx={{width:{lg:'70%',md:'80%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Forgot Password?</span>
              </Typography>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#828282'}}>
              <span>Enter username to change password</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',width:'100%'}}>
              <TextField variant='standard' label='Username or Email' value={username} onChange={(e)=>setUsername(e.target.value)}
                sx={{width:'80%',
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                  },
                  '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                  },
                  '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                  },
                  '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                  }
                }}/> <br />
                <Button variant='outlined' size='large' disabled={loading}
                onClick={handleClick}
                sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'Submit'}</Button> <br /> 
              </Box> <br />           
            </CardContent>
          </Card>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} variant='filled' severity='error'
          sx={{
              backgroundColor: '#FF4D6D'
          }}>
              {error}
          </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </Grid>
  )
}
