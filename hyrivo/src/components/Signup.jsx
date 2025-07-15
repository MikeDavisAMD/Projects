import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, Link, Snackbar, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SignupImg from '../Assets/Images/Signup.png'
import 'animate.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signup = () => {
  const [showPw,setShowPw] = useState(false)
  const [showCpw,setShowCpw] = useState(false)
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPw,setConfirmPw] = useState('')
  const [isCompany,setIsCompany] = useState(false)
  const [loading,setLoading] = useState(false)

  // Snackbar
  const [open,setOpen] = useState(false)
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }

  setOpen(false);
  };

  const handleClick = async () => {
    setLoading(true)
    if (!email || !username || !password) {
      setError('All Fields are Required')
      setOpen(true)
      setLoading(false)
      return
    }

    if(password !== confirmPw){
      setError('Password mismatch')
      setOpen(true)
      setLoading(false)
      return
    }

    try {
      await axios.post('http://localhost:2000/user/register',{
        email,
        username,
        password,
        isCompany
      })
      setOpen(true)
      setSuccess("User registered successfully")
      setTimeout(()=>navigate('/Login'),2000)
    } catch (error) {
      setOpen(true)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'end',md:'center',sm:'center',xs:'center'},alignItems:'center',height:'600px'}}>
          <Card className='animate__animated animate__fadeInTopLeft' sx={{width:{lg:'70%',md:'70%',sm:'90%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Sign up for</span> <span style={{fontStyle:'italic'}}>Hyrivo</span>
              </Typography>
              <Typography variant='body2' sx={{textAlign:'center',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#4F4F4F'}}>
                <span>Please Register to be a member</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
              <TextField variant='standard' label='Email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}
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
                <TextField variant='standard' label='Username' value={username} onChange={(e)=>setUsername(e.target.value)}
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
                <TextField variant='standard' label='Password' type={showPw ? 'text' : 'password'} 
                value={password} onChange={(e)=>setPassword(e.target.value)}
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
                }}
                /> <br />
                <TextField variant='standard' label='Confirm Password' type={showCpw ? 'text' : 'password'} 
                value={confirmPw} onChange={(e)=>setConfirmPw(e.target.value)}
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
                        <IconButton onClick={()=>setShowCpw((prev)=>!prev)}>
                          {showCpw ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                />
              </Box>
            </CardContent>
            <CardActions sx={{display:'flex',flexDirection:'column',alignItems:'center',pb:'30px'}}>
                <Box>
                  <FormControlLabel control={<Switch size='small' 
                  checked={isCompany} onChange={(e)=>setIsCompany(e.target.checked)}/>} 
                  label={<span>Create Account as an Organization</span>}
                  sx={{
                    '& .MuiSwitch-switchBase':{
                      backgroundColor:'default',
                      '&:hover':{
                        color:'#FF6EC7'
                      }
                    },
                    '& .Mui-checked':{
                      color:'#00BFFF'
                    },
                    '& .Mui-checked + .MuiSwitch-track':{
                      backgroundColor:'#00BFFF'
                    }
                  }}/>
                </Box><br />
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
                }}>{loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}</Button> <br />
                <Typography variant='span' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'}}}>
                  Already have an account? <Link href="/Login" sx={{textDecoration:'none',color:'#00BFFF',
                    '&:hover':{color:'#FF6EC7'}
                  }}>Access Account</Link>
                </Typography>
            </CardActions>
          </Card>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity={error ? 'error' : 'success'}
            sx={{
              backgroundColor: error ? '#FF4D6D' : '#1BC47D'
            }}>
              {error || success}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopRight' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={SignupImg}
          height={{lg:'500px',md:'550px',sm:'400px'}}></Box>
        </Box>
      </Grid>
    </Grid>
  )
}
