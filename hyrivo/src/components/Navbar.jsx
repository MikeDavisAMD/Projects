import React, { useState } from 'react'
import { ExpandLess, ExpandMore, Group, Home, Logout, Message, Notifications, Person, Search, Settings, Work} from '@mui/icons-material'
import { AppBar, Avatar, Box, ButtonBase, Container, Divider, InputBase, Menu, MenuItem, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles';
import logo from '../Assets/Images/Hyrivo copy.png'

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

const ME = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <Box>
      <ButtonBase
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{p: 0,textTransform:'none',color:'black'}}
      >
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <Avatar sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}>U</Avatar>
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
        <MenuItem onClick={handleClose}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
          <Person/> 
          My Account
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
            <Settings/> 
            Settings
          </Box>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose}>
          <Box sx={{display:'flex',gap:1,justifyContent:'center'}}>
            <Logout/> 
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  )
}

const options = [
  {icon: <Home sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>, name:'Home'},
  {icon: <Group sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>, name:'Connections'},
  {icon: <Work sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>, name:'Jobs'},
  {icon: <Message sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>, name:'Messages'},
  {icon: <Notifications sx={{width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25}}}/>, name:'Notifications'}
]

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
  const [activeTab,setActiveTab] = useState('Home')
  return (
    <AppBar position='static' sx={{backgroundColor:'rgba(255, 255, 255, 0.9)',backdropFilter:'blur(10px)',borderBottom:'1px solid #E0E0E0', color:'#1A1A1A'}}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{display:'flex',gap:2,alignItems:'center'}}>
            <Box component='img' src={logo} alt='Logo' height={{lg:'80px',md:'60px',sm:'45px',xs:'30px'}}></Box>
            <SearchBar sx={{display:{lg:'block',md:'none',sm:'none',xs:'none'}}}>
              <SearchIconWrapper>
                <Search/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchBar>
            <Box sx={{display:{lg:'none',md:'block',sm:'block',xs:'none'}}}>
              <ButtonBase sx={{display:'flex',
                flexDirection:'column',
                alignItems:'center', pb:0.5, px:1,
                transition: 'all 0.3s ease',
                color:COLORS.primaryText,
                '&:hover': {
                  color: COLORS.hoverAccent,
                }
              }}>
                <Search sx={{width:{lg:30,md:25,sm:20},height:{lg:30,md:25,sm:20}}}/>
                Search
              </ButtonBase>
            </Box>
          </Box>
          <Box sx={{display:'flex',width:'100%',justifyContent:'flex-end',alignItems:'center',gap:2}}>
            {options.map(data => (
              <ButtonBase key={data.name} onClick={()=>setActiveTab(data.name)} sx={{display:'flex',
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
                {data.name}
              </ButtonBase>
            ))}
            <ME/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
