import { ArrowRightRounded, PeopleAlt, PersonAdd } from '@mui/icons-material';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext';
import axios from 'axios'

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

const CONNECTCARD = ({theme, name, isCompany, username, industry, desc}) => {
  return (
    <>
      <style>{`
        .card {
          width: 290px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 10px;
          background: ${theme.cardBg};
          border-radius: 15px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card::before {
          content: "";
          width: 350px;
          height: 100px;
          position: absolute;
          top: 0;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-bottom: 3px solid ${theme.hoverAccent};
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);;
          transition: all 0.5s ease;
        }

        .card * {
          z-index: 1;
        }

        .image {
          width: 90px;
          height: 90px;
          background-color: #1468BF;
          border-radius: 50%;
          border: 4px solid ${theme.hoverAccent};
          margin-top: 30px;
          transition: all 0.5s ease;
        }

        .card-info {
          width: 100%
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          transition: all 0.5s ease;
          white-space: nowrap
        }

        .card-info div {
          font-size: 12px;
          color: ${theme.secondaryText};
        }

        .card-info .industry {
          font-size: 15px;
          color: ${theme.secondaryText};
        }

        .card-info p {
          color: ${theme.secondaryText};
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: all 0.5s ease;
          margin: 0; 
          white-space: normal;
          word-wrap: break-word;
          width: 280px;
        }

        .button {
          text-decoration: none;
          background-color: ${theme.primaryAccent};
          color: white;
          padding: 5px 20px;
          border-radius: 5px;
          border: 1px solid white;
          transition: all 0.5s ease;
        }

        .card:hover::before {
          width: 290px;
          height: 320px;
          background: ${theme.cardBg};
          border-bottom: none;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          transform: scale(0.95);
        }

        .card:hover {
          height: auto;
          transform: scale(1.05);
          box-shadow: 0 15px 25px ${theme.shadow};
        }

        .card:hover .card-info {
          transform: translate(0%,-25%);
        }

        .card:hover .card-info p {
          opacity: 1;
          height: auto;
          margin-top: 10px;
        }

        .card:hover .image {
          transform: scale(2) translate(-60%,-40%);
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
        }

        .button:hover {
          background-color: ${theme.hoverAccent};
          transform: scale(1.1);
        }
      `}</style>

      <div className="card">
        <div className="image"></div>
        <div className="card-info">
          <span style={{
            width: '260px',
            display:'inline-block',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: 24,
            color: theme.primaryText,
            marginTop: 15,
            whiteSpace: 'nowrap',
            animation: name.length > 20 ? 'scrollText 15s linear infinite' : 'none'
          }}>{name}</span>
          <div>@{username}{isCompany ?  ` | ${industry}`: ""}</div>
          <p>{desc}</p>
        </div>
        <a href="#" className="button">Connect</a>
      </div>
    </>
  )
}

const FOLLOWERCARD = ({theme}) => {
  return (
    <>
    <style>{`
      .card {
        width: auto;
        height: auto;
        background: ${theme.cardBg};
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .title, .more {
        padding: 10px 15px;
      }

      .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
      }

      .user__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
      }

      .user__container {
        display: flex;
        flex-direction: column;
      }

      .title {
        font-weight: 900;
        font-size: 1.3em;
      }

      .name {
        font-weight: 800;
      }

      .username {
        font-size: .7em;
        color: ${theme.secondaryText};
      }

      .desc {
        font-size: .9em;
        color: ${theme.secondaryText};
      }

      .image {
        width: 60px;
        height: 60px;
        background: ${theme.background};
        background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
        border-radius: 50%;
        margin-right: 15px;
      }

      .follow {
        border: none;
        border-radius: 25px;
        background-color: ${theme.primaryAccent};
        color: white;
        padding: 8px 15px;
        font-weight: 700;
      }

      .user:hover {
        background-color: ${theme.hoverAccent};
      }

      .follow:hover {
        background-color: ${theme.hoverAccent};
      }
    `}</style>

    <div className="card">
      <div className="user__container">
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div> 
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
      </div>
    </div>
    </>
  )
}

const FOLLOWINGCARD = ({theme}) => {
  return (
    <>
    <style>{`
      .card {
        width: auto;
        height: auto;
        background: ${theme.cardBg};
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .title, .more {
        padding: 10px 15px;
      }

      .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
      }

      .user__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
      }

      .user__container {
        display: flex;
        flex-direction: column;
      }

      .title {
        font-weight: 900;
        font-size: 1.3em;
      }

      .name {
        font-weight: 800;
      }

      .username {
        font-size: .7em;
        color: ${theme.secondaryText};
      }

      .desc {
        font-size: .9em;
        color: ${theme.secondaryText};
      }

      .image {
        width: 60px;
        height: 60px;
        background: ${theme.background};
        background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
        border-radius: 50%;
        margin-right: 15px;
      }

      .follow {
        border: none;
        border-radius: 25px;
        background-color: ${theme.primaryAccent};
        color: white;
        padding: 8px 15px;
        font-weight: 700;
      }

      .user:hover {
        background-color: ${theme.hoverAccent};
      }

      .follow:hover {
        background-color: ${theme.hoverAccent};
      }
    `}</style>

    <div className="card">
      <div className="user__container">
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div> 
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
        <div className="user">
          <div className="image"></div>
          <div className="user__content">
            <div className="text">
              <span className="name">Name</span>
              <div className="username">@namedlorem</div>
              <p className="desc">Description</p>
            </div>
            <button className="follow">Follow</button>
          </div> 
        </div>
      </div>
    </div>
    </>
  )
}

