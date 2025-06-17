import { AccountCircle, AlternateEmail, Close, Password, Person, PhoneIphone, Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, FilledInput, Grid, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pic from '../Assets/Images/Pic2.jpeg'
import axios from 'axios'

export const Signup = () => {
  const navigate = useNavigate()
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [mobile,setMobile] = useState('') 
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [registered,setRegister] = useState(false)
  // password visibility
  const [showPassword,setShowpassword]=useState(false)
  const handleClickShowPassword = () => setShowpassword((show)=>!show)
  const clickHandle = () => {
    if(!fname || !lname || !mobile || !email || !username || !password) {
      setError('Please enter all the fields')
      openSnackbar()
      return
    }
    axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
    .then(response => {
      const users = response.data || {}
      const existingUsers = Object.values(users).some(user => 
        user.email===email || user.username===username
      )
      if (existingUsers) {
        setError('Username or Email already exists')
        openSnackbar()
        return
      }
      axios.post("https://falconcams-default-rtdb.firebaseio.com/users.json",{
        fname:fname,
        lname:lname,
        mobile:mobile,
        email:email,
        username:username,
        password:password
      })
      .then(()=>{
        setFname('')
        setLname('')
        setMobile('')
        setEmail('')
        setUsername('')
        setPassword('')
        setRegister(true)
        openSnackbar()
        setTimeout(()=>{
          sessionStorage.setItem('loggedIn','true')
          sessionStorage.setItem('username',username)
          navigate('/')
          window.dispatchEvent(new Event('storage'));
        },2000)
      }).catch((error)=>{
        console.error(error.message)
        setError(error.message)
        openSnackbar()
      })
    }).catch((err)=>{
      setError("error checking existing users")
      openSnackbar()
    })
  }
  // snackbar
  const [open,setOpen] = useState(false)
  const openSnackbar = () => {
    setOpen(true)
  }
  const closeSnackbar = () => {
    setOpen(false)
  }
  return (
    <Grid container>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{height:'460px',paddingTop:'60px',background:'linear-gradient(to bottom, #121B2B, #00FFE7)'}}>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Person sx={{mt:1.8,height:"50px",width:'50px',color:'inherit'}}/>
            <TextField 
            variant='filled' 
            label='First Name'
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '30%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                color: '#00FFE7',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
            <TextField  
            variant='filled' 
            label='Last Name'
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '30%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <PhoneIphone sx={{mt:1.5,height:"50px",width:'50px',color:'inherit'}}/>
            <TextField 
            variant='filled' 
            label='Mobile number'
            type='number'
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '62%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <AlternateEmail sx={{mt:1,height:"50px",width:'50px',color:'inherit'}}/>
            <TextField  
            variant='filled' 
            label='E-Mail ID'
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '62%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <AccountCircle sx={{mt:1.5,height:"50px",width:'50px',color:'inherit'}}/>
            <TextField 
            variant='filled' 
            label='Enter new Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '62%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Password sx={{mt:1.5,height:"50px",width:'50px',color:'inherit'}}/>
            <TextField 
            variant='filled' 
            label='Enter new Password'
            type={showPassword ? 'text' :'password'}
            slots={{
              input:FilledInput
            }}
            slotProps={{
              input: {
                type: showPassword ? 'text' : 'password',
                endAdornment:(
                  <InputAdornment>
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge='end'
                      sx={{height:"50px",width:'50px',color:'#A0A0A0'}}
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            sx={{
              marginTop: '10px',
              width: '62%',
              backgroundColor: '#1D2A44',
              borderRadius: '5px',
              '& .MuiFilledInput-root': {
                minHeight: '48px',
                alignItems: 'center',
              },
              '& .MuiFilledInput-input': {
                color: '#00FFE7',
              },
              '& .MuiInputLabel-root': {
                color: '#A0A0A0',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: '#00FFE7',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: '#FF4D6D',
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{ml:7,mt:2,display:'flex',justifyContent:'center'}}>
            <Button variant='contained' onClick={clickHandle}
            sx={{
              backgroundColor: '#FF4D6D',
              color: '#121B2B', 
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e04360'
              }
            }}>
              Sign Up
            </Button>
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{ml:6,display:'flex',justifyContent:'center',padding:'10px'}}>
            <Link style={{color:'#121B2B'}} to='/Login'>Already having an account? Sign in</Link>
          </Box>
          <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
          action={
            <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
              <Close fontSize='small'/>
            </IconButton>
          }>
            <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}
            sx={{
              backgroundColor: error ? '#FF4D6D' : '#00FFE7',
              color: '#121B2B',
              fontWeight: 'bold'
            }}>  
              {error || (registered ? 'User registered successfully': error)}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
          <Box component='img' src={pic} alt='Pigeons' 
            sx={{width:'100%',height:'520px'}}>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
