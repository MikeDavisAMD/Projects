import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ButtonBase, Drawer, FormControl, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ArrowBackIos, Delete, Download, ExpandMore, Menu, PersonOff, Settings, SwapHoriz } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../Utils/ThemeContext'

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
                        expandIcon={<ExpandMore/>}
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
                                        <FormControlLabel value="Most Relevant Posts" control={<Radio />} label="Most Relevant Posts (Recommended)" />
                                        <FormControlLabel value="Most Recent posts" control={<Radio />} label="Most Recent posts" />
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
                        expandIcon={<ExpandMore/>}
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
                                        <FormControlLabel value="Device Settings" control={<Radio />} label="Device Settings" />
                                        <FormControlLabel value="Always On" control={<Radio />} label="Always On" />
                                        <FormControlLabel value="Always Off" control={<Radio />} label="Always Off" />
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
                        expandIcon={<ExpandMore/>}
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
                                            <SwapHoriz/> Change
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
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Close Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
                                <Box component='span'>
                                Choose how your Hyrivo experience looks for this device. 
                                </Box>
                                <Box sx={{display:{lg:'flex',md:'flex',sm:'none',xs:'none'},justifyContent:'flex-end',gap:1}}>
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
                                            <PersonOff/> Disable Account
                                        </Box></Button>
                                      <Button variant='outlined' size='large' 
                                    sx={{
                                        color:theme.error,
                                        borderColor:theme.error,
                                        '&:hover':{
                                          backgroundColor:theme.errorHover,
                                          borderColor:theme.errorHover,
                                          color:theme.primaryBg
                                        }
                                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                        <Delete/> Delete Account
                                        </Box></Button>
                                </Box>
                                <Box sx={{display:{lg:'none',md:'none',sm:'flex',xs:'flex'},justifyContent:'flex-end',gap:1}}>
                                    <Button variant='outlined' size='large' 
                                    sx={{
                                        color:theme.primaryAccent,
                                        borderColor:theme.primaryAccent,
                                        '&:hover':{
                                          backgroundColor:theme.hoverAccent,
                                          borderColor:theme.hoverAccent,
                                          color:theme.primaryBg
                                        }
                                      }}><PersonOff/></Button>
                                      <Button variant='outlined' size='large' 
                                    sx={{
                                        color:theme.error,
                                        borderColor:theme.error,
                                        '&:hover':{
                                          backgroundColor:theme.errorHover,
                                          borderColor:theme.errorHover,
                                          color:theme.primaryBg
                                        }
                                      }}><Delete/></Button>
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
                        expandIcon={<ExpandMore/>}
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

const COMPONENTS = [
    {name: 'General', component:<General/>},
    {name: 'Display', component:<Display/>},
    {name: 'Activities', component:<Activities/>},
    {name: 'Account', component:<Account/>}
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
