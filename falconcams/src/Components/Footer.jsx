import { Avatar, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import FalconAvatar from '../Assets/Images/FalconAvatar.jpeg'
import FalconText from '../Assets/Images/FalconName.png'
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Footer = () => {
  return (
    <Grid container sx={{background:'radial-gradient(circle,#07CCFD,#07FDFD,#07A3FD)',color:'#190098'}}>
        <Grid size={{lg:3,md:3,sm:6,xs:12}}>
          <Box sx={{height:{lg:'210px',md:'210px',sm:'210px',xs:'210px'}}}>
            <Box sx={{
              paddingTop:'20px',
              display:'flex',justifyContent:'center'
            }}>
              <Avatar alt='Falcons cam care' src={FalconAvatar} 
              sx={{width:'120px', height:'120px'}}
              />   
            </Box> 
            <Box sx={{
              display:'flex',justifyContent:'center'
            }}>
              <img src={FalconText} alt="Falcon's Camera Shop" style={{height:'70px'}}/>
            </Box>
          </Box>       
        </Grid>
        <Grid size={{lg:3,md:3,sm:6,xs:12}}>
        <Box sx={{height:{lg:'210px',md:'210px',sm:'210px',xs:'210px'}}}>
            <Box sx={{
              padding:'0px 26px',
              paddingTop:'20px'
            }}>
              <Typography variant='h4' 
                fontFamily="Anton, sans-serif"
                fontWeight='400'
                fontStyle='normal'>About Us</Typography>
            </Box>
            <Box sx={{
              padding:'0px 26px',
              paddingTop:'10px'
            }}>
              <Typography variant='p' fontSize='12px'>
                <b>Falcon's camera care</b> is your trusted destination for camera sales and expert servicing.
                We offer a wide range of new and used cameras, plus fast, reliable repairs and maintenance.
                With years of experience, we help photographers keep their gear performing at its best.
              </Typography>
            </Box>
          </Box>        
        </Grid>
        <Grid size={{lg:3,md:3,sm:6,xs:12}}>
          <Box sx={{height:{lg:'210px',md:'210px',sm:'210px',xs:'210px'}}}>
            <Box sx={{
              padding:'0px 26px',
              paddingTop:'20px'
            }}>
              <Typography variant='h4' 
                fontFamily="Anton, sans-serif"
                fontWeight='400'
                fontStyle='normal'>Contact Us</Typography>
            </Box>
            <Box>
              <List>
                <ListItem>
                  <ListItemIcon><LocationPinIcon/></ListItemIcon>
                  <ListItemText>Nagercoil, Tamil-Nadu, India</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon><PhoneIphoneIcon/></ListItemIcon>
                  <ListItemText>+91-6380037101</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon><EmailIcon/></ListItemIcon>
                  <ListItemText>falconmd73@gmail.com</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Box>        
        </Grid>
        <Grid size={{lg:3,md:3,sm:6,xs:12}}>
          <Box sx={{height:{lg:'210px',md:'210px',sm:'210px',xs:'210px'}}}>
          <Box sx={{
              padding:'0px 26px',
              paddingTop:'20px'
            }}>
              <Typography variant='h4' 
                fontFamily="Anton, sans-serif"
                fontWeight='400'
                fontStyle='normal'>Stay Connected</Typography>
            </Box>
            <Box>
              <List>
                <ListItem>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon><FacebookIcon/></ListItemIcon>
                    <ListItemText>Facebook</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon><InstagramIcon/></ListItemIcon>
                    <ListItemText>Instagram</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon><WhatsAppIcon/></ListItemIcon>
                    <ListItemText>Whatsapp</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>        
        </Grid>
        <Divider/>
        <Grid size={12}>
          <Box sx={{paddingTop:{lg:'10px',md:'10px',sm:'10px',xs:'15px'},height:{lg:'40px',md:'40px',sm:'40px',xs:'45px'},background:'radial-gradient(circle,#07CCFD,#07FDFD,#07A3FD)',textAlign:'center',color:'#190098'}}>
            <Typography variant='p' className='footer'>Copyrights &#169; Falcon's Cameras. All Rights Reserved </Typography>
          </Box>
        </Grid>
    </Grid>
  )
}
