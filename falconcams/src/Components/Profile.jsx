import { Close, Delete, Edit, Save } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, TextField, } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Profile = () => {
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  // snackbar
  const [open,setOpen]=useState(false)
    const openSnackbar = () => {
      setOpen(true)
    }
    const closeSnackbar = () => {
      setOpen(false)
    }
  // dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const username = localStorage.getItem('username')
  const [error,setError]=useState('')
  const [saved,setSaved]=useState(false)
  const [name,setName]=useState('')
  const [fname,setFName]=useState('')
  const [lname,setLName]=useState('')
  const [mobile,setMobile]=useState('')
  const [email,setEmail]=useState('')
  const [firebaseKey,setfbkey]=useState('')
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
        const users = Object.entries(response.data).map(([key,val])=>({firebaseKey: key,...val}))
        const userData = users.find(user => user.username===username || user.mobile===username || user.email===username)
        if (userData) {
          setName(userData.fname+" "+userData.lname)
          setFName(userData.fname)
          setLName(userData.lname)
          setMobile(userData.mobile)
          setEmail(userData.email)
          setfbkey(userData.firebaseKey)
        }
      } catch (error) {
        setError(error.message)
        openSnackbar()
      }
    }
    fetchData()
  },[username])
  const [readOnly,setReadOnly]=useState(true)
  const edit = () => {
    setReadOnly(false)
  }
  const save = () => {
    axios.patch(`https://falconcams-default-rtdb.firebaseio.com/users/${firebaseKey}.json`,{
      fname:fname,
      lname:lname,
      mobile:mobile,
      email:email,
    }).then(()=>{
      setSaved('Profile updated successfully')
      openSnackbar()
      setReadOnly(true)
    }).catch((err)=>{
      setError(err.message)
      openSnackbar()
    })
  }
  const del = (firebaseKey) => {
    axios.delete(`https://falconcams-default-rtdb.firebaseio.com/users/${firebaseKey}.json`)
    .then(()=>{
      setSaved("Profile Deleted")
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('username')
      window.location.href='/';
    })
  }
  return (
    <Grid container sx={{background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
      <Grid size={12}>
        <Box sx={{display:'flex',justifyContent:'center',height:'500px',padding:'20px'}}>
          <Card sx={{ width: {lg:'30%',md:'40%',sm:'50%',xs:'90%'} }}>
            <CardContent sx={{display:'flex',justifyContent:'center'}}>
              {name && (
                <Avatar {...stringAvatar(name)} sx={{ width: 100, height: 100, backgroundColor:'#190098' }}/>
              )}
            </CardContent>
            <CardContent>
              <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
                <TextField 
                  sx={{marginTop:'10px',width:'100%'}} 
                  variant='filled' 
                  label='First Name'
                  value={fname}
                  onChange={(e)=>setFName(e.target.value)}
                  disabled={readOnly}
                />
                <TextField 
                  sx={{marginTop:'10px',width:'100%'}} 
                  variant='filled' 
                  label='Last Name'
                  value={lname}
                  onChange={(e)=>setLName(e.target.value)}
                  disabled={readOnly}
                />
              </Box>
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  sx={{marginTop:'10px',width:'100%'}} 
                  variant='filled' 
                  label='Username'
                  value={username}
                  disabled
                />
              </Box>
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  sx={{marginTop:'10px',width:'100%'}} 
                  variant='filled' 
                  label='Mobile'
                  type='number'
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}
                  disabled={readOnly}
                />
              </Box>
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  sx={{marginTop:'10px',width:'100%'}} 
                  variant='filled' 
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  disabled={readOnly}
                />
              </Box>
              <Box sx={{display:'flex',justifyContent:'center',gap:2,paddingTop:'25px'}}>
                {readOnly ? (<Button variant='contained' sx={{backgroundColor:'#190098'}} onClick={edit}><Edit/></Button>):
                (<Button variant='contained' sx={{backgroundColor:'#190098'}} onClick={save}><Save/></Button>)}
                <Button variant='contained' sx={{backgroundColor:'#FF0303'}} onClick={handleClickOpen}><Delete/></Button>
              </Box>
            </CardContent>
          </Card>
          <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
          action={
            <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
              <Close fontSize='small'/>
            </IconButton>
          }>
            <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}>
              {error || saved}
            </Alert>
          </Snackbar>
        </Box>
        <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm delete account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action is permanent and cannot be undone. 
            This will permanently remove your account and all associated data. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>del(firebaseKey)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Grid>
    </Grid>
  )
}
