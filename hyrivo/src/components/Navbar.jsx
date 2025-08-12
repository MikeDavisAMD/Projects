import React from 'react'
import {AccountCircle, ExpandMore, Group, Home, Message, Notifications, Search, Work} from '@mui/icons-material'
import { AppBar, Box, Button, ButtonBase, Container, InputBase, Menu, MenuItem, Toolbar } from '@mui/material'
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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{padding:0,textTransform:'none',color:'black'}}
      >
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <AccountCircle/>
          <Box sx={{display:'flex'}}>
            Me <ExpandMore/>
          </Box>
        </Box>
      </Button>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

const options = [
  {icon: <Home/>, name:'Home'},
  {icon: <Group/>, name:'Connections'},
  {icon: <Work/>, name:'Jobs'},
  {icon: <Message/>, name:'Messages'},
  {icon: <Notifications/>, name:'Notifications'}
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
  return (
    <AppBar position='static' sx={{backgroundColor:'rgba(255, 255, 255, 0.9)',backdropFilter:'blur(10px)',borderBottom:'1px solid #E0E0E0', color:'#1A1A1A'}}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{display:'flex',gap:2,alignItems:'center'}}>
            <Box component='img' src={logo} alt='Logo' height={{lg:'80px'}}></Box>
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
          <Box sx={{display:'flex',width:'100%',justifyContent:'flex-end',alignItems:'center',gap:2}}>
            {options.map(data => (
              <ButtonBase sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
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
