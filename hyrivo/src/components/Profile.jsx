import { Alert, AppBar, Box, ButtonBase, Card, CardActions, CardContent, Grid, Link, Snackbar, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, Edit, LinkRounded, Mail, Person } from '@mui/icons-material'
import { useThemeContext } from '../Utils/ThemeContext'
import { ProfileUI } from '../Utils/ProfileUI'
import axios from 'axios'

export const Profile = () => {
  const {theme} = useThemeContext()
  const navigate = useNavigate()

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [desc, setDesc] = useState('')
  const [about, setAbout] = useState('')
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  // const [resumeLink, setResumeLink] = useState('')

  // Snackbar
  const [open,setOpen] = useState(false)
  const [error,setError] = useState('')

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }

  setOpen(false);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return
    try {
      const response = await axios.get('http://localhost:2000/user/me',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const user = response.data.profile
      const users = response.data.user
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setDesc(user.description)
      setAbout(user.about)
      setEmail(users.email)
      setUsername(users.username)
    } catch (error) {
      setError(error.message)
      setOpen(true)
    }
  }

  useEffect(() => {fetchUser()},[])

  console.log(firstname)
  console.log(lastname)

  return (
    <Box sx={{flexGrow: 1, minHeight: '100vh', background:theme.primaryBg, color: theme.primaryText}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position='static' sx={{backgroundColor:theme.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${theme.cardBorder}`, color:theme.primaryText}}>
            <Toolbar>
              <Grid container sx={{alignItems:'center'}}>
                <Grid size={4}>
                  <Box>
                    <ButtonBase onClick={()=>navigate('/')} sx={{display:'flex',
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.hoverAccent,
                    }
                  }}>
                      <ArrowBackIos/>
                    </ButtonBase>
                  </Box>
                </Grid>
                <Grid size={8}>
                    <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                        <Person sx={{
                          height:{lg:'35px',md:'35px',sm:'32px'},
                          width:{lg:'35px',md:'35px',sm:'32px'}}}/>
                        <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                            My
                        </Box>
                        <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                            Account
                        </Box>
                    </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={12}>
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <ProfileUI name={`${firstname} ${lastname}`} desc={desc} username={username} theme={theme}/>
          </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
              <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      <span style={{fontWeight:"bolder", color:theme.primaryText}}>Personnal Details</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Mail/>
                      :
                      <span>{email}</span>
                      </Box>
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <LinkRounded/>
                      :
                      <Link sx={{textDecoration:'none',color:theme.primaryAccent,
                    '&:hover':{color:theme.hoverAccent}
                  }}>http://localhost:3000</Link>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'}, borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                  <ButtonBase sx={{display:'flex',color: theme.primaryText,
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.hoverAccent,
                    }
                  }}><Edit/></ButtonBase>
              </CardActions>
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <span style={{fontWeight:"bolder", color:theme.primaryText}}>About</span>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <span>{about}</span>
              </Typography>
              </CardContent>
            </Card>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>About</span>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
        </Grid>
      </Grid>
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
