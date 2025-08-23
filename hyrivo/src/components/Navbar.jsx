import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AppBar, Avatar, Box, ButtonBase, Divider, Drawer, Grid, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material'
import { ArrowBackIosNew, ExpandLess, ExpandMore, Group, Home, Logout, Message, Notifications, Person, Search, Settings, Work } from '@mui/icons-material'
import logo from '../Assets/Images/Hyrivo copy.png'
import icon from '../Assets/Images/icon.jpg'
import { logout } from '../Utils/logout'
import { styled } from '@mui/material/styles';
import { motion,AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const COLORS = {
  primaryBg: '#FFFFFF',
  secondaryBg: '#F5F7FA',
  cardBorder: '#E0E0E0',
  primaryText: '#1A1A1A',
  secondaryText: '#4F4F4F',
  mutedText: '#828282',
  primaryAccent: '#00BFFF',
  hoverAccent: '#FF6EC7',
};

const ME = ({users, logout}) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [opn, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const getInitials = (name) => {
    if (!name) return '+' 
    const names = name.split(' ')
    return names.length === 1 ? names[0][0].toUpperCase() : (names[0][0] + names[1][0]).toUpperCase()
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['My Account', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{index % 2 === 0 ? navigate('/Profile'): navigate('/Settings')}}>
              <ListItemIcon>
                {index % 2 === 0 ? <Person /> : <Settings />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout/>
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return(
    <>
    <Box sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
      <ButtonBase
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{p: 0,textTransform:'none',color:'black'}}
      >
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <Avatar sx={{background:'linear-gradient(135deg, #00BFFF, #1BC47D)',width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25},fontSize:{lg:17,md:13,sm:14}}}>
            {getInitials(users)}
          </Avatar>
          <Box sx={{display:'flex',alignItems:'center'}}>
            <Box component='span'>Me</Box>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </Box>
        </Box>
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <Box sx={{flexGrow:1}}>
          <Grid container sx={{alignItems:'center',justifyContent:'center'}}>
            <Grid size={4}>
              <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Avatar 
                sx={{background:'linear-gradient(135deg, #00BFFF, #1BC47D)',
                width:{lg:50,md:50,sm:45},
                height:{lg:50,md:50,sm:45},
                fontSize:20}}>{getInitials(users)}</Avatar>
              </Box>
            </Grid>
            <Grid size={8}>
              <Grid container spacing={1}>
                <Grid size={12}>
                  <span style={{fontWeight:'bolder'}}>{users}</span>
                </Grid>
                <Grid size={12}>
                  <Box component='span'>
                    Description
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <br /><Divider/>
        <MenuItem onClick={()=>{
          handleClose()
          navigate('/Profile')
        }}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
          <Person/> 
          My Account
          </Box>
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose()
          navigate('/Settings')
        }}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
            <Settings/> 
            Settings
          </Box>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={() => {
          handleClose()
          logout()
        }}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
            <Logout/> 
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Box>
    <Box sx={{display:{lg:'none',md:'none',sm:'none',xs:'block'}}}>
       <ButtonBase onClick={toggleDrawer(true)}>
         <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
           <Avatar sx={{background:'linear-gradient(135deg, #00BFFF, #1BC47D)',width:20,height:20,fontSize:12}}>{getInitials(users)}</Avatar>
         </Box>
       </ButtonBase>
       <Drawer anchor='bottom' open={opn} onClose={toggleDrawer(false)}>
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}>
            <br /><Avatar 
            sx={{background:'linear-gradient(135deg, #00BFFF, #1BC47D)',
            width:80,
            height:80,
            fontSize:40}}>{getInitials(users)}</Avatar>
            <span style={{fontWeight:'bolder',fontSize:30}}>{users}</span>
            <span style={{fontSize:20}}>Description</span>
          </Box>
          <br /><Divider/>
         {DrawerList}
       </Drawer>
    </Box>
    </>
  )
}

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: COLORS.secondaryBg,
  border: `1px solid ${COLORS.cardBorder}`,
  transition: 'all 0.3s ease',
  boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
  '&:hover': {
    backgroundColor: COLORS.hoverAccent,
    boxShadow:'0 4px 12px rgba(0,191,255,0.15)'
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:COLORS.secondaryText,
  transition:'color 0.3s ease',
  [`${SearchBar}:hover &`]: {
    color:COLORS.primaryAccent
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color:COLORS.secondaryText,
  fontFamily: "'Urbanist', sans-serif",
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: 'all 0.3s ease',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '22ch',
        backgroundColor: COLORS.primaryBg,
        borderRadius: 50,
        boxShadow:`0 0 0 2px ${COLORS.primaryAccent}`
      },
    },
  },
  '& .MuiInputBase-input::placeholder':{
    color: COLORS.mutedText,
    opacity: 1
  }
}));

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSearch,setShowSearch] = useState(false)
  const [user,setUser] = useState([])

  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:2000/user/me',{
        headers: {Authorization:`Bearer ${token}`}
      })
      setUser(response.data)
    } catch (error) {
      console.error("User not found")
    }
  }

  useEffect(()=>{fetchUser()},[])

  const options = useMemo(()=>[
    {icon: <Home sx={{width:{lg:30,md:25,sm:25,xs:20},height:{lg:30,md:25,sm:25,xs:20}}}/>, name:'Home' ,path:'/'},
    {icon: <Group sx={{width:{lg:30,md:25,sm:25,xs:20},height:{lg:30,md:25,sm:25,xs:20}}}/>, name:'Connections', path:'/Connections'},
    {icon: <Work sx={{width:{lg:30,md:25,sm:25,xs:20},height:{lg:30,md:25,sm:25,xs:20}}}/>, name:'Jobs', path: user?.isCompany ? '/JobsOrg' : '/JobsUser'},
    {icon: <Message sx={{width:{lg:30,md:25,sm:25,xs:20},height:{lg:30,md:25,sm:25,xs:20}}}/>, name:'Messages', path:'/Messages'},
    {icon: <Notifications sx={{width:{lg:30,md:25,sm:25,xs:20},height:{lg:30,md:25,sm:25,xs:20}}}/>, name:'Notifications', path:'/Notifications'}
  ],[user?.isCompany])

  
  const [activeTab,setActiveTab] = useState('Home')

  // navigate to options
  useEffect(()=>{
    const current = options.find(opt => 
      location.pathname === opt.path 
    )
    if (current) {
      setActiveTab(current.name)
    }
  },[location.pathname, options])

  // search animation
  const searchRef = useRef(null)

  useEffect(()=>{
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false)
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowSearch(false)
    }

    if (showSearch) {
      document.addEventListener("mousedown",handleClickOutside)
      document.addEventListener("keydown",handleEsc)
    }

    return () => {
      document.removeEventListener("mousedown",handleClickOutside)
      document.removeEventListener('keydown',handleEsc)
    }

  },[showSearch])

  return (
    <AppBar position='static' sx={{backgroundColor:'rgba(255, 255, 255, 0.9)',backdropFilter:'blur(10px)',borderBottom:'1px solid #E0E0E0', color:'#1A1A1A'}}>
      <Toolbar>
        <Box sx={{flexGrow:1,display:{lg:'block',md:'block',sm:'none',xs:'none'}}}>
          <Grid container spacing={4} alignItems='center'>
            <Grid size={{lg:3,md:2}}>
              <Box component='img' src={logo} height={{lg:'80px',md:'60px'}}></Box>
            </Grid>
            <Grid size={{lg:3,md:4}}>
              <Box sx={{display:'flex',alignItems:'center'}}>
                <SearchBar>
                  <SearchIconWrapper>
                    <Search/>
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </SearchBar>
              </Box>
            </Grid>
            <Grid size={6}>
              <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:{lg:2,md:1}}}>
                {options.map(data => (
                  <ButtonBase key={data.name} onClick={()=>navigate(data.path)} 
                  sx={{display:'flex',
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    color: activeTab === data.name ? COLORS.hoverAccent : COLORS.primaryText,
                    borderBottom: activeTab === data.name ? `3px solid ${COLORS.hoverAccent}` : `3px solid transparent`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: COLORS.hoverAccent,
                    }
                  }}>
                    {data.icon}
                    {data.name}
                  </ButtonBase>
                ))}
                <ME users={user.username} logout={() => logout(navigate,setUser)}/>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{flexGrow:1,display:{lg:'none',md:'none',sm:'block',xs:'none'}}}>
          <AnimatePresence mode='wait'>
          {showSearch ? (
            <motion.div
              key="search-sm"
              ref={searchRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={2} alignItems='center' justifyContent='center'>
                <Grid size={6}>
                  <ButtonBase onClick={()=>setShowSearch(false)}>
                    <ArrowBackIosNew/>
                  </ButtonBase>
                </Grid>
                <Grid size={6}>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                    <SearchBar>
                      <SearchIconWrapper>
                        <Search/>
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </SearchBar>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          ):(
            <motion.div
              key="normal-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3} alignItems='center'>
                <Grid size={6}>
                  <Box component='img' src={logo} height='45px'></Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                    <ButtonBase onClick={()=>setShowSearch(true)} sx={{display:'flex',
                      flexDirection:'column',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      color:COLORS.primaryText,
                      '&:hover': {
                        color: COLORS.hoverAccent,
                      }
                    }}>
                      <Search sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>
                      Search
                    </ButtonBase>
                    {options.map(data => (
                      <ButtonBase key={data.name} onClick={()=>navigate(data.path)} sx={{ pb:0.5, px:1,
                        color: activeTab === data.name ? COLORS.hoverAccent : COLORS.primaryText,
                        borderBottom: activeTab === data.name ? `3px solid ${COLORS.hoverAccent}` : `3px solid transparent`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: COLORS.hoverAccent,
                        }
                      }}>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                          {data.icon}
                          {data.name}
                        </Box>
                      </ButtonBase>
                    ))}
                    <ME users={user.username} logout={() => logout(navigate,setUser)}/>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          )}
          </AnimatePresence>
        </Box>
        <Box sx={{flexGrow:1,display:{lg:'none',md:'none',sm:'none',xs:'block'}}}>
          <AnimatePresence mode='wait'>
            {showSearch ? (
              <motion.div
                key="search-xs"
                ref={searchRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={2} alignItems='center' justifyContent='center'>
                  <Grid size={1}>
                    <ButtonBase onClick={()=>setShowSearch(false)}>
                      <ArrowBackIosNew/>
                    </ButtonBase>
                  </Grid>
                  <Grid size={11}>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                      <SearchBar>
                        <SearchIconWrapper>
                          <Search/>
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </SearchBar>
                    </Box>
                  </Grid>
                </Grid>
              </motion.div>
            ):(
              <motion.div
                key="normal-xs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={2} alignItems='center'>
                  <Grid size={3}>
                    <Box component='img' src={icon} height='30px'></Box>
                  </Grid>
                  <Grid size={9}>
                    <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                      <ButtonBase onClick={()=>setShowSearch(true)} sx={{display:'flex',
                        flexDirection:'column',
                        alignItems:'center', pb:0.5, px:1,
                      }}>
                        <Search sx={{width:20,height:20}}/>
                      </ButtonBase>
                      {options.map(data => (
                        <ButtonBase key={data.name} onClick={()=>navigate(data.path)} sx={{display:'flex',
                          flexDirection:'column',
                          alignItems:'center', pb:0.5, px:1,
                          color: activeTab === data.name ? COLORS.hoverAccent : COLORS.primaryText,
                          borderBottom: activeTab === data.name ? `3px solid ${COLORS.hoverAccent}` : `3px solid transparent`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: COLORS.hoverAccent,
                        }
                        }}>
                          {data.icon}
                        </ButtonBase>
                      ))}
                      <ME users={user.username} logout={() => logout(navigate,setUser)}/>
                    </Box>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
