import { AppBar, Avatar, Badge, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FalconLogo from '../Assets/Images/Falconscamlogo.png'
import UserAvatar from '../Assets/Images/FalconAvatar.jpeg'
import { AccountCircle, AppRegistration, Close, Favorite, Login, Logout, MenuSharp, ShoppingCart } from '@mui/icons-material'


export const Navbar = () => {
  const navigate = useNavigate()
  // wishlist
  const [wishlist,setWishlist] = useState(sessionStorage.getItem('wishlist') || 0)
  useEffect(()=>{
    const updateWishlistCount = () => {
      const wishlistCount = sessionStorage.getItem('wishlist') || 0
      setWishlist(Number(wishlistCount))
    }
    window.addEventListener('storage',updateWishlistCount)
    updateWishlistCount()
    return () => window.removeEventListener('storage',updateWishlistCount) 
  },[])
  // cart
  const [cart,setCart] = useState(sessionStorage.getItem('cart') || 0)
  useEffect(()=>{
    const updateCartCount = () => {
      const cartCount = sessionStorage.getItem('cart') || 0
      setCart(Number(cartCount))
    }
    window.addEventListener('storage',updateCartCount)
    updateCartCount()
    return () => window.removeEventListener('storage',updateCartCount) 
  },[])
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
  // Account changes while logged in
  const [loggedIn,setLoggedIn] = useState(false)
  const handleProfile = () => {
    navigate('/Profile')
    setAnchorEl(null)
  }
  useEffect(() => {
    const isLoggedIn =()=>{
      setLoggedIn(sessionStorage.getItem('loggedIn') === 'true');
    };
    window.addEventListener('storage',isLoggedIn)
    isLoggedIn()
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('loggedIn');
      sessionStorage.removeItem('username');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () =>{ 
      window.removeEventListener('storage',isLoggedIn) 
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }   
  },[]);
  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn')
    sessionStorage.removeItem('username')
    setLoggedIn(false)
    setAnchorEl(null)
    navigate('/')
  } 

  return (
    <AppBar position='static' sx={{backgroundColor:'#121B2B',height:{lg:"100px",md:"100px",sm:"80px",xs:"80px"}, justifyContent:'center'}}>
      <Toolbar>
            <Box sx={{color:'#E0E0E0',margin:'0px', width:{lg:'85%',md:'80%',sm:'90%',xs:'80%'}}}>
              <Link to={'/'} style={{textDecoration:'none',WebkitTapHighlightColor: 'transparent'}}>
                <Box component='img' src={FalconLogo} alt='Falcon cams logo' sx={{height:{lg:'180px',md:'180px',sm:'130px',xs:'130px'},opacity:0.8}}></Box>
              </Link>
            </Box>
            <Box sx={{display:{lg:"block",md:'block',xs:'none',sm:'none'}}}>
              <Tooltip title='Wishlist' arrow
              slotProps={{
                tooltip: {
                  sx: { bgcolor: '#121B2B', color: '#E0E0E0' },
                },
              }}>
                <IconButton size="large" color="inherit"
                sx={{
                  color: '#E0E0E0',
                  '&:hover': { color: '#00FFE7' }
                }}
                onClick={()=>{loggedIn ? navigate('/Wishlist') : navigate('/Login')}}>
                  <Badge badgeContent={wishlist} sx={{ '& .MuiBadge-badge': { backgroundColor: '#C8B8FF',color: '#121B2B',fontWeight:'bold' } }}>
                    <Favorite/>
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='cart' arrow 
              slotProps={{
                tooltip: {
                  sx: { bgcolor: '#121B2B', color: '#E0E0E0' },
                },
              }}>
                <IconButton size="large" color="inherit" 
                sx={{
                  color: '#E0E0E0',
                  '&:hover': { color: '#00FFE7' }
                }}
                onClick={()=>{loggedIn ? navigate('/Cart') : navigate('/Login')}}>
                  <Badge badgeContent={cart} sx={{ '& .MuiBadge-badge': { backgroundColor: '#C8B8FF',color: '#121B2B',fontWeight:'bold' } }}>
                    <ShoppingCart/>
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title={loggedIn ? 'Account' : 'Login / Signup'} arrow
              slotProps={{
                tooltip: {
                  sx: { bgcolor: '#121B2B', color: '#E0E0E0' },
                },
              }}>
                <IconButton size="large" color="inherit"
                sx={{
                  color: '#E0E0E0',
                  '&:hover': { color: '#00FFE7' }
                }}
                onClick={handleClick}>
                  {loggedIn ? (
                    <Avatar alt='user avatar' src={UserAvatar}></Avatar>
                  ):(
                    <AccountCircle/>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      sx: {
                        bgcolor: '#121B2B',
                        color: '#E0E0E0',
                      },
                    },
                  }}
                >
                  {loggedIn ? (
                    <>
                    <MenuItem onClick={handleProfile}
                    sx={{
                      color: '#E0E0E0',
                      '&:hover': { color: '#00FFE7' }
                    }}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}
                    sx={{
                      color: '#E0E0E0',
                      '&:hover': { color: '#00FFE7' }
                    }}>Logout</MenuItem>
                    </>
                  ):(
                    <>
                    <MenuItem onClick={handleCloseLogin}
                    sx={{
                      color: '#E0E0E0',
                      '&:hover': { color: '#00FFE7' }
                    }}>Login</MenuItem>
                    <MenuItem onClick={handleCloseSignup}
                    sx={{
                      color: '#E0E0E0',
                      '&:hover': { color: '#00FFE7' }
                    }}>Signup</MenuItem>
                    </>
                  )}
              </Menu>
            </Box>
            <Box sx={{display:{lg:"none",md:'none',xs:'block',sm:'block'}}}>
              <IconButton size="large" color="inherit"
              sx={{
                color: '#E0E0E0',
                '&:hover': { color: '#00FFE7' }
              }}
              onClick={toggleDrawer(true)}><MenuSharp/></IconButton>
              <Drawer open={openMenu} onClose={toggleDrawer(false)} anchor='right'>
                <Box sx={{ width: 250, height:'100%', display: 'flex', flexDirection: 'column',bgcolor: '#121B2B',color:'#E0E0E0' }} role="presentation" onClick={toggleDrawer(false)}>
                  <AppBar sx={{position:'static',backgroundColor:'#121B2B'}}>
                    <Toolbar sx={{display:'flex'}}>
                      <Typography variant='h4' 
                        sx={{fontFamily:"Anton, sans-serif",fontSize:'400',fontStyle:'normal',width:'80%'}}>
                        Menu
                      </Typography>
                      <IconButton size='large' color='inherit'
                      sx={{
                        color: '#E0E0E0',
                        '&:hover': { color: '#00FFE7' }
                      }}><Close/></IconButton>
                    </Toolbar>
                  </AppBar>
                  <List sx={{flexGrow:1}}>
                    <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                      <ListItemButton 
                      sx={{
                        color: '#E0E0E0',
                        backgroundColor: '#121B2B',
                        '&:hover': { color: '#00FFE7' }
                      }}
                      onClick={()=>{loggedIn ? navigate('/Wishlist') : navigate('/Login')}}>
                        <ListItemIcon sx={{color: '#E0E0E0'}}><Favorite/></ListItemIcon>
                        <ListItemText>Wishlist</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                      <ListItemButton 
                      sx={{
                        color: '#E0E0E0',
                        backgroundColor: '#121B2B',
                        '&:hover': { color: '#00FFE7' }
                      }}
                      onClick={()=>{loggedIn ? navigate('/Cart') : navigate('/Login')}}>
                        <ListItemIcon sx={{color: '#E0E0E0'}}><ShoppingCart/></ListItemIcon>
                        <ListItemText>Cart</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider/>
                  <List>
                    <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                          <ListItemButton 
                          sx={{
                            color: '#E0E0E0',
                            backgroundColor: '#121B2B',
                            '&:hover': { color: '#00FFE7' }
                          }}
                          onClick={toggleDrawerAcc(true)}>
                            <ListItemIcon sx={{color: '#E0E0E0'}}><AccountCircle/></ListItemIcon>
                            <ListItemText>{loggedIn ? 'Account' : 'Login / Signup'}</ListItemText>
                          </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
            <Drawer open={openMenuAcc} onClose={toggleDrawerAcc(false)} anchor='right'>
              <Box sx={{ width: 250, height:'100%', display: 'flex', flexDirection: 'column',bgcolor: '#121B2B',color:'#E0E0E0' }} role="presentation" onClick={toggleDrawerAcc(false)}>
                <AppBar sx={{position:'static'}}>
                  <Toolbar sx={{display:'flex'}}>
                    <Typography variant='h4' 
                      sx={{fontFamily:"Anton, sans-serif",fontSize:'400',fontStyle:'normal',width:'80%'}}>
                      Register
                    </Typography>
                    <IconButton size='large' color='inherit'
                    sx={{
                      color: '#E0E0E0',
                      '&:hover': { color: '#00FFE7' }
                    }}><Close/></IconButton>
                  </Toolbar>
                </AppBar>
                <List sx={{flexGrow:1}}>
                  <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                      {loggedIn ? (
                        <>
                        <ListItemButton 
                        sx={{
                          color: '#E0E0E0',
                          backgroundColor: '#121B2B',
                          '&:hover': { color: '#00FFE7' }
                        }}
                        onClick={handleProfile}>
                          <ListItemIcon>
                            <Avatar alt='user avatar' src={UserAvatar}></Avatar>
                          </ListItemIcon>
                          <ListItemText>Profile</ListItemText>
                        </ListItemButton>
                        </>
                      ):(
                        <>
                        <ListItemButton 
                        sx={{
                          color: '#E0E0E0',
                          backgroundColor: '#121B2B',
                          '&:hover': { color: '#00FFE7' }
                        }}
                        onClick={handleCloseLogin}>
                          <ListItemIcon sx={{color: '#E0E0E0'}}><Login/></ListItemIcon>
                          <ListItemText>Login</ListItemText>
                        </ListItemButton>
                        </>
                      )}
                  </ListItem>
                  {!loggedIn ? (
                    <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                    <ListItemButton 
                    sx={{
                      color: '#E0E0E0',
                      backgroundColor: '#121B2B',
                      '&:hover': { color: '#00FFE7' }
                    }}
                    onClick={handleCloseSignup}>
                      <ListItemIcon sx={{color: '#E0E0E0'}}><AppRegistration/></ListItemIcon>
                      <ListItemText>Signup</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  ):(
                    <></>
                  )}
                </List>
                <List>
                  {loggedIn ? (
                    <>
                    <ListItem disablePadding sx={{ backgroundColor: '#121B2B' }}>
                      <ListItemButton 
                      sx={{
                        color: '#E0E0E0',
                        backgroundColor: '#121B2B',
                        '&:hover': { color: '#00FFE7' }
                      }}
                      onClick={handleLogout}>
                        <ListItemIcon sx={{color: '#E0E0E0'}}><Logout/></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    </>
                  ):(
                    <></>
                  )}
                </List>
              </Box>
            </Drawer>
      </Toolbar>
    </AppBar>
  )
}
