import React from 'react'
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'

export const Navbar = ({footerRef}) => {
  const scrollFooter = () => {
    footerRef.current?.scrollIntoView({behavior:'smooth'})
  }
  return (
    <Grid container sx={{backgroundColor:'#1A73E8'}}>
      <Grid size={12}>
        <Box sx={{flexFlow:1}}>
          <AppBar sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'}}}>
            <Toolbar>
              <Box sx={{display:'flex',alignItems:'center',height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'}}}>
                <Typography 
                sx={{fontSize:{lg:'60px',md:'60px',sm:'50px',xs:'30px'},
                fontFamily:'"Space Grotesk", sans-serif',
                fontOpticalSizing:'auto',color:'#F9AB00',
                fontWeight:600,fontStyle:'normal'}}>
                  Mike Davis
                </Typography>
              </Box>
              <Box sx={{display:'flex',height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'}}}>
                <Button variant='text' sx={{color:'#212121'}} onClick={scrollFooter}>Footer</Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  )
}
