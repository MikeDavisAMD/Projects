import { AccountCircle, AlternateEmail, Close, Password, Person, PhoneIphone } from '@mui/icons-material'
import { Alert, Box, Button, Grid, IconButton, Snackbar, TextField } from '@mui/material'
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
  const clickHandle = () => {
    if(!fname || !lname || !mobile || !email || !username || !password) {
      setError('Please enter all the fields')
      openSnackbar()
      return
    }
    axios.post("http://localhost:7320/users",{
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
        localStorage.setItem('loggedIn','true')
        navigate('/')
        window.dispatchEvent(new Event('storage'));
      },2000)
    }).catch((error)=>{
      console.error(error.message)
      setError(error.message)
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
        <Box sx={{height:'500px',paddingTop:'20px',background:'linear-gradient(to bottom,#039BFF,#03F8FF)'}}>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Person sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'30%'}} 
            variant='filled' 
            label='First Name'
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
            />
            <TextField 
            sx={{marginTop:'10px',width:'30%'}} 
            variant='filled' 
            label='Last Name'
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <PhoneIphone sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}}
            variant='filled' 
            label='Mobile number'
            type='number'
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <AlternateEmail sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='E-Mail ID'
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <AccountCircle sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='Enter new Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Password sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='Enter new Password'
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center'}}>
            <Button variant='contained' sx={{backgroundColor:'#3CE6FF',color:'#190098'}} onClick={clickHandle}>
              Sign Up
            </Button>
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',padding:'10px'}}>
            <Link to='/Login'>Already having an account? Sign in</Link>
          </Box>
          <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
          action={
            <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
              <Close fontSize='small'/>
            </IconButton>
          }>
            <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}>  
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
