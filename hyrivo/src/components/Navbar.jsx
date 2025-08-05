import React from 'react'
import { AppBar, Box, Container, Toolbar } from '@mui/material'
import logo from '../Assets/Images/Hyrivo copy.png'

export const Navbar = () => {
  return (
    <AppBar position='static' sx={{backgroundColor:'rgba(255, 255, 255, 0.9)',backdropFilter:'blur(10px)',borderBottom:'1px solid #E0E0E0', color:'#1A1A1A'}}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box>
            <Box component='img' src={logo} alt='Logo' height={{lg:'80px'}}></Box>
          </Box>
          <Box>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
