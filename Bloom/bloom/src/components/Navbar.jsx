import { Box, Grid, Typography,Button,Menu,MenuItem } from '@mui/material'
import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu" />


export const Navbar = () => {
  return (
    <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{display:"flex",alignItems:"center",height:"80px",backgroundColor:"black",color:"white",padding:"10px"}}>
                <Grid item lg={8} md={7} sm={10} xs={8}>
                    <Box sx={{fontSize:"50px",marginLeft:"50px"}}>
                        <Typography variant='p' className='pacifico-regular'>Bloom</Typography>
                    </Box>
                </Grid>
                <Grid item lg={4} md={5} sm={2} xs={4}>
                    <Grid container>
                        <Grid item lg={2} md={2}>
                            <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                            <Link to="/Home" style={{marginRight:"10px",textDecoration:"none",color:"white"}}>Home</Link>
                            </Box>
                        </Grid>
                        <Grid item lg={2.5} md={2.5}>
                            <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                            <Link to="/About" style={{marginRight:"10px",textDecoration:"none",color:"white"}}>About Us</Link>
                            </Box>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                            <Link to="/Services" style={{marginRight:"10px",textDecoration:"none",color:"white"}}>Services</Link>
                            </Box>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                            <Link to="/Portfolio" style={{marginRight:"10px",textDecoration:"none",color:"white"}}>Portfolio</Link>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3}>
                            <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                            <Link to="/Contact" style={{marginRight:"10px",textDecoration:"none",color:"white"}}>Contact Us</Link>
                            </Box>
                        </Grid>
                        <Grid item sm={2} xs={2}>
                            <Box sx={{display:{lg:"none",md:"none",sm:"block",xs:"block"}}}>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                    <Button variant="text" {...bindTrigger(popupState)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="100px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Home</MenuItem>
                                        <MenuItem onClick={popupState.close}>About Us</MenuItem>
                                        <MenuItem onClick={popupState.close}>Services</MenuItem>
                                        <MenuItem onClick={popupState.close}>Portfolio</MenuItem>
                                        <MenuItem onClick={popupState.close}>Contact Us</MenuItem>
                                    </Menu>
                                    </React.Fragment>
                                )}
                                </PopupState>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  )
}
