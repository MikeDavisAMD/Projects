import React from 'react'
import {Box, Grid} from '@mui/material'

export const Footer = () => {
  return (
    <Grid container sx={{backgroundColor:'#1A73E8', color:'#212121'}}>
        <Grid size={12}>
            <Box sx={{alignContent:'center',textAlign: 'center',height:{lg:'80px',md:'80px',sm:'70px',xs:'50px'},fontFamily:'inter',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'12px'}}}>
                &#169; 2025 Mike Davis. Design and Developed by Mike Davis with React and MUI.
            </Box>
        </Grid>
    </Grid>
  )
}
