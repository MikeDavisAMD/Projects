import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Alert, AppBar, Box, Button, ButtonBase, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, FormControl, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup, Snackbar, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ArrowBackIos, Close, Delete, Download, Edit, ExpandMore, Menu, Save, Settings, SwapHoriz, TaskAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const General = () => {
    const {theme} = useThemeContext()
    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'20px'}}}>
                        General Preferences
                    </Box><br /><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Preferred Feed View</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Select your Prefered View. 
                                </Box>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Most Relevant Posts"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Most Relevant Posts" control={<Radio sx={{color:theme.primaryText}} />} label="Most Relevant Posts (Recommended)" />
                                        <FormControlLabel value="Most Recent posts" control={<Radio sx={{color:theme.primaryText}} />} label="Most Recent posts" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const Display = () => {
    const {themeMode, setThemeMode} = useThemeContext()

    const {theme} = useThemeContext()

    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'20px'}}}>
                        Display
                    </Box><br /><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Dark Mode</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Choose how your Hyrivo experience looks for this device. 
                                </Box>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={themeMode}
                                        onChange={(e) => setThemeMode(e.target.value)}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Device Settings" control={<Radio sx={{color:theme.primaryText}}/>} label="Device Settings" />
                                        <FormControlLabel value="Always On" control={<Radio sx={{color:theme.primaryText}}/>} label="Always On" />
                                        <FormControlLabel value="Always Off" control={<Radio sx={{color:theme.primaryText}}/>} label="Always Off" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const Account = () => {
    const {theme} = useThemeContext()
    const [loading,setLoading] = useState(false)
    const [delLoad,setdelLoad] = useState(false)
    const navigate = useNavigate()

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    // dialog box
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleChangeType = async () => {
        setLoading(true)
        try {
            const response = await axios.put('http://localhost:2000/user/change-type',{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                }
            })

            const updatedUser = response.data.user
            setOpen(true)
            setSuccess(`Account type changed to ${updatedUser.isCompany ? "Organization" : "Job Seeker"}`)
        } catch (error) {
            setOpen(true)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        setdelLoad(true)
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (!token) {
            setOpen(true)
            setError("Invalid or No token found")
        }

        const decoded = jwtDecode(token)
        const userId = decoded.id || decoded._id || decoded.userId

        try {
            await axios.delete(`http://localhost:2000/user/${userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('token') || sessionStorage.removeItem('token')
            setOpen(true)
            setSuccess("Account Deleted Successfully")
            navigate('/')
        } catch (error) {
            setOpen(true)
            setError(error.message)
        } finally {
            setdelLoad(false)
        }
    }

    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'20px'}}}>
                        Account Management
                    </Box><br /><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Change Account Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Change the type of account of the current user. 
                                </Box><br />
                                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button variant='outlined' size='large' disabled={loading}
                                    onClick={handleChangeType}
                                    startIcon={
                                        loading ? (
                                            <CircularProgress size={24} color="inherit"/>
                                        ) : (
                                            <SwapHoriz/>
                                        )
                                    }
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                            {loading ? 'Changing...'  :  'Change'}
                                        </Box></Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Close Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Choose how your Hyrivo experience looks for this device. 
                                </Box><br />
                                <Box sx={{display:'flex',justifyContent:'flex-end',gap:1}}>
                                      <Button variant='outlined' size='large' disabled={delLoad}
                                      onClick={handleClickOpen}
                                      startIcon={<Delete/>}
                                        sx={{
                                            color:theme.error,
                                            borderColor:theme.error,
                                            '&:hover':{
                                            backgroundColor:theme.errorHover,
                                            borderColor:theme.errorHover,
                                            color:theme.primaryBg
                                            }
                                        }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                             {delLoad ? 'Deleting...' : 'Delete Account'}
                                        </Box></Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity={error ? 'error' : 'success'}
                sx={{
                backgroundColor: error ? '#FF4D6D' : '#1BC47D'
                }}>
                {error || success}
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you Sure to Delete Account?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to permanently delete your account? 
                This action cannot be undone and all your data will be lost.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant='outlined' size='large' 
                onClick={handleCloseDialog}
                startIcon={<Close/>}
                sx={{
                    color:theme.error,
                    borderColor:theme.error,
                    '&:hover':{
                    backgroundColor:theme.errorHover,
                    borderColor:theme.errorHover,
                    color:theme.primaryBg
                    }
                }}>Cancel</Button>
                <Button variant='outlined' size='large' disabled={delLoad}
                onClick={handleDeleteAccount}
                startIcon={
                delLoad ? (
                    <CircularProgress size={24} color="inherit"/>
                ) : (
                    <TaskAlt/>
                )
                }
                sx={{
                    color:theme.primaryAccent,
                    borderColor:theme.primaryAccent,
                    '&:hover':{
                      backgroundColor:theme.hoverAccent,
                      borderColor:theme.hoverAccent,
                      color:theme.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                        {delLoad ? 'Deleting...' : 'Proceed'}
                </Box></Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const Activities = () => {
    const {theme} = useThemeContext()
    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'20px'}}}>
                        Activities
                    </Box><br /><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Activities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Download your account activities like Logging etc.,. 
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button variant='outlined' size='large' 
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Download/> Download
                                        </Box></Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const Sign = () => {
    const {theme} = useThemeContext()
    const [loading,setLoading] = useState(false)

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [editUsername, setEditUsername] = useState(false)

    const [userId, setUserId] = useState('')

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        if (!token) {
            setOpen(true)
            setError("No token ot Invalid Token")
        }

        const decoded = jwtDecode(token)
        const userId = decoded.id || decoded._id || decoded.userId

        try {
            const response = await axios.get("http://localhost:2000/user/me",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const users = response.data.user
            setUsername(users.username)
            setEmail(users.email)
            setUserId(userId)
        } catch (error) {
            setOpen(true)
            setError(error.message)
        } 
    }

    const handleChangeUsername = async () => {
        if (!editUsername) {
            setEditUsername(true)
            return
        }
        setLoading(true)
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            await axios.put("http://localhost:2000/user/update/username",{username},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccess("Username updated successfully")
            setOpen(true)
            setEditUsername(false)
        } catch (error) {
            setOpen(true)
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChangeEmail = async () => {
        setLoading(true)
    }

    const handleChangePassword = async () => {
        setLoading(true)
    }

    useEffect(()=>{fetchUser()},[])
    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'20px'}}}>
                        Sign-In
                    </Box><br /><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Change Email</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                change your current Email: {email}
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button variant='outlined' size='large' onClick={handleChangeEmail}
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Edit/> {loading ? <CircularProgress size={24} color="inherit"/> : 'Change Email'}
                                        </Box></Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Change Username</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                {editUsername ? (
                                    <TextField variant='standard' value={username} 
                                    onChange={e => setUsername(e.target.value)} autoFocus
                                    slotProps={{
                                        input: {
                                            style: {
                                                width: `${Math.max(username.length,4)}ch`
                                            }
                                        }
                                    }}/>
                                ) : (
                                    <Box component='span'>
                                    Change your current username: {username}
                                    </Box>
                                )}
                                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button variant='outlined' size='large' onClick={handleChangeUsername}
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}>{editUsername ? (
                                        <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Save/> {loading ? <CircularProgress size={24} color="inherit"/> : 'Save Username'}
                                        </Box>
                                      ):(
                                        <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Edit/> Change Username
                                        </Box>
                                      )}</Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box><br />
                    <Box>
                    <Accordion sx={{
                        backgroundColor:theme.secondaryBg,
                        color: theme.primaryText,
                        border: `1px solid ${theme.cardBorder}`
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMore sx={{color:theme.primaryText}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Change Password</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Change your current password
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button variant='outlined' size='large' onClick={handleChangePassword}
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Edit/> {loading ? <CircularProgress size={24} color="inherit"/> :'Change Password'}
                                        </Box></Button>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity={error ? 'error' : 'success'}
                sx={{
                backgroundColor: error ? '#FF4D6D' : '#1BC47D'
                }}>
                {error || success}
                </Alert>
            </Snackbar>
        </Box>
    )
}

const COMPONENTS = [
    {name: 'General', component:<General/>},
    {name: 'Display', component:<Display/>},
    {name: 'Activities', component:<Activities/>},
    {name: 'Sign In', component: <Sign/>},
    {name: 'Account', component:<Account/>},
]

export const Setting = () => {
    const navigate = useNavigate()

    const {theme} = useThemeContext()
    
    const [active,setActive] = useState("General")

    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {COMPONENTS.map((data) => (
            <ListItem key={data.name} disablePadding>
                <ListItemButton selected={active === data.name} onClick={()=>setActive(data.name)}
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: theme.primaryAccent,
                        color: theme.primaryText,
                        "& .MuiListItemText-root": {
                            color: theme.primaryBg,
                        },
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: theme.hoverAccent,
                        color:theme.primaryText
                    },
                    "&:hover": {
                        backgroundColor: theme.secondaryBg,
                        color:theme.hoverAccent
                    },
                }}>
                    <ListItemText primary={data.name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    </Box>
  );

  const isSmall = useMediaQuery(useTheme().breakpoints.down('md'))

  return (
    <Box sx={{flexGrow: 1, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position={isSmall ? "static" : "fixed"} sx={{backgroundColor:theme.background,
            backdropFilter:'blur(10px)',
            borderBottom:`1px solid ${theme.cardBorder}`, 
            color:theme.primaryText,
            zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
              <Box sx={{flexGrow:1}}>
                <Grid container sx={{alignItems:'center'}}>
                    <Grid size={{lg:0.5,md:0.5,sm:1,xs:1.5}}>
                        <Box>
                            <ButtonBase onClick={()=>navigate('/')} sx={{display:'flex',
                            flexDirection:'column',justifyContent:'flex-end',
                            alignItems:'center', pb:0.5, px:1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                            color: theme.hoverAccent,
                            }
                        }}>
                            <ArrowBackIos/>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid size={{lg:11.5,md:11.5,sm:10,xs:9}}>
                        <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                            <Settings sx={{
                            height:{lg:'35px',md:'35px',sm:'32px'},
                            width:{lg:'35px',md:'35px',sm:'32px'}}}/>
                            <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                                Settings
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{sm:1,xs:1.5}} sx={{display:{lg:'none',md:'none',sm:'block',xs:'block'}}}>
                        <ButtonBase onClick={toggleDrawer(true)} sx={{display:'flex',
                            flexDirection:'column',justifyContent:'flex-end',
                            alignItems:'center', pb:0.5, px:1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: theme.hoverAccent,
                            }
                        }}>
                            <Menu/>
                        </ButtonBase>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={12} sx={{display:{lg:'block',md:'block',sm:'none',xs:'none'}}}>
            <Drawer
                variant="permanent"
                sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: 240, boxSizing: 'border-box',
                    backgroundColor:theme.primaryBg,
                    color: theme.primaryText
                 },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                <List>
                    {COMPONENTS.map((data) => (
                    <ListItem key={data.name} disablePadding>
                        <ListItemButton selected={active === data.name} onClick={()=>setActive(data.name)}
                        sx={{
                            "&.Mui-selected": {
                                backgroundColor: theme.primaryAccent,
                                color: theme.primaryText,
                                "& .MuiListItemText-root": {
                                    color: theme.primaryBg,
                                },
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: theme.hoverAccent,
                                color:theme.primaryText
                            },
                            "&:hover": {
                                backgroundColor: theme.secondaryBg,
                                color:theme.hoverAccent
                            },
                        }}>
                            <ListItemText primary={data.name} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </Box>
            </Drawer>
            <Box sx={{mt:8,ml:32,mr:2}}>
                {COMPONENTS.find((c)=>c.name === active)?.component}
            </Box>
        </Grid>
        <Grid size={12} sx={{display:{lg:'none',md:'none',sm:'block',xs:'block'}}}>
            <Box sx={{m:2}}>
                {COMPONENTS.find((c)=>c.name === active)?.component}
            </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
