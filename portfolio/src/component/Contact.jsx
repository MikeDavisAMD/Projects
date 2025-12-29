import { Alert, Box, Button, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import { Close, Facebook, GitHub, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material'
import React, { useState } from 'react'
import emailjs from 'emailjs-com'

export const Contact = React.forwardRef((props, ref) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sub, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleMailSender = () => {
    if (!name || !email || !message) {
      setAlertType('error');
      setAlertMessage('Please fill in Name, Email, and Message fields.');
      setOpen(true);
      return;
    }

    setLoading(true)

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: sub,
      message: message
    }
    emailjs.send(
      'portfolioMD73', //service ID
      'contactTemplate73', //template ID
      templateParams, // Template parameters passed inside the emailjs template
      'Uo0HVZcakUxMrBBq4' //public key
    ).then(
      () => {
        setAlertType('success')
        setAlertMessage('Email sent successfully')
        setOpen(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      }, (error) => {
        setAlertType('error')
        setAlertMessage('Failed', error.message)
        setOpen(true)
      }
    ).finally(() => { setLoading(false) })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{ height: { lg: '100px', md: '100px', sm: '90px', xs: '70px' }, alignContent: 'center' }}>
          <Typography variant='h1'
            sx={{
              fontFamily: '"Special Gothic Expanded One", sans-serif', fontSize: { lg: '40px', md: '40px', sm: '40px', xs: '20px' },
              fontWeight: 400, fontStyle: 'normal', color: '#1A73E8', textAlign: 'center'
            }}>
            Contact Me
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
        <Box sx={{ p: 2, backgroundColor: '#F5F7FA' }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', p: 2 }}>
            <TextField variant='outlined'
              value={name}
              label='Name' required
              onChange={(e) => setName(e.target.value)} />
            <TextField variant='outlined'
              value={email}
              label='Email' required
              type='email'
              onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', width: 'auto' }}>
            <TextField variant='outlined'
              value={sub}
              label='Subject'
              sx={{ width: '460px' }}
              onChange={(e) => setSubject(e.target.value)} />
          </Box>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', width: 'auto' }}>
            <TextField variant='outlined'
              value={message}
              label='Message'
              multiline rows={5}
              sx={{ width: '460px' }}
              onChange={(e) => setMessage(e.target.value)} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Button variant='contained' sx={{ width: '460px' }} onClick={handleMailSender} disabled={loading}>
              {loading ? "Sending..." : "send message"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert onClose={handleClose} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Grid>
      <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
        <Box sx={{ p: 4, backgroundColor: '#F5F7FA' }}>
          <Box sx={{ pl: { lg: 0, md: 0, sm: 15, xs: 0 } }}>
            <Typography variant='h3'>Mike Davis</Typography>
            <Typography variant='body1' sx={{ opacity: 0.5 }}>Web Developer</Typography>
          </Box> <br /> <br /><br />
          <Box sx={{ pl: { lg: 0, md: 0, sm: 15, xs: 0 } }}>
            <Typography variant='h5'>Phone</Typography>
            <Typography variant='body1' sx={{ opacity: 0.5 }}>+91-7708172413</Typography>
          </Box> <br />
          <Box sx={{ pl: { lg: 0, md: 0, sm: 15, xs: 0 } }}>
            <Typography variant='h5'>Email</Typography>
            <Typography variant='body1' sx={{ opacity: 0.5 }}>mikedavisantony@gmail.com</Typography>
          </Box> <br /><br /><br />
          <Box sx={{ display: 'flex', gap: 2, p: 0.8, pl: { lg: 0, md: 0, sm: 15, xs: 0 } }}>
            <IconButton disableRipple href='https://www.facebook.com/share/1CA2gFtN5v/?mibextid=wwXIfr'
              sx={{ '&:hover': { color: '#34A853' } }}>
              <Facebook />
            </IconButton>
            <IconButton disableRipple href='https://github.com/MikeDavisAMD'
              sx={{ '&:hover': { color: '#34A853' } }}>
              <GitHub />
            </IconButton>
            <IconButton disableRipple href='https://www.linkedin.com/in/mikedavisa73'
              sx={{ '&:hover': { color: '#34A853' } }}>
              <LinkedIn />
            </IconButton>
            <IconButton disableRipple href='https://www.instagram.com/m.d.falcon.73?igsh=MW1nazBqYmNjcmI4Yw%3D%3D&utm_source=qr'
              sx={{ '&:hover': { color: '#34A853' } }}>
              <Instagram />
            </IconButton>
            <IconButton disableRipple href='https://wa.me/917708172413'
              sx={{ '&:hover': { color: '#34A853' } }}>
              <WhatsApp />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
})
