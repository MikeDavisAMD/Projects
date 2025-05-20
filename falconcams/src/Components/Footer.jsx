import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import FalconText from '../Assets/Images/FalconName.png'
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Footer = () => {
  return (
    <Grid container sx={{ backgroundColor: '#121B2B', color: '#E0E0E0' }}>
        <Grid size={{lg:3,md:3,sm:6,xs:12}}>
          <Box sx={{height:{lg:'210px',md:'260px',sm:'210px',xs:'210px'}}}>
            <Box sx={{
              display:'flex',justifyContent:'center',paddingTop:'10px',opacity:0.7
            }}>
              <img src={FalconText} alt="Falcon's Camera Shop" style={{height:'180px'}}/>
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
                fontStyle='normal'
                sx={{ color: '#00FFE7' }}>About Us</Typography>
            </Box>
            <Box sx={{
              padding:'0px 26px',
              paddingTop:'10px'
            }}>
              <Typography variant='p' fontSize='12px' sx={{ opacity: 0.7 }}>
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
                fontStyle='normal'
                sx={{ color: '#00FFE7' }}>Contact Us</Typography>
            </Box>
            <Box>
              <List>
                <ListItem sx={{paddingLeft:3}}>
                  <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><LocationPinIcon/></ListItemIcon>
                  <ListItemText sx={{ opacity: 0.7 }}>Nagercoil, Tamil-Nadu, India</ListItemText>
                </ListItem>
                <ListItem sx={{paddingLeft:3}}>
                  <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><PhoneIphoneIcon/></ListItemIcon>
                  <ListItemText sx={{ opacity: 0.7 }}>+91-6380037101</ListItemText>
                </ListItem>
                <ListItem sx={{paddingLeft:3.2}}>
                  <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><EmailIcon/></ListItemIcon>
                  <ListItemText sx={{ opacity: 0.7 }}>falconmd73@gmail.com</ListItemText>
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
                fontStyle='normal'
                sx={{ color: '#00FFE7' }}>Stay Connected</Typography>
            </Box>
            <Box>
              <List>
                <ListItem sx={{paddingLeft:4}}>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><FacebookIcon/></ListItemIcon>
                    <ListItemText sx={{ opacity: 0.7 }}>Facebook</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{paddingLeft:4}}>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><InstagramIcon/></ListItemIcon>
                    <ListItemText sx={{ opacity: 0.7 }}>Instagram</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{paddingLeft:4}}>
                  <ListItemButton sx={{padding:0}}>
                    <ListItemIcon sx={{ color: '#A0A0A0', minWidth: '30px', marginRight: '4px'}}><WhatsAppIcon/></ListItemIcon>
                    <ListItemText sx={{ opacity: 0.7 }}>Whatsapp</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>        
        </Grid>
        <Divider/>
        <Grid size={12}>
          <Box sx={{paddingTop:{lg:'10px',md:'10px',sm:'10px',xs:'15px'},height:{lg:'40px',md:'40px',sm:'40px',xs:'45px'},backgroundColor:'#121B2B',textAlign:'center',color:'#E0E0E0',borderTop: '1px solid #00FFE7'}}>
            <Typography variant='body2' className='footer'>Copyrights &#169; Falcon's Cameras. All Rights Reserved </Typography> 
          </Box>
        </Grid>
    </Grid>
  )
}
