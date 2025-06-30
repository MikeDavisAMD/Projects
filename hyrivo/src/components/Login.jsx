import { Box, Grid } from '@mui/material'
import React from 'react'
import LoginImg from '../Assets/Images/Login.jpeg'

export const Login = () => {
  return (
    <Grid container>
      <Grid size={{lg:6}} sx={{display:{lg:'block'}}}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box component='img' src={LoginImg}
          height={{lg:'400px'}}></Box>
        </Box>
      </Grid>
      <Grid size={{lg:6}}>
        <Box >
          
        </Box>
      </Grid>
    </Grid>
  )
}
