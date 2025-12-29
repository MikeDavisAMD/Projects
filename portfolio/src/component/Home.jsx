import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import homeimage from '../Assets/Images/home.jpeg'
import { TypeAnimation } from 'react-type-animation'

export const Home = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <Box sx={{position:'relative'}}>
        <Box component='img' src={homeimage} alt='home image'
        sx={{width:'100%',height:{lg:'650px',md:'650px',sm:'500px',xs:'350px'},opacity:0.8,
        mt:{lg:0,md:0,sm:4,xs:6}}}></Box>
        <Box sx={{
          position:'absolute',
          height:'auto',
          width:'100%', 
          textAlign:'center',
          top:{lg:'20%',md:'20%',sm:'25%',xs:'33%'}
          }}>
          <Typography variant='body1' 
          sx={{textShadow:'0 6px 6px #F9AB00',color:'#212121',fontSize:{lg:'100px',md:'100px',sm:'70px',xs:'30px'}}}>
            Hi<span style={{color:'#F9AB00'}}>,</span> I'm <br />Mike Davis<span style={{color:'#F9AB00'}}>.</span>
          </Typography><br />
          <Box sx={{textShadow:'0 6px 6px #F9AB00',fontSize:{lg:'70px',md:'70px',sm:'50px',xs:'20px'},color:'#34A853'}}>
            <TypeAnimation
              sequence={['Web Developer',1000,'Frontend Developer',1000,'Backend Developer',1000,'Fullstack Developer',1000,'MERN Developer',1000]}
              repeat={Infinity}
            />
          </Box>
          <br />
          <Box>
            <Button variant='contained' href='/Resume.pdf' download 
            sx={{backgroundColor:'#F9AB00',color:'#212121'}}>Download Resume</Button>
          </Box>
        </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
