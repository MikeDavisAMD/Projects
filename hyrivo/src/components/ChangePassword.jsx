import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, IconButton, InputAdornment, Modal, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import forgotpw from '../Assets/Images/forgotpw.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:400,md:400,sm:400,xs:300},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ChangePassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const userId = location.state?.userId
  const [loading,setLoading] = useState(false)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [cPassword,setCPassword] = useState('')
  const [showPw,setShowPw] = useState(false)
  const [showCPw,setShowCPw] = useState(false)

  const handleClick = async () => {
    if(!password || !cPassword) {
      setError("Please fill all fields")
      setOpen(true)
      return
    }

    if(password !== cPassword) {
      setError("Passwords mismatch")
      setOpen(true)
      return
    }

    setLoading(true)
    try {
      await axios.post('http://localhost:2000/pw-reset/reset-password',{userId: userId, newPassword: password})
      handleOpenModal()
      setTimeout(() => {
        navigate('/')
      }, 5000);

    } catch (error) {
      setError(error.response?.data?.message)
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

  // modal
  const [openmodal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(()=>{
    if (userId) {
      axios.get('http://localhost:2000/pw-reset/get-username',{
        params: {userId}
      })
      .then(res => {setUsername(res.data.username)})
      .catch(err=>{
        setError(err.message)
        setOpen(true)
        setUsername('Username')
      })
    }
  }, [userId])

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
              <span>Change password for {username}</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',width:'100%'}}>
              <TextField variant='standard' label='Enter new Password' type={showPw ? 'text' : 'password'}
              value={password} onChange={e=>setPassword(e.target.value)}
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
                }}
                slotProps={{
                  input:{
                    endAdornment:(
                      <InputAdornment position='end'>
                        <IconButton onClick={()=>setShowPw((prev)=>!prev)}>
                          {showPw ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}/> <br />
                <TextField variant='standard' label='Confirm new Password' type={showCPw ? 'text' : 'password'}
                value={cPassword} onChange={e=>setCPassword(e.target.value)}
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
                }}
                slotProps={{
                  input:{
                    endAdornment:(
                      <InputAdornment position='end'>
                        <IconButton onClick={()=>setShowCPw((prev)=>!prev)}>
                          {showCPw ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}/> <br />
                <Button variant='outlined' size='large' onClick={handleClick} disabled={loading}
                sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'change password'}</Button> <br /> 
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
          <Modal
            open={openmodal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Password Updated
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Password changed successfully for the {username}.
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Grid>
    </Grid>
  )
}
