import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FalconLogo from '../Assets/Images/Falconscamlogo.png'
import { AccountCircle, AppRegistration, Close, Favorite, Login, MenuSharp, ShoppingCart } from '@mui/icons-material'


export const Navbar = () => {
  const navigate = useNavigate()
  // for account button
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseLogin = () => {
    navigate('/Login')
    setAnchorEl(null);
  };
  const handleCloseSignup = () => {
    navigate('/Signup')
    setAnchorEl(null);
  }
  // for Menu button
  const [openMenu, setOpen] = useState(false)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [openMenuAcc, setOpenAcc] = useState(false)
  const toggleDrawerAcc = (newOpen) => () => {
    setOpenAcc(newOpen);
  };
  return (
    <AppBar position='static' sx={{backgroundColor:'#190098',height:{lg:"100px",md:"100px",sm:"80px",xs:"80px"}, justifyContent:'center'}}>
      <Toolbar>
            <Box sx={{color:'white',margin:'0px', width:{lg:'85%',md:'85%',sm:'90%',xs:'80%'}}}>
              <Link to={'/'} style={{textDecoration:'none',WebkitTapHighlightColor: 'transparent'}}>
                <Box component='img' src={FalconLogo} alt='Falcon cams logo' sx={{height:{lg:'180px',md:'180px',sm:'130px',xs:'130px'}}}></Box>
              </Link>
            </Box>
            <Box sx={{display:{lg:"block",md:'block',xs:'none',sm:'none'}}}>
              <Tooltip title='Wishlist' arrow>
                <IconButton size="large" color="inherit"><Favorite/></IconButton>
              </Tooltip>
              <Tooltip title='cart' arrow>
                <IconButton size="large" color="inherit"><ShoppingCart/></IconButton>
              </Tooltip>
              <Tooltip title='login/signup' arrow>
                <IconButton size="large" color="inherit" onClick={handleClick}>
                  <AccountCircle/>
                </IconButton>
              </Tooltip>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleCloseLogin}>Login</MenuItem>
                  <MenuItem onClick={handleCloseSignup}>Signup</MenuItem>
              </Menu>
            </Box>
            <Box sx={{display:{lg:"none",md:'none',xs:'block',sm:'block'}}}>
              <IconButton size="large" color="inherit" onClick={toggleDrawer(true)}><MenuSharp/></IconButton>
              <Drawer open={openMenu} onClose={toggleDrawer(false)} anchor='right'>
                <Box sx={{ width: 250, height:'100%', display: 'flex', flexDirection: 'column' }} role="presentation" onClick={toggleDrawer(false)}>
                  <AppBar sx={{position:'static'}}>
                    <Toolbar sx={{display:'flex'}}>
                      <Typography variant='h4' 
                        sx={{fontFamily:"Anton, sans-serif",fontSize:'400',fontStyle:'normal',width:'80%'}}>
                        Menu
                      </Typography>
                      <IconButton size='large' color='inherit'><Close/></IconButton>
                    </Toolbar>
                  </AppBar>
                  <List sx={{flexGrow:1}}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon><Favorite/></ListItemIcon>
                        <ListItemText>Wishlist</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon><ShoppingCart/></ListItemIcon>
                        <ListItemText>Cart</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider/>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={toggleDrawerAcc(true)}>
                        <ListItemIcon><AccountCircle/></ListItemIcon>
                        <ListItemText>Login / Signup</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
            <Drawer open={openMenuAcc} onClose={toggleDrawerAcc(false)} anchor='right'>
              <Box sx={{ width: 250, height:'100%', display: 'flex', flexDirection: 'column' }} role="presentation" onClick={toggleDrawerAcc(false)}>
                <AppBar sx={{position:'static'}}>
                  <Toolbar sx={{display:'flex'}}>
                    <Typography variant='h4' 
                      sx={{fontFamily:"Anton, sans-serif",fontSize:'400',fontStyle:'normal',width:'80%'}}>
                      Register
                    </Typography>
                    <IconButton size='large' color='inherit'><Close/></IconButton>
                  </Toolbar>
                </AppBar>
                <List sx={{flexGrow:1}}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCloseLogin}>
                      <ListItemIcon><Login/></ListItemIcon>
                      <ListItemText>Login</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCloseSignup}>
                      <ListItemIcon><AppRegistration/></ListItemIcon>
                      <ListItemText>Signup</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
      </Toolbar>
    </AppBar>
  )
}
