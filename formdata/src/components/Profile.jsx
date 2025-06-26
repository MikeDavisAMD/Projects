import { Close, ContactPage, Delete, Edit, Logout, Save } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Fab, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const Profile = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()
    const [saveLoad,setSaveLoad] = useState(false)
    const [delLoad,setDelLoad] = useState(false)

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

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token')
            if (!token) {
                setError("No Token Found in Storage")
                return
            }

            const response = await axios.get('https://projects-tvrs.onrender.com/user/me',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUsername(response.data.username)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleUpdate = async () => {
        setSaveLoad(true)
        try {
            const token = sessionStorage.getItem('token')
            if(!token) {
                setError('Token not found')
                return
            }

            await axios.put('https://projects-tvrs.onrender.com/user/update',{username,password},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setPassword('')
            setSuccess("Profile Updated Successfully")
            setOpen(true)
            setEdit(false)
        } catch (error) {
            setError(error.response?.data?.message)
        } finally {
            setSaveLoad(false)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }

    const handleForm = () => {
        navigate('/FilledForm')
    }

    const handleDelete = async () => {
        setDelLoad(true)
        const token = sessionStorage.getItem('token')
        if (!token) return

        const decoded = jwtDecode(token)
        const userId = decoded.id

        try {
            await axios.delete(`https://projects-tvrs.onrender.com/user/${userId}`)
            sessionStorage.removeItem(token)
            setSuccess("Profile Deleted Successfully")
            setOpen(true)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message)
        } finally {
            setDelLoad(false)
        }
    }

    useEffect(()=>{fetchData()},[])

    // speed dial
    const actions = [
        { icon: <Logout />, name: 'Logout', onClick: handleLogout },
        { icon: <ContactPage />, name: 'Form', onClick: handleForm },
      ];

  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}>
        <Card sx={{ width: 275,boxShadow:'5px 5px 10px grey',pb:'20px' }}>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <Box sx={{display:'flex',alignItems:'center',gap:12.5,width:'90%'}}>
                    <Typography sx={{fontSize:'30px',fontWeight:'bold'}}>Profile</Typography>
                    <Button onClick={()=>navigate('/Form')} variant='contained' sx={{backgroundColor:'red',color:'black',minWidth:'1px',p:0}}>
                        <Close/>
                    </Button>
                </Box>
                {edit ? (
                    <>
                    <TextField value={username} label='Username' onChange={e=>setUsername(e.target.value)}/>
                    <TextField value={password} label='Password' type='password' onChange={e=>setPassword(e.target.value)}/>
                    </>
                ):(
                    <TextField value={username} label='Username' disabled/>
                )}
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'center',gap:4}}>
                {edit ? (
                    <Tooltip title='Save'>
                        <Fab sx={{backgroundColor:'#46C2FF'}} onClick={handleUpdate} disabled={saveLoad}>
                            {saveLoad ? <CircularProgress size={24} color="inherit" /> : <Save/>}
                        </Fab>
                    </Tooltip>
                ):(
                    <Tooltip title='Edit'>
                        <Fab sx={{backgroundColor:'#46C2FF'}} onClick={()=>setEdit(true)}>
                            <Edit/>
                        </Fab>
                    </Tooltip>
                )}
                <Tooltip title='Delete'>
                    <Fab sx={{backgroundColor:'#FD2212'}} onClick={handleDelete} disabled={delLoad}> 
                        {delLoad ? <CircularProgress size={24} color="inherit" /> : <Delete/>}
                    </Fab>
                </Tooltip>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={error || success}
                />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 40, right: 50 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                    ))}
                </SpeedDial>
            </CardActions>
        </Card>
    </Box>
  )
}
