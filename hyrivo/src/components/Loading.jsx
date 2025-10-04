import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import hyrivoLogo from '../Assets/Images/Hyrivo copy.png'

export const Loading = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Box sx={{width:'350px'}}>
        <LinearProgress/>
        </Box>
        <br />
        <Box component="img" src={hyrivoLogo} alt='Hyrivo Loading...' sx={{height: 80}}></Box> 
        <br />
        <Box sx={{width:'350px'}}>
        <LinearProgress/>
        </Box>
    </Box>
  )
}
