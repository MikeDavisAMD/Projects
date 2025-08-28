import { Alert, AppBar, Box, Button, ButtonBase, CircularProgress, Grid, Snackbar, TextField, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { COLORS } from '../Utils/colors';
import { Save } from '@mui/icons-material';
import { AddDetails } from '../Utils/add';
import { UploadResume } from '../Utils/UploadResume';

export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [showConsent,setShowConsent] = useState(false)

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
  
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
  
    setOpen(false);
    };

    useEffect(() => {
      const checkUser = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
    
        if(!token) return navigate('/Login')

        localStorage.setItem('token',token)

        setLoading(true)
        try {
          const response = await axios.get('http://localhost:2000/user/me',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.data.isExistingUser) {
            setTimeout(() => {
              setShowConsent(true)
            }, 500);
          } else {
            setTimeout(() => {
              navigate('/')
            }, 500);
          }
        } catch (error) {
          setError(error.message)
          setOpen(true)
          navigate('/Login')
        } finally {
          setLoading(false)
        }
      }
      checkUser()
    }, [navigate]);

    const handleConsent = async (value) => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:2000/user/auth-consent',{isCompany: value},{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setTimeout(() => {
          navigate('/')
        }, 500);
      } catch (error) {
        setError(error.message)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }
  
  return (
    <Box sx={{ height: '100vh' }}>
      {showConsent ? 
      <Box sx={{flexGrow: 1}}>
        <AppBar position='static' sx={{backgroundColor:COLORS.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${COLORS.cardBorder}`, color:COLORS.primaryText}}>
          <Toolbar>
            <Box sx={{flexGrow:1}}>
              <Grid container spacing={2} sx={{alignItems:'center'}}>
                <Grid size={{lg:6,md:6,sm:6,xs:9}}>
                  <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'18px'}}}>
                      Fill Details to continue
                  </Box>
                </Grid>
                <Grid size={{lg:6,md:6,sm:6,xs:3}}>
                  <Box sx={{display:{lg:'flex',md:'flex',sm:'flex',xs:'none'},justifyContent:'flex-end'}}>
                  <Button variant='outlined' size='large'
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} color="inherit"/>
                    ) : (
                      <Save/>
                    )
                  } 
                  sx={{
                      color:COLORS.primaryAccent,
                      borderColor:COLORS.primaryAccent,
                      '&:hover':{
                        backgroundColor:COLORS.hoverAccent,
                        borderColor:COLORS.hoverAccent,
                        color:COLORS.primaryBg
                      }
                    }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                       {loading ? 'Loading...' : 'Save'}
                      </Box></Button>
                  </Box>
                  <Box sx={{display:{lg:'none',md:'none',sm:'none',xs:'flex'},justifyContent:'flex-end',p:1}}>
                  <ButtonBase  
                  sx={{
                      borderRadius:2,
                      color:COLORS.primaryAccent,
                      borderColor:COLORS.primaryAccent,
                      backgroundColor:COLORS.primaryBg,
                      '&:hover':{
                        backgroundColor:COLORS.hoverAccent,
                        borderColor:COLORS.hoverAccent,
                        color:COLORS.primaryBg
                      }
                    }}>{loading ? <CircularProgress color='inherit'/> : <Save/>}</ButtonBase>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar><br />
        <Grid container spacing={2}>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Name:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='First Name' fullWidth/>
                <TextField variant='outlined' label='Last Name' fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Description:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter Your Short Description' rows={4} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  About:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter about yourself' rows={8} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Skills:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddDetails/>
              </Box>
            </Box>
          </Grid>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Experience:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddDetails/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Education:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddDetails/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Licenses & Certifications:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddDetails/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Projects:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddDetails/>
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box sx={{p:1, textAlign:'center'}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Upload Your Resume:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:10,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <Box>
                  <UploadResume/>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> : <CircularProgress />}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' severity='error'
        sx={{
            backgroundColor: '#FF4D6D'
        }}>
            {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
