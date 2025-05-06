import { Alert, Autocomplete, Box, Button, Grid, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import repair from '../Assets/Images/Repair.jpg'
import { Build, Close, Email, Person, PhoneAndroid } from '@mui/icons-material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const options = ['The Godfather', 'Pulp Fiction'];

export const Service = () => {
  const username = localStorage.getItem('username')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  // Snackbar
  const [open,setOpen]=useState(false)
  const openSnackbar = () => {
    setOpen(true)
  }
  const closeSnackbar = () => {
    setOpen(false)
  }
  // user details fetching
  const [name,setName]=useState('')
  const [mobile,setMobile]=useState('')
  const [email,setEmail]=useState('')
  const [serviceType,setType]=useState('')
  const [booked,setBooked]=useState(false)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
        const users = Object.entries(response.data).map(([key,val])=>({firebaseKey: key,...val}))
        const userData = users.find(user => user.username===username || user.mobile===username || user.email===username)
        if (userData) {
          setName(userData.fname+" "+userData.lname)
          setMobile(userData.mobile)
          setEmail(userData.email)
        }
      } catch (error) {
        setError(error.message)
        openSnackbar()
      }
    }
    fetchData()
  },[username])
  const bookService = async () => {
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
      const users = response.data
      const userKey = Object.keys(users).find(key => ((users[key].username || users[key].mobile || users[key].email)===username))
      if (!userKey) {
        setError("User not logged in")
        openSnackbar()
        return;
      }
      await axios.post(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/services.json`,{
        name: name,
        mobile: mobile,
        email: email,
        serviceType: serviceType
      })
      setName('')
      setMobile('')
      setEmail('')
      setType('')
      setBooked(true)
      openSnackbar()
      setTimeout(()=>{
        navigate('/')
      },2000)
    } catch (error) {
      setError(error.message)
      openSnackbar()
    }
  }
  return (
    <Grid container sx={{background:'linear-gradient(to bottom,#039BFF,#03F8FF)'}}>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
      <Box sx={{height:{lg:'390px',md:'390px',sm:'370px',xs:'370px'},paddingTop:{lg:'30px',md:'30px',sm:'10px',xs:'10px'},background:'linear-gradient(to bottom,#039BFF,#03F8FF)'}}>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Person sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='Name of the customer'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <PhoneAndroid sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='Customer Mobile Number'
            type='number'
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Email sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <TextField 
            sx={{marginTop:'10px',width:'60%'}} 
            variant='filled' 
            label='Customer E-Mail ID'
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center',gap:'12px'}}>
            <Build sx={{height:"80px",width:'50px',color:'inherit'}}/>
            <Autocomplete
              disablePortal={false}
              options={options}
              sx={{marginTop:'10px', width: '60%'}}
              renderInput={(params) => <TextField {...params} label="Type of Service" variant='filled'/>}
              onChange={(event,value)=>setType(value)}
            />
          </Box>
          <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'center'}}>
            <Button variant='contained' sx={{backgroundColor:'#3CE6FF',color:'#190098'}} onClick={bookService}>
              Book Service
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
          action={
            <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
              <Close fontSize='small'/>
            </IconButton>
          }>
            <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}>
              {error || (booked ? "Service Booked Successfully" : error)}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6}}>
        <Box sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
          <Box component="img" src={repair} alt='repair image'
          sx={{width:'100%',height:{lg:'415px',md:'415px',sm:'380px'}}}
          ></Box>
        </Box>
      </Grid>
    </Grid>
  )
}
