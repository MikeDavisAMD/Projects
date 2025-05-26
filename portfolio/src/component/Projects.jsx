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
        <Box sx={{display:'flex',justifyContent:'center',backgroundColor:'#F5F7FA',p:4}}>
        <Box sx={{position:'relative',
          overflow:'hidden',cursor:'pointer',
          '&:hover .image': {
            transform: 'scale(1.8)',
          },
          '&:hover .overlay': {
            opacity: 0.7,
          },
        }}>
            <Box component='img' src={project} alt='Project' className='image'
            sx={{height:{lg:'400px',md:'400px',sm:'400px',xs:'200px'},
            width:{lg:'auto',md:'auto',sm:'auto',xs:'100%'},transition:'transform 0.5s ease'}}></Box>
            <Box className='overlay' sx={{position:'absolute',width:'100%',height:'100%',
            bgcolor: '#F9AB00',display:'flex',alignItems:'center',justifyContent:'center',top:0,opacity: 0,
            transition: 'opacity 0.3s ease'
            }}>
              <Link href={'https://falconcams.web.app/'}
              sx={{textDecoration:'none',color:'#212121',fontSize:'22px',
              fontWeight:'bold',textShadow:'0 4px 8px #34A853',opacity:1}}>Falcon Camera</Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
})
