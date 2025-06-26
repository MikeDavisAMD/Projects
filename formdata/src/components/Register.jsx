import { Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, Link, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
    const navigate = useNavigate()
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
        if (!username || !password || !confirm){
            setError('All Fields are Required')
            setOpen(true)
            return
        }

        if (password !== confirm) {
            setError("Passwords mismatch")
            setOpen(true)
            return
        }

        try {
            const response = await axios.post('https://projects-tvrs.onrender.com/user/register',{
                username,
                password,
                isAdmin
            })
            setSuccess("User Registered Successfully")
            sessionStorage.setItem('token',response.data.token)
            isAdmin ? navigate('/List') : navigate('/Form')
        } catch (error) {
            setOpen(true)
            setError(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Box sx={{paddingTop:'35px',display:'flex',justifyContent:'center'}}>
        <Card sx={{ width:'40%',boxShadow:'5px 5px 10px grey'}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>Register</Typography><br />
                <TextField value={username} onChange={e=>setUsername(e.target.value)} variant='outlined' label="Username" sx={{width:'80%'}}/><br /><br />
                <TextField value={password} onChange={e=>setPassword(e.target.value)} variant='outlined' label="Password" type='password' sx={{width:'80%'}}/><br /><br />
                <TextField value={confirm} onChange={e=>setConfirm(e.target.value)} variant='outlined' label="Confirm Password" type='password' sx={{width:'80%'}}/><br/><br />
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Checkbox size='small' checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)}/><Typography>Also add Admin Privilages</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{display:'flex',flexDirection:'column',alignItems:'center',pb:'30px'}}>
                <Button variant='contained' onClick={handleClick} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button><br />
                <Typography variant='body2'>Already have an account? <Link href='/'>Login</Link></Typography>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={error || success}
                />
            </CardActions>
        </Card>
    </Box>
  )
}
