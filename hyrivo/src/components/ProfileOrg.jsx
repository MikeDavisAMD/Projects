import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { Alert, AppBar, Box, ButtonBase, Grid, Snackbar, Toolbar } from '@mui/material'
import { ArrowBackIos, Person } from '@mui/icons-material'
import { ProfileUI } from '../Utils/ProfileUI'
import axios from 'axios'

export const ProfileOrg = () => {
    const {theme} = useThemeContext()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

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
        setName(user.companyName)
        setDesc(user.description)
      } catch (error) {
        setError(error.message)
        setOpen(true)
      }
    }

    useEffect(() => {fetchUser()},[])

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
            <ProfileUI name={name} desc={desc} theme={theme}/>
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
