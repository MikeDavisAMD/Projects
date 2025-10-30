import { Alert, AppBar, Avatar, Box, ButtonBase, Card, CardActions, CardContent, Chip, CssBaseline, Divider, Drawer, FormControl, FormControlLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Radio, RadioGroup, Snackbar, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../Utils/ThemeContext';
import axios from 'axios';
import { Download, Email, Place, Preview, Smartphone, Star } from '@mui/icons-material';
import { ProfileViewCardUi } from '../Utils/profileViewCardUi';
import { saveAs } from 'file-saver'
import { ListExp } from '../Utils/ListExp';
import { ListEdu } from '../Utils/ListEdu';
import { ListCert } from '../Utils/ListCert';
import { ListProjects } from '../Utils/ListProjects';

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

export const ProfileCard = () => {
  const { profileType, username } = useParams()
  const { theme } = useThemeContext()
  const [user, setUser] = useState('')
  const [profile, setProfile] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [resumeLink, setResumeLink] = useState([])
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
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Star sx={{ color: theme.primaryAccent }} /> :
          {profile.skills.map((s, i) => (
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
    ]

    return (
      <Box>
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
      </Box>
    )
  }

  const Resumes = () => {
    setResumeLink(profile.resumes)
    // selected resume for default resume
    const [selectedResume, setSelectedResume] = useState("");

    // Download Resume
    const handleDownloadResume = async () => {
      const resume = resumeLink.find(r => r.public_id === selectedResume)
      if (!resume) {
        setError("Resume not found")
        setOpen(true)
        return
      }

      const url = resume.url
      const fileName = resume.fileName

      try {
        const response = await fetch(url)
        const blob = await response.blob()
        saveAs(blob, fileName)
      } catch (error) {
        setError("Failed to download resume")
        setOpen(true)
      }
    }

    // Preview resume
    const handlePreviewResume = () => {
      const resume = resumeLink.find(r => r.public_id === selectedResume)
      if (!resume) {
        setError("Cannot Open Resume")
        setOpen(true)
        return
      }
      window.open(resume.url, "_blank")
    }

    useEffect(() => {
      if (resumeLink.length > 0) {
        setSelectedResume(resumeLink[0].public_id);
      }
    }, [])

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center' }, gap: 2, background: theme.primaryBg }}>
        <Card sx={{ width: "100%", borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonBase onClick={handlePreviewResume} sx={{
              display: 'flex', color: theme.primaryText,
              flexDirection: 'column', justifyContent: 'flex-end',
              alignItems: 'center', pb: 0.5, px: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                color: theme.hoverAccent,
              }
            }}><Preview /></ButtonBase>
            <ButtonBase onClick={handleDownloadResume} sx={{
              display: 'flex', color: theme.primaryText,
              flexDirection: 'column', justifyContent: 'flex-end',
              alignItems: 'center', pb: 0.5, px: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                color: theme.hoverAccent,
              }
            }}><Download /></ButtonBase>
          </CardActions>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span style={{ fontWeight: "bolder", color: theme.primaryText }}>Resumes</span>
            </Typography>
            <FormControl sx={{ ml: 4 }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedResume}
                onChange={e => setSelectedResume(e.target.value)}
                name="radio-buttons-group"
              >
                {resumeLink.map((res, index) => (
                  <FormControlLabel sx={{ color: theme.primaryText }}
                    key={index || res._id} value={res.public_id} control={<Radio />} label={res.fileName} />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    )
  }

  const DRAWERLIST = [
    { name: 'Description', component: <Desc /> },
    { name: 'About', component: <About /> },
    { name: 'Contact & other details', component: <Contact /> },
    { name: 'Experience', component: <ListExp experience={profile.experience} /> },
    { name: 'Education', component: <ListEdu education={profile.education} /> },
    { name: 'Projects', component: <ListProjects projects={profile.projects} /> },
    { name: 'Certificates & licenses', component: <ListCert certificates={profile.certificates} /> },
    { name: 'Resumes', component: <Resumes /> }
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
            <ProfileViewCardUi username={user.username} firstName={profile.firstName} lastName={profile.lastName}
              dp={profile.currentDp} theme={theme} followers={profile.followers} following={profile.following}
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
          <ProfileViewCardUi username={user.username} firstName={profile.firstName} lastName={profile.lastName}
            dp={profile.currentDp} theme={theme} followers={profile.followers} following={profile.following}
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
