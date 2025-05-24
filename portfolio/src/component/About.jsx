import { Facebook, GitHub, Mail, PhoneAndroid } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import aboutImg from '../Assets/Images/about.jpeg'

export const About = React.forwardRef((props,ref) => {
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},alignContent:'center'}}>
          <Typography variant='h1' 
          sx={{fontFamily:'"Special Gothic Expanded One", sans-serif',fontSize:'40px',
          fontWeight:400,fontStyle:'normal',color:'#1A73E8',textAlign:'center'}}>
            About Me
          </Typography>
        </Box>
      </Grid>
      <Grid size={{sm:12,xs:12}}>
        <Box sx={{display:{lg:'none',md:'none',sm:'flex',xs:'flex'},position:'relative',justifyContent:'center',backgroundColor:'#F5F7FA'}}>
          <Box component='img' src={aboutImg} variant='About image'
          sx={{height:{sm:'700px',xs:'400px'}}}></Box>
          <Box sx={{position:'absolute',backgroundColor:'#1A73E8',height:{sm:'60px',xs:'50px',},left:0,right:0,bottom:0}}>
            

          </Box>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:12,xs:12}}>
        <Box sx={{p:4,backgroundColor:'#F5F7FA',height:'auto'}}>
          <Typography variant='body1' sx={{fontSize:'20px'}}>
            <b>My name is Mike Davis.I am a budding Web Developer looking for a job oppurtunity.</b>
          </Typography><br />
          <Typography variant='body1' sx={{fontSize:'18px',opacity:'0.45'}}>
            I have completed my Bachelors Degree in Electronics and Communication Engineering at St.Xavier's Catholic College of Engineering. I have worked in Happiestminds Technologies Pvt. Ltd. as 
            an Engineer in Infrastructure Management and Security Service (IMSS) domain in Cloud Infrastucture Service (CIS).
            I have also worked as a Research Analyst in Rooks and Brooks Technologies Pvt. Ltd.
          </Typography><br />
          <Typography variant='body1' sx={{fontSize:'18px',opacity:'0.45'}}>
            I'm a self-motivated full stack developer with a strong foundation in web technologies and software development.  
            I recently completed my MERN-Fullstack course at Karka Software Academy, and I've done a project with shopping cart during that course.
            I enjoy solving real-world problems, learning new technologies, and collaborating on exciting projects.
          </Typography><br />
          <Divider sx={{borderBottomWidth: 2}}/>
          <br />
          <Grid container>
            <Grid size={{lg:6,md:6,sm:6,xs:12}}>
              <Box>
                <Box sx={{display:'flex',gap:1}}>
                <PhoneAndroid sx={{fontSize:'20px'}}/>
                <Typography variant='body1'>Phone</Typography>
                </Box>
                <Typography variant='body1' sx={{opacity:0.45}}>+91-7708172413</Typography>
              </Box>
            </Grid>
            <Grid size={{lg:6,md:6,sm:6,xs:12}}>
              <Box>
                <Box sx={{display:'flex',gap:1}}>
                <Mail sx={{fontSize:'20px'}}/>
                <Typography variant='body1'>E-Mail</Typography>
                </Box>
                <Typography variant='body1' sx={{opacity:0.45}}>mikedavisantony@gmail.com</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6}}>
        <Box sx={{display:{lg:'flex',md:'flex',sm:'none',xs:'none'},position:'relative',justifyContent:'center',backgroundColor:'#F5F7FA'}}>
          <Box component='img' src={aboutImg} variant='About image'
          sx={{height:{lg:'610px',md:'665px'}}}></Box>
          <Box sx={{position:'absolute',backgroundColor:'#1A73E8',height:{lg:'70px',md:'70px',},left:0,right:0,bottom:0}}>
            <Button variant='outlined' sx={{color:'#212121',backgroundColor:'#34A853',p:0,minWidth:'auto'}}><Facebook/></Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
})
