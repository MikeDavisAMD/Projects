import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Grid container>
        <Grid size={12}>
            <Box sx={{paddingTop:{lg:'10px',md:'10px',sm:'10px',xs:'15px'},height:{lg:'40px',md:'40px',sm:'40px',xs:'45px'},background:'radial-gradient(circle,#07CCFD,#07FDFD,#07A3FD)',textAlign:'center',color:'#190098'}}>
                <Typography variant='p' className='footer'>Copyrights &#169; Falcon's Cameras. All Rights Reserved </Typography>
            </Box>
        </Grid>
    </Grid>
  )
}
