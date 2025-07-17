import { Box, Button, Card, CardContent, Grid, Link, List, ListItemButton, ListItemText, Menu, MenuItem, Portal, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import loginValidate from '../Assets/Images/LoginValidate.png'

export const FPWVerification = () => {
  // Menu for getting validation otp
  const options = [
    `Registered Email `,
    `Registered Mobile Number ending with  `
    ];
const [anchorEl, setAnchorEl] = React.useState(null);
const [selectedIndex, setSelectedIndex] = React.useState(1);
const open = Boolean(anchorEl);
const handleClickListItem = (event) => {
setAnchorEl(event.currentTarget);
};

const handleMenuItemClick = (event, index) => {
setSelectedIndex(index);
setAnchorEl(null);
};

const handleCloseMenu = () => {
setAnchorEl(null);
};

//   portal
const [show, setShow] = useState(false);
const container = useRef(null);

const handleClickPortal = () => {
setShow(!show);
};

return (
<Grid container>
  <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
    <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'end',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
      <Box component='img' src={loginValidate}
      height={{lg:'250px',md:'250px',sm:'200px'}}></Box>
    </Box>
  </Grid>
  <Grid size={{lg:6,md:6,sm:6,xs:12}}>
    <Box sx={{display:'flex',justifyContent:{lg:'start',md:'start',sm:'center',xs:'center'},alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px',xs:'500px'}}}>
      <Card className='animate__animated animate__fadeInTopRight' sx={{width:{lg:'70%',md:'80%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
        <CardContent>
          <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
            <span>OTP Verification</span>
          </Typography>
          <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            <Box>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItemButton
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="Receive OTP through"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
                >
                <ListItemText
                    primary= {<span style={{fontWeight:'bolder'}}>Receive OTP through</span>}   
                    secondary={<span>{options[selectedIndex]}</span>}
                    sx={{textAlign:'center'}}
                />
                
                </ListItemButton> <br />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button variant='outlined' onClick={handleClickPortal} sx={{
                        color:'#00BFFF',
                        borderColor:'#00BFFF',
                        '&:hover':{
                            backgroundColor:'#FF6EC7',
                            borderColor:'#FF6EC7',
                            color:'#fff'
                        }
                        }}>send otp</Button>
                </Box>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                slotProps={{
                list: {
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                },
                }}
            >
                {options.map((option, index) => (
                <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                >
                    {option}
                </MenuItem>
                ))}
            </Menu>
            </Box> <br />
            <Box sx={{width:'100%',display:'flex',justifyContent:'center'}} ref={container} />
            {show ? (
            <Portal container={() => container.current}>
                <Box sx={{width:'80%',textAlign:'center',
                    border:'2px outset grey',p:2,borderRadius:'5px',boxShadow:'5px 5px 10px grey'
                }}>
                <Typography variant='span' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'}}}>
                    Enter the OTP received
                </Typography>
                <Box sx={{display:'flex',width:'100%',gap:1}}>
                <TextField variant='standard'  
                sx={{width:'80%', 
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                <TextField variant='standard'  
                sx={{width:'80%',
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                <TextField variant='standard'  
                sx={{width:'80%',
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                <TextField variant='standard'  
                sx={{width:'80%',
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                <TextField variant='standard'  
                sx={{width:'80%',
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                <TextField variant='standard'  
                sx={{width:'80%',
                '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                },
                '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                },
                '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                },
                '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                },
                '& .MuiInputBase-input': { //to bring cursor to center of textfield
                    textAlign:'center',fontWeight:'bold',fontSize:'20px'
                }
                }}/>
                </Box> <br />
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Button variant='outlined' sx={{
                        color:'#00BFFF',
                        borderColor:'#00BFFF',
                        '&:hover':{
                            backgroundColor:'#FF6EC7',
                            borderColor:'#FF6EC7',
                            color:'#fff'
                        }
                        }}>verify otp</Button><br />
                    <Link href="/ForgotPassword" sx={{textDecoration:'none',fontSize:'15px',color:'#00BFFF',
                    '&:hover':{color:'#FF6EC7'}
                }}>Resend OTP?</Link>
                </Box>
            </Box>
            </Portal>
            ) : null}
             <br />                               
          </Box><br />              
        </CardContent>
      </Card>
    </Box>
  </Grid>
</Grid>
)
}

