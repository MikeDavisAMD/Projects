import { Alert, AppBar, Avatar, Box, Chip, CssBaseline, Divider, Drawer, Grid, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Snackbar, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../Utils/ThemeContext';
import { ProfileOrgViewCardUi } from '../Utils/profileOrgViewCardUi';
import axios from 'axios';
import { Email, Groups2, Language, LocationCity, Place, Smartphone, WorkspacePremium } from '@mui/icons-material';
import foundedOn from '../Assets/icons/foundedOn.png'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ProfileCardOrg = () => {
  const { profileType, username } = useParams()
  const { theme } = useThemeContext()
  const [user, setUser] = useState('')
  const [profile, setProfile] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [value, setValue] = useState(0);
  const drawerWidth = { lg: 440, md: 400, sm: 340 };

  // Snackbar
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Desc = () => {
    return (
      <Typography sx={{ marginBottom: 2, color: theme.primaryText }}>
        {profile.description}
      </Typography>
    )
  }

  const About = () => {
    return (
      <Box>
        <Typography sx={{ marginBottom: 2, color: theme.primaryText }}>
          {profile.about}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          <WorkspacePremium /> :
          {profile.specialities.map((s, i) => (
            <Chip key={i} label={s}
              sx={{ backgroundColor: theme.cardBg, color: theme.primaryText, border: `1px solid ${theme.cardBorder}` }} />
          ))}
        </Stack>
      </Box>
    )
  }

  const Contact = () => {

    const CONTACT = [
      { icon: <Email />, name: 'E-Mail', detail: user.email },
      { icon: <Smartphone />, name: 'Mobile', detail: profile.mobile },
      { icon: <Place />, name: 'Current Location', detail: profile.location },
      { icon: <LocationCity />, name: 'Headquarters', detail: profile.headquarters },
    ]

    const CONTACT2 = [
      { icon: <img src={foundedOn} alt="FoundedOnIcon" height="25" width="25" />, name: 'Founded On', detail: profile.founded },
      { icon: <Groups2 />, name: 'Company Size', detail: profile.size },
      {
        icon: <Language />, name: 'Website',
        detail: <Link href={profile.website} sx={{
          textDecoration: 'none', color: theme.primaryAccent,
          '&:hover': { color: theme.hoverAccent }
        }}>{profile.website}</Link>
      }
    ]

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ lg: 6, md: 6, sm: 12 }}>
            {CONTACT.map((s, i) => (
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: theme.primaryBg }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {s.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={s.name} secondary={s.detail}
                    slotProps={{
                      primary: { sx: { color: theme.primaryText } },
                      secondary: { sx: { color: theme.secondaryText } }
                    }} />
                </ListItem>
              </List>
            ))}
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 12 }}>
            {CONTACT2.map((s, i) => (
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: theme.primaryBg }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {s.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={s.name} secondary={s.detail}
                    slotProps={{
                      primary: { sx: { color: theme.primaryText } },
                      secondary: { sx: { color: theme.secondaryText } }
                    }} />
                </ListItem>
              </List>
            ))}
          </Grid>
        </Grid>
      </Box>
    )
  }

  const DRAWERLIST = [
    { name: 'Description', component: <Desc /> },
    { name: 'About', component: <About /> },
    { name: 'Contact & other details', component: <Contact /> }
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConnect = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    if (!token) {
      setError(`Login or Signup to connect`)
      setOpen(true)
      return
    }

    if (currentUser.userId === profile.userId) {
      setError("Cannot connect to yourself")
      setOpen(true)
      return
    }
    try {
      setLoading(true)

      isFollowing ? await axios.delete(`http://localhost:2000/profile/connect/remove/${profile.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }) : await axios.post(`http://localhost:2000/profile/connect/add/${profile.userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setIsFollowing(!isFollowing)
      setSuccess(isFollowing ? `Unfollowed ${username}` : `Connected with ${username}`)
      setOpen(true)
      window.location.reload()
    } catch (error) {
      console.error(isFollowing ? 'Unable to unfollow' : 'Unable to connect')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/profile/v/${profileType}/${username}`)
        setUser(response.data.user)
        setProfile(response.data.profile)
      } catch (error) {
        console.error(error.message)
      }
    }

    const fetchCurrentDetails = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:2000/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          }
        })
        setCurrentUser(response.data.profile)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchProfile()
    fetchCurrentDetails()
  }, [profileType, username])

  useEffect(() => {
    if (currentUser && profile) {
      setIsFollowing((currentUser.following || []).includes(profile.userId))
    }
  }, [currentUser, profile])

  return (
    <Box>
      <Box sx={{ display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' } }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { lg: 'calc(100% - 440px)', md: 'calc(100% - 400px)', sm: 'calc(100% - 340px)' },
            backgroundColor: theme.background,
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme.cardBorder}`,
            color: theme.primaryText,
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bolder' }}>
              {DRAWERLIST[value]?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.primaryBg,
              color: theme.primaryText
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
            <ProfileOrgViewCardUi username={user.username} industry={profile.industry}
              companyName={profile.companyName} dp={profile.currentDp} theme={theme}
              followers={profile.followers} following={profile.following}
              loading={loading} isFollowing={isFollowing} handleClick={handleConnect} />
          </Box>
          <Divider />
          <List>
            {DRAWERLIST.map((text, index) => (
              <ListItem key={text.name} disablePadding>
                <ListItemButton onClick={() => setValue(index)} selected={value === index}
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
                      color: theme.primaryText
                    },
                    "&:hover": {
                      backgroundColor: theme.secondaryBg,
                      color: theme.hoverAccent
                    },
                  }}>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: theme.primaryBg, p: 3, height: '100vh' }}
        >
          <Toolbar />
          {DRAWERLIST[value]?.component}
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: { lg: 'none', md: 'none', sm: 'none', xs: 'block' }, background: theme.primaryBg, minHeight: '100vh', height: '100%' }}>
        <Box>
          <ProfileOrgViewCardUi username={user.username} industry={profile.industry}
            companyName={profile.companyName} dp={profile.currentDp} theme={theme}
            followers={profile.followers} following={profile.following}
            loading={loading} isFollowing={isFollowing} handleClick={handleConnect} />
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}
            sx={{
              color: theme.primaryText,
              '& .MuiTab-root': {
                color: theme.secondaryText,
                '&:hover': {
                  color: theme.hoverAccent,
                },
              },
              '& .Mui-selected': {
                color: theme.primaryAccent + ' !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.primaryAccent,
              },
            }}
            variant='scrollable' scrollButtons='auto' allowScrollButtonsMobile
            aria-label="basic tabs example">
            {DRAWERLIST.map((s, i) => (
              <Tab key={s.name} label={s.name} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        {DRAWERLIST.map((s, i) => (
          <CustomTabPanel value={value} index={i}>
            {s.component}
          </CustomTabPanel>
        ))}
      </Box>
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
