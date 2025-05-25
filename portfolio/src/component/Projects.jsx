import { Box, Grid, Link, Typography } from '@mui/material'
import project from '../Assets/Images/project.jpg'
import React from 'react'

export const Projects = React.forwardRef((props,ref) => {
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},alignContent:'center'}}>
          <Typography variant='h1' 
          sx={{fontFamily:'"Special Gothic Expanded One", sans-serif',fontSize:{lg:'40px',md:'40px',sm:'40px',xs:'20px'},
          fontWeight:400,fontStyle:'normal',color:'#1A73E8',textAlign:'center'}}>
            My Projects
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',backgroundColor:'#F5F7FA',p:4}}>
            <Box component='img' src={project} alt='Project'
            sx={{height:{lg:'400px'},transition:'transform 0.5s ease'}}></Box>
            <Box>
              <Link href={'https://falconcams.web.app/'}
              sx={{textDecoration:'none',color:'#212121'}}>Falcon Camera</Link>
            </Box>
          </Box>
      </Grid>
    </Grid>
  )
})
