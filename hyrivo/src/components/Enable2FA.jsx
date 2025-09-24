import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Link, Modal, Portal, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SignupImg from '../Assets/Images/Signup.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg:400,md:400,sm:400,xs:300},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Enable2FA = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [isCompany,setisCompany] = useState(false)

    // Portal
    const [show, setShow] = useState(false);
    const container = useRef(null);

    const handleClickPortal = () => {
        setShow(true);
    };
    // modal 
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    // QR code and manual code
    const [qrcode,setQrCode] = useState('')
    const [manualCode,setManualCode] = useState('')
    const [accountName, setAccName] = useState('')
    const [secret,setSecret] = useState('')

    const handleDone = async () => {
        const params = new URLSearchParams(window.location.search)
        const tempToken = params.get('token')

        if (!tempToken) {
            setError("No Token Found")
            setOpen(true)
        }

        setLoading(true)
        try {
            const response = await axios.post('http://localhost:2000/user/enable-auth/done',{secret},{
                headers:{Authorization:`Bearer ${tempToken}`}
            })
            localStorage.setItem("token",response.data.token)
            setSuccess(response.data.message)
            handleOpenModal()
            setTimeout(() => {
                navigate(isCompany ? '/DetailsOrg' : '/Details')
            }, 5000);
        } catch (error) {
            setError('Failed to Enable 2FA',error)
            setOpen(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (!token) {
            setError("No Token Found")
            setOpen(true)
        } 

        const fetchQR = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/user/enable-auth`,{
                    headers: {Authorization: `Bearer ${token}`}
                })
                const data = response.data

                if (data.alreadyEnabled) {
                    navigate('/')
                    return
                }

                setQrCode(data.qrcode)
                setManualCode(data.manual)
                setAccName(data.accountName)
                setSecret(data.secret)
            } catch (error) {
                setError("Failed to Load QR",error)
                setOpen(true)
            }
        }

        const fetchUser = async () => {
          try {
             const response = await axios.get('http://localhost:2000/user/me',{
              headers: {
                Authorization:`Bearer ${token}`
              }
             })
             setisCompany(response.data.user.isCompany)
          } catch (error) {
            setError("Failed to get user details",error)
            setOpen(true)
          }
        }

        fetchUser()
        fetchQR()
    },[navigate])        

  return (
    <Grid container sx={{minHeight:'100vh',alignItems:'center'}}>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'end',md:'center',sm:'center',xs:'center'},alignItems:'center',height: show ? '750px' :'600px'}}>
          <Card className='animate__animated animate__fadeInTopLeft' sx={{width:{lg:'90%',md:'70%',sm:'90%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Enable 2F Authentication</span>
              </Typography>
              <Typography variant='body2' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'},textAlign:'center'}}>
                  <span>Scan the QR code with your Authenticator app to get TOTP.</span>
                </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Box component='img' src={qrcode} alt='Authenticator QR Code'></Box>
              </Box><br />
              <Divider><span>or</span></Divider><br />
              <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Link component='button' onClick={handleClickPortal} style={{textDecoration:'none',color:'#00BFFF',
                    '&:hover':{color:'#FF6EC7'}
                  }}>QR code not scanning?</Link> <br />
                  <Box sx={{width:'100%',display:'flex',justifyContent:'center'}} ref={container} />
                {show ? <Portal container={()=> container.current}>
                <Box>
                <Box>
                <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                    <span style={{fontWeight:'bold'}}>{manualCode}</span>
                </Typography>    
                </Box><br />
                <Typography variant='body2' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'},textAlign:'center'}}>
                  <span>Name: {accountName}</span>
                </Typography>
                </Box>
                </Portal> : null}
              </Box>
            </CardContent>
            <CardActions sx={{display:'flex',flexDirection:'column',alignItems:'center',pb:'30px'}}>
                <Button variant='outlined' size='large' onClick={handleDone}
                sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>{loading ? <CircularProgress size={24} color="inherit"/> : 'Done'}</Button> <br />
            </CardActions>
          </Card>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                2FA Enabled👍
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                In-Case if you forget your mail you can use Authenticator OTP to Login <br />
              </Typography>
            </Box>
          </Modal>
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
      <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopRight' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={SignupImg}
          height={{lg:'500px',md:'550px',sm:'400px'}}></Box>
        </Box>
      </Grid>
    </Grid>
  )
}
