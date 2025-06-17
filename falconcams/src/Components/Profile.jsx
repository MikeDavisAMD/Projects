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
  const username = sessionStorage.getItem('username')
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
      sessionStorage.removeItem('loggedIn')
      sessionStorage.removeItem('username')
      window.location.href='/';
    })
  }
  return (
    <Grid container sx={{background:'linear-gradient(to bottom, #121B2B, #00FFE7)'}}>
      <Grid size={12}>
        <Box sx={{display:'flex',justifyContent:'center',height:'500px',padding:'20px'}}>
          <Card sx={{ width: {lg:'30%',md:'40%',sm:'50%',xs:'90%'},backgroundColor: '#121B2B',color:'#E0E0E0',boxShadow: '0 4px 20px rgba(0, 255, 231, 0.3)' }}>
            <CardContent sx={{display:'flex',justifyContent:'center'}}>
              {name && (
                <Avatar {...stringAvatar(name)} sx={{ width: 100, height: 100, backgroundColor:'#190098' }}/>
              )}
            </CardContent>
            <CardContent>
              <Box sx={{display:'flex',justifyContent:'center',gap:2}}>
                <TextField  
                  variant='filled' 
                  label='First Name'
                  value={fname}
                  onChange={(e)=>setFName(e.target.value)}
                  disabled={readOnly}
                  sx={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#1D2A44',
                    borderRadius: '5px',
                    '& .MuiFilledInput-root': {
                      minHeight: '54px',
                      color: '#00FFE7',
                      alignItems: 'center',
                      '&.Mui-disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50', 
                      },
                    },
                    '& .MuiFilledInput-input': {
                      color: '#00FFE7',
                      '&:disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50',
                      },
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
                  onChange={(e)=>setLName(e.target.value)}
                  disabled={readOnly}
                  sx={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#1D2A44',
                    borderRadius: '5px',
                    '& .MuiFilledInput-root': {
                      minHeight: '54px',
                      color: '#00FFE7',
                      alignItems: 'center',
                      '&.Mui-disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50', 
                      },
                    },
                    '& .MuiFilledInput-input': {
                      color: '#00FFE7',
                      '&:disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50',
                      },
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
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  variant='filled' 
                  label='Username'
                  value={username}
                  disabled
                  sx={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#1D2A44',
                    borderRadius: '5px',
                    '& .MuiFilledInput-root': {
                      minHeight: '54px',
                      color: '#00FFE7',
                      alignItems: 'center',
                      '&.Mui-disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50', 
                      },
                    },
                    '& .MuiFilledInput-input': {
                      color: '#00FFE7',
                      '&:disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50',
                      },
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
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  variant='filled' 
                  label='Mobile'
                  type='number'
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}
                  disabled={readOnly}
                  sx={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#1D2A44',
                    borderRadius: '5px',
                    '& .MuiFilledInput-root': {
                      minHeight: '54px',
                      color: '#00FFE7',
                      alignItems: 'center',
                      '&.Mui-disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50', 
                      },
                    },
                    '& .MuiFilledInput-input': {
                      color: '#00FFE7',
                      '&:disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50',
                      },
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
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <TextField 
                  variant='filled' 
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  disabled={readOnly}
                  sx={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#1D2A44',
                    borderRadius: '5px',
                    '& .MuiFilledInput-root': {
                      minHeight: '54px',
                      color: '#00FFE7',
                      alignItems: 'center',
                      '&.Mui-disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50', 
                      },
                    },
                    '& .MuiFilledInput-input': {
                      color: '#00FFE7',
                      '&:disabled': {
                        color: '#FF7F50',
                        WebkitTextFillColor: '#FF7F50',
                      },
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
              <Box sx={{display:'flex',justifyContent:'center',gap:2,paddingTop:'25px'}}>
                {readOnly ? (<Button variant='contained' onClick={edit}
                sx={{
                  backgroundColor: '#2196F3',
                  color: '#121B2B', 
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#1976D2'
                  }
                }}><Edit/></Button>):
                (<Button variant='contained' onClick={save}
                  sx={{
                    backgroundColor: '#00C853',
                    color: '#121B2B', 
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#00A843'
                    }
                  }}><Save/></Button>)}
                <Button variant='contained' onClick={handleClickOpen}
                sx={{
                  backgroundColor: '#FF4D6D',
                  color: '#121B2B', 
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e04360'
                  }
                }}><Delete/></Button>
              </Box>
            </CardContent>
          </Card>
          <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
          action={
            <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
              <Close fontSize='small' />
            </IconButton>
          }>
            <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}
            sx={{
              backgroundColor: error ? '#FF4D6D' : '#00FFE7',
              color: '#121B2B',
              fontWeight: 'bold'
            }}>
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
        <DialogTitle id="alert-dialog-title"
        sx={{
          backgroundColor: '#1D2A44',
          color: '#FF4D6D',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {"Confirm delete account?"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1D2A44' }}>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#00FFE7' }}>
            Are you sure you want to delete your account? This action is permanent and cannot be undone. 
            This will permanently remove your account and all associated data. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1D2A44' }}>
          <Button onClick={handleClose} sx={{ color: '#00FFE7' }}>Cancel</Button>
          <Button onClick={()=>del(firebaseKey)} autoFocus
            sx={{
              backgroundColor: '#FF4D6D',
              color: '#121B2B',
              '&:hover': {
                backgroundColor: '#e04360'
              }
            }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Grid>
    </Grid>
  )
}
