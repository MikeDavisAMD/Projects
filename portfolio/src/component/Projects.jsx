import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ProjectsUi } from '../utils/ProjectsUi'

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
        <Box sx={{p:4,backgroundColor:'#F5F7FA'}}>
          <ProjectsUi/>
        </Box>   
      </Grid>
    </Grid>
  )
})
