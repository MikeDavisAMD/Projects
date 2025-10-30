import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Link, Portal, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import loginValidate from '../Assets/Images/forgotpw.png'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export const FPWVerification = () => {
    const navigate = useNavigate()
    const ref = useRef([])
    const [loading,setLoading] = useState(false)
    const [load,setLoad] = useState(false)
    const [ld,setLd] = useState(false)
    const [otp,setOtp] = useState(Array(6).fill(''))
    const [email,setEmail] = useState('')
    const [isOtpSend,setIsOtpSend] = useState(false)
    const [counter,setCounter] = useState(0)
    const [authMode,setAuthMode] = useState('otp')
    const [authLoading,setAuthLoading] = useState(false)
    const [clicked,setClicked] = useState(false)

    // hashing Email
    const maskEmail = (email) => {
        const [user,domain] = email.split('@')
        const maskedUser = user.slice(0,2) + '*'.repeat(user.length - 4) + user.slice(-2)
        return `${maskedUser}@${domain}`
    }

    // sending OTP
    const location = useLocation()
    const userId = location.state?.userId
    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:2000/pw-reset/send-reset-otp',{ userId })
            setSuccess(response.data.message)
            setEmail(response.data.email)
            setIsOtpSend(true)
            setCounter(30)
            setOpen(true)
        } catch (error) {
            setError(error.response?.data?.message || "Sending OTP Failed")
            setOpen(true)
        }
    }

    // OTP verification
    const handleOtpChange = (element,index) => {
        const value = element.target.value
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (value && index < 5 ) {
                ref.current[index+1]?.focus()
            } //value going next textfield automatically

            if (value === '' && index > 0 ) {
                ref.current[index-1]?.focus()
            } //value going back when backspaced automatically
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData('text').trim()
        if (pastedValue && pastedValue.length === 6 && /^[0-9]{6}$/.test(pastedValue)) {
            const newOtp = pastedValue.split('').slice(0, 6);
            setOtp(newOtp);
            newOtp.forEach((d, i) => {
                if (ref.current[i]) {
                    ref.current[i].value = d;
                }
            });
            ref.current[5]?.focus();
        }
    }

    const handleVerifyOtp = async () => {
        try {
            const endpoint = authMode === 'otp' 
            ? 'http://localhost:2000/pw-reset/verify-reset-otp' 
            : 'http://localhost:2000/pw-reset/verify-auth'
            const response = await axios.post(endpoint,{userId: userId,otp: otp.join('')})
            setSuccess(response.data.message)
            setLoad(true)
            navigate('/ChangePassword',{state: {userId}})
            setOpen(true)
        } catch (error) {
            setError(error.response?.data?.message || 'OTP verification failed')
            setOpen(true)
        }
    }

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

    //   portal
    const [show, setShow] = useState(false);
    const container = useRef(null);

    const handleClickPortal = async (mode) => {
        try {
            if (mode === 'otp') {
                setLoading(true)
                await handleSendOtp()
                setShow(true)
                setClicked(true)
            } else if (mode === 'auth') {
                setAuthLoading(true)
                setShow(true)
                setClicked(true)
            }
        } catch (err) {
            setError('Failed to enable Authentication')
            setOpen(true)
        } finally {
            if (mode === 'otp') {
                setLoading(false)
            } else if (mode === 'auth') {
                setAuthLoading(false)
            }
        }
    };

    // for counter
    useEffect(()=>{
        let timer
        if (counter> 0) {
            timer = setTimeout(() => {
                setCounter(counter - 1)
            }, 1000);
        }
        return () => clearTimeout(timer)
    },[counter])    

  return (
    <Grid container sx={{minHeight:'100vh',alignItems:'center'}}>
      <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'end',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={loginValidate}
          height={{lg:'400px',md:'350px',sm:'250px'}}></Box>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'start',md:'start',sm:'center',xs:'center'},alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px',xs:'500px'}}}>
          <Card className='animate__animated animate__fadeInTopRight' sx={{width:{lg:'70%',md:'80%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>OTP Verification</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Typography variant='body2' sx={{textAlign:'center',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#1A1A1A'}}>
                    <span>{email? 'We have send the OTP to' : 'Send OTP to registered Email or use Authenticator app'}</span> <br />
                    <span style={{fontWeight:'bold'}}>{email ? maskEmail(email) : null}</span>
                </Typography><br />
                <Box sx={{display:'flex',gap:2}}>
                    <Button variant='outlined' 
                        onClick={async ()=>{
                            setAuthMode('otp')
                            await handleClickPortal('otp')
                        }} disabled={loading || isOtpSend || clicked}
                        sx={{
                        color:'#00BFFF',
                        borderColor:'#00BFFF',
                        '&:hover':{
                            backgroundColor:'#FF6EC7',
                            borderColor:'#FF6EC7',
                            color:'#fff'
                        }
                    }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'Send otp'}</Button>
                    <Button variant='outlined' 
                        onClick={async ()=>{
                            setAuthMode('auth')
                            await handleClickPortal('auth')
                        }} disabled={authLoading || isOtpSend || clicked}
                        sx={{
                        color:'#00BFFF',
                        borderColor:'#00BFFF',
                        '&:hover':{
                            backgroundColor:'#FF6EC7',
                            borderColor:'#FF6EC7',
                            color:'#fff'
                        }
                    }}>{authLoading ? <CircularProgress size={24} color="inherit"/> : 'use authenticator'}</Button>
                </Box> <br />
                <Box sx={{width:'100%',display:'flex',justifyContent:'center'}} ref={container} />
                {show ? (
                <Portal container={() => container.current}>
                    <Box sx={{width:'80%',textAlign:'center',
                        border:'2px outset grey',p:2,borderRadius:'5px',boxShadow:'5px 5px 10px grey'
                    }}>
                    <Typography variant='span' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'}}}>
                        {authMode === 'otp' ? 'Enter the OTP received through Email' : 'Enter 6 digit code from authenticator app'}
                    </Typography>
                    <Box sx={{display:'flex',width:'100%',gap:1}}>
                    {otp.map((value,index)=>(
                        <TextField variant='standard' value={value} onChange={e=>handleOtpChange(e,index)}
                        inputRef={(el)=>ref.current[index]=el} onPaste={(e) => handlePaste(e)} onKeyDown={(e) => {
                            if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
                                ref.current[index - 1]?.focus();
                            }
                        }}
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
                        },
                        '& .MuiInputBase-input': { //to bring cursor to center of textfield
                            textAlign:'center',fontWeight:'bold',fontSize:'20px'
                        }
                        }}
                        slotProps={{
                        input: {
                            maxLength: 1,
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }
                        }}/>
                    ))}
                    </Box> <br />
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <Button variant='outlined' onClick={handleVerifyOtp} disabled={load} sx={{
                            color:'#00BFFF',
                            borderColor:'#00BFFF',
                            '&:hover':{
                                backgroundColor:'#FF6EC7',
                                borderColor:'#FF6EC7',
                                color:'#fff'
                            }
                            }}>{load ? <CircularProgress size={24} color="inherit"/> : 'verify otp'}</Button><br />
                        {authMode === 'otp' && (counter === 0 && isOtpSend ? <Link component='button' onClick={async () => {
                            setLd(true)
                            await handleSendOtp()
                            setLd(false)
                        }} sx={{textDecoration:'none',fontSize:'15px',color:'#00BFFF',
                        '&:hover':{color:'#FF6EC7'}
                    }}>{ld ? <CircularProgress size={24} color="inherit"/> : 'Resend OTP' }</Link> : 
                    <Typography>
                        <span>Resend OTP in {counter}s</span>
                    </Typography>)}
                    </Box>
                </Box>
                </Portal>
                ) : null}
                 <br />                               
              </Box><br />              
            </CardContent>
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
    </Grid>
  )
}
