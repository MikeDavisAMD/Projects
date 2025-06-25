import { Box, Button, Card, CardActions, CardContent, CircularProgress, Link, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const handleClick = async () => {
        if (!username || !password){
            setError("Invalid Credentials")
            setOpen(true)
            return
        }
        setLoading(true)
        try {
            const response = await axios.post('https://projects-tvrs.onrender.com/user/login',{
                username,
                password
            })
            const {token,user} = response.data
            sessionStorage.setItem('token',token)
            user.isAdmin ? navigate('/List') : navigate('/Form')
        } catch (error) {
            setError(error.response?.data?.message || "Login Failed")
            setOpen(true)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Box sx={{paddingTop:'120px',display:'flex',justifyContent:'center'}}>
        <Card sx={{ width:'40%',boxShadow:'5px 5px 10px grey'}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>Login</Typography><br />
                <TextField value={username} onChange={e=>setUsername(e.target.value)} variant='outlined' label="Username" sx={{width:'80%'}}/><br /><br />
                <TextField value={password} onChange={e=>setPassword(e.target.value)} variant='outlined' label="Password" type='password' sx={{width:'80%'}}/>
            </CardContent>
            <CardActions sx={{display:'flex',flexDirection:'column',alignItems:'center',pb:'30px'}}>
                <Button variant='contained' onClick={handleClick} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit"/> : 'Login'}
                </Button><br />
                <Typography variant='body2'>New user? <Link href='/Register'>Register</Link></Typography>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={error}
                />
            </CardActions>
        </Card>
    </Box>
  )
}