const Followers = ({theme}) => {
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <FOLLOWERCARD theme={theme}/>
        </Grid>
      </Grid>
    </Box>
  )
}

const Following = ({theme}) => {
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <FOLLOWINGCARD theme={theme}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export const Connections = () => {
  const {theme} = useThemeContext()
  const [value, setValue] = useState(0)
  const [drawerValue, setDrawerValue] = useState(0)
  const [data, setData] = useState([])

  const DRAWERLIST = [
    {name: 'Followers', text:'People you follow', icon: <PersonAdd/>, component: <Followers theme={theme}/>, count: "120"},
    {name: 'Following', text: 'People who follows you', icon: <PeopleAlt/>, component: <Following theme={theme}/>, count: "130"}
  ]

  const handleChange = (_, newValue) => {
    setDrawerValue(newValue);
  };

  const fetchData = async (params) => {
    try {
      const response = await axios.get("http://localhost:2000/user/all",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setData(response.data.result)
    } catch (error) {
      console.error("Error Fetching user data")
    }
  }

  useEffect(() => {fetchData()},[])

  return (
    <Box sx={{flexGrow:1,pt:{lg:9, md:8, sm:8, xs:7},pb: '80px',minHeight: '100vh',
    backgroundColor:theme.primaryBg, color: theme.primaryText}}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:2, backgroundColor:theme.primaryBg, color: theme.primaryText }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {setValue(newValue)}}
            sx={{
              backgroundColor:theme.primaryBg,
              '& .Mui-selected': {
                color: theme.primaryAccent,
                '& .MuiSvgIcon-root': {
                  color: theme.primaryAccent, 
                },
              },
              '& .MuiBottomNavigationAction-root': {
                color: theme.secondaryText,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: theme.hoverAccent,
                }
              }
            }}
          >
            <BottomNavigationAction label="Connect" icon={<PersonAdd/>} />
            <BottomNavigationAction label="Connections" icon={<PeopleAlt />} />
          </BottomNavigation>
        </Paper>
      {value === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',p:2,gap:2}}>
              {data.map((d,i) => (
                <CONNECTCARD key={i} theme={theme} industry={d.profile?.industry} desc={d.profile?.description}
                name={d.user.isCompany ? d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}
                isCompany={d.user?.isCompany} username={d.user.username}/>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      {value === 1 && (
        <Grid container spacing={12}>
          <Grid size={12}>
            <Box sx={{ display: {lg:'flex',md:'flex',sm:'flex',xs:'none'} }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                sx={{ width: {lg:`calc(100% - 540px)`,md:`calc(100% - 440px)`,sm:`calc(100% - 270px)`},mt:8,
                backgroundColor:theme.background,
                backdropFilter:'blur(10px)',
                borderBottom:`1px solid ${theme.cardBorder}`, 
                color:theme.primaryText,
                zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <Toolbar>
                  <Typography variant="h6" noWrap component="div" sx={{fontWeight:'bolder'}}>
                    {DRAWERLIST[drawerValue]?.text}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: {lg:540,md:440,sm:270},
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: {lg:540,md:440,sm:270},
                    boxSizing: 'border-box',
                    zIndex:1,
                    backgroundColor:theme.primaryBg,
                    color: theme.primaryText
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <Toolbar />
                <Divider />
                <List>
                  {DRAWERLIST.map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                      <ListItemButton onClick={()=>setDrawerValue(index)} selected={drawerValue === index}
                        sx={{
                          "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                            color: theme.primaryText
                          },
                          "&.Mui-selected": {
                              backgroundColor: theme.primaryAccent,
                              color: theme.primaryText,
                              "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                                  color: theme.primaryBg,
                              },
                          },
                          "&.Mui-selected:hover": {
                              backgroundColor: theme.hoverAccent,
                              color:theme.primaryText,
                              "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                                color:theme.primaryText
                              }
                          },
                          "&:hover": {
                              backgroundColor: theme.secondaryBg,
                              color:theme.hoverAccent,
                              "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                                color:theme.hoverAccent
                              }
                          },
                      }}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name}/>
                        <ListItemText primary={text.count}/>
                        <ListItemIcon><ArrowRightRounded/></ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: theme.background, p: 3 }}
              >
                <Toolbar />
                {DRAWERLIST[drawerValue]?.component}
              </Box>
            </Box>
            <Box sx={{ width: 'auto', display:{lg:'none',md:'none',sm:'none',xs:'block'},background: theme.primaryBg,minHeight:'100vh',height:'100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={drawerValue} onChange={handleChange} 
                sx={{
                  color: theme.primaryText,
                  '& .MuiTab-root':{
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
                aria-label="basic tabs example" centered>
                  {DRAWERLIST.map((s,i) => (
                    <Tab key={s.name} label={s.name} icon={s.icon} {...a11yProps(i)} />
                  ))}
                </Tabs>
              </Box>
              {DRAWERLIST.map((s,i) => (
                <CustomTabPanel value={drawerValue} index={i}>
                  {s.component}
                </CustomTabPanel>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
