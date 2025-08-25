import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, ButtonBase, Drawer, FormControl, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ArrowBackIos, ExpandMore, Menu, Settings } from '@mui/icons-material'
import { COLORS } from '../Utils/colors'
import { useNavigate } from 'react-router-dom'

const General = () => {
    return (
        <Box>
            General
        </Box>
    )
}

const Display = () => {
    return (
        <Box sx={{flexGrow:1}}>
            <Grid container>
                <Grid size={12}>
                    <Box component='span' sx={{fontWeight:'bolder'}}>
                        Display
                    </Box><br /><br />
                    <Box>
                    <Accordion>
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
                                        defaultValue="Always Off"
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
    return (
        <Box>
            Account
        </Box>
    )
}

const Activities = () => {
    return (
        <Box>
            Activities
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
                        backgroundColor: COLORS.primaryAccent,
                        color: COLORS.primaryText,
                        "& .MuiListItemText-root": {
                            color: COLORS.primaryBg,
                        },
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: COLORS.hoverAccent,
                        color:COLORS.primaryText
                    },
                    "&:hover": {
                        backgroundColor: COLORS.secondaryBg,
                        color:COLORS.hoverAccent
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
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position={isSmall ? "static" : "fixed"} sx={{backgroundColor:COLORS.background,
            backdropFilter:'blur(10px)',
            borderBottom:'1px solid #E0E0E0', 
            color:'#1A1A1A',
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
                            color: COLORS.hoverAccent,
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
                                color: COLORS.hoverAccent,
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
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
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
                                backgroundColor: COLORS.primaryAccent,
                                color: COLORS.primaryText,
                                "& .MuiListItemText-root": {
                                    color: COLORS.primaryBg,
                                },
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: COLORS.hoverAccent,
                                color:COLORS.primaryText
                            },
                            "&:hover": {
                                backgroundColor: COLORS.secondaryBg,
                                color:COLORS.hoverAccent
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
