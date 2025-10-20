import React, { useState } from 'react'
import { AppBar, Box, Link, Grid, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton, Drawer } from '@mui/material'
import { Contacts, DataExploration, Extension, Info, Menu, School, WorkspacePremium } from '@mui/icons-material'

export const Navbar = ({AboutRef,EduRef,SkillsRef,ExpRef,ProjectRef,ContactRef}) => {
  const scrollAbout = () => {
    AboutRef.current?.scrollIntoView({behavior:'smooth'})
  }
  const scrollEdu = () => {
    EduRef.current?.scrollIntoView({behavior:'smooth'})
  }
  const scrollSkills = () => {
    SkillsRef.current?.scrollIntoView({behavior:'smooth'})
  }
  const scrollExp = () => {
    ExpRef.current?.scrollIntoView({behavior:'smooth'})
  }
  const scrollProject = () => {
    ProjectRef.current?.scrollIntoView({behavior:'smooth'})
  }
  const scrollContact = () => {
    ContactRef.current?.scrollIntoView({behavior:'smooth'})
  }
  // Drawer with options
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const options=[
    {label:'About', action:scrollAbout,icon:<Info/>},
    {label:'Education',action:scrollEdu,icon:<School/>},
    {label:'Skills',action:scrollSkills,icon:<Extension/>},
    {label:'Experience',action:scrollExp,icon:<WorkspacePremium/>},
    {label:'Projects',action:scrollProject,icon:<DataExploration/>},
    {label:'Contacts',action:scrollContact,icon:<Contacts/>}
  ]
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {options.map((data) => (
          <ListItem key={data.label} disablePadding>
            <ListItemButton onClick={()=>{
              data.action()
              setOpen(false)
            }}> 
              <ListItemIcon>
                {data.icon}
              </ListItemIcon>
              <ListItemText primary={data.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Grid container>
      <Grid size={12}>
        <Box sx={{flexFlow:1}}>
          <AppBar sx={{backgroundColor:'#1A73E8',height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'}}}>
            <Toolbar>
              <Box sx={{display:'flex',alignItems:'center',height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},width:{lg:'80%',md:'80%',sm:'90%',xs:'90%'}}}>
                <Typography 
                sx={{fontSize:{lg:'60px',md:'60px',sm:'50px',xs:'30px'},
                fontFamily:'"Space Grotesk", sans-serif',
                fontOpticalSizing:'auto',color:'#F9AB00',
                fontWeight:600,fontStyle:'normal'}}>
                  Mike Davis
                </Typography>
              </Box>
              <Box sx={{display:{lg:'flex',md:'flex',sm:'none',xs:'none'},justifyContent:'end',alignItems:'center',gap:3,height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},width:{lg:'20%',md:'20%',sm:'10%',xs:'10%'}}}>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollAbout}>
                  About
                </Link>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollEdu}>
                  Education
                </Link>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollSkills}>
                  Skills
                </Link>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollExp}>
                  Experience
                </Link>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollProject}>
                  Projects
                </Link>
                <Link sx={{color:'#212121',textDecoration:'none',cursor:'pointer','&:hover':{color:'#34A853'}}} onClick={scrollContact}>
                  Contact
                </Link>
              </Box>
              <Box sx={{alignContent:'center',display:{lg:'none',md:'none',sm:'flex',xs:'flex'},justifyContent:{sm:'end',xs:'end'}}}>
                <IconButton sx={{color:'#212121'}} onClick={toggleDrawer(true)}>
                  <Menu/>
                </IconButton>
                <Drawer open={open} anchor='right' onClose={toggleDrawer(false)} sx={{backgroundColor:'#F5F7FA'}}>
                  {DrawerList}
                </Drawer>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  )
}
