import { ArrowRightRounded, PeopleAlt, PersonAdd } from '@mui/icons-material';
import { Alert, AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Snackbar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
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

const CONNECTCARD = ({
  theme, name, isCompany, profileType, username, industry, desc, dp,
  setLoading, setError, setOpen, setSuccess, targetUserId, fetchData,
  userFollowers, currentUserId, loading
}) => {
  const isConnectBack = userFollowers.includes(currentUserId)

  const handleConnect = async () => {
    try {
      setLoading(true)

      await axios.post(`http://localhost:2000/profile/connect/add/${targetUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setSuccess(`Following ${name}`)
      setError("")
      setOpen(true)
      fetchData()
    } catch (error) {
      setError("Unable to connect to the user")
      setSuccess("")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
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
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
          border-radius: 50%;
          border: 4px solid ${theme.hoverAccent};
          transition: all 0.5s ease;
        }

        .profile-type {
          position: absolute;
            top: 0;                 
            left: 0;
            width: 100%;
            height: 100px;          
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 40px;
            opacity: 0.8;
            z-index: 0;             
            transition: opacity 0.4s ease, transform 0.4s ease;
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
          font-size: 12px;
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: all 0.5s ease;
          margin: 0; 
          white-space: normal;
          word-wrap: break-word;
          width: 280px;
          color: ${theme.secondaryText};
          padding-bottom: 4px;
        }

        .card-info span {
          width: 260px;
          display: inline-block;
          text-overflow: ellipsis;
          font-weight: 600;
          font-size: 24px;
          overflow: hidden;
          color: ${theme.primaryText};
          margin-top: 15px;
          white-space: nowrap;
          transition: all 0.4s ease;
        }

        .card-info p {
          color: ${theme.secondaryText};
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: all 0.5s ease;
          margin: 0 auto; 
          white-space: normal;
          word-wrap: break-word;
          width: 90%;
          display: flex;                   
          justify-content: center;         
          align-items: center;  
          transform: translateY(10px);     
          box-sizing: border-box;
          text-align: center;
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
          height: 100%;
          opacity: 0.5;
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
          border-bottom: none;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          transform: scale(0.95);
        }

        .card:hover {
          height: auto;
          width: 290px;
          transform: scale(1.08);
          box-shadow: 0 15px 25px ${theme.shadow};
          margin-bottom: 26px;
        }

        .card:hover .card-info {
          transform: translate(0%,-15%);
        }

        .card:hover .card-info p {
          opacity: 1;
          height: auto;
          width: fit-content
          margin-top: 10px;
        }

        .card:hover .card-info .industry {
          opacity: 1;
          height: auto;
        }

        .card:hover .card-info span {
          white-space: normal;
          overflow: visible;
          text-overflow: unset;
          word-wrap: break-word;
        }

        .card:hover .image {
          transform: scale(2) translate(-60%,-40%);
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
        }

        .card:hover .profile-type {
          opacity: 0;
          transform: translateY(-10px);
        }

        .button:hover {
          background-color: ${theme.hoverAccent};
          transform: scale(1.1);
        }

        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: 0;
        }
      `}</style>

      <div className="card">
        <div className="image">
          {dp && dp.startsWith('https://') ? (
            <Avatar src={dp} alt={name}
              sx={{ width: '100%', height: '100%' }} />
          ) : (
            <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: '100%', height: '100%', fontSize: 50 }}>
              {dp}
            </Avatar>
          )}
        </div>
        <div className='profile-type'>{profileType}</div>
        <div className="card-info">
          <span>{name}</span>
          <div className='industry'>{isCompany ? industry : "Job Seeker / Employee"}</div>
          <div>@{username}</div>
          <p>{desc}</p><br />
          <button className="button" disabled={loading} onClick={handleConnect}>
            {loading ? "connecting..." : isConnectBack ? "Connect Back" : "Connect"}
          </button>
        </div>
      </div>
    </>
  )
}

const Followers = ({ theme, users, setLoading, loading, setError, setSuccess, setOpen,
  fetchData, currentUserFollowing, setCurrentUserFollowing, currentUserId }) => {

  const handleUnfollow = async (targetUserId, name) => {
    try {
      setLoading(true)

      await axios.delete(`http://localhost:2000/profile/connect/remove/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setCurrentUserFollowing(prev => prev.filter(id => id !== targetUserId));
      setSuccess(`Unfollowed ${name}`)
      setError('')
      setOpen(true)
      fetchData()
    } catch (error) {
      setError(`Unable to unfollow ${name}`)
      setSuccess('')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleFollowBack = async (targetUserId, name) => {
    try {
      setLoading(true)
      await axios.post(`http://localhost:2000/profile/connect/add/${targetUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setCurrentUserFollowing(prev => [...prev, targetUserId]);
      setSuccess(`Followed Back ${name}`)
      setError('')
      setOpen(true)
      fetchData()
    } catch (error) {
      setError(`Unable to follow back ${name}`)
      setSuccess('')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          {!users || users.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: theme.secondaryText }}>
              <Typography variant='span'>No Followers yet</Typography>
            </Box>
          ) : (
            users.map((d) => {
              const targetUserId = d.profile.userId
              const isFollowing = currentUserFollowing?.includes(targetUserId)

              const btnTxt = isFollowing ? "unfollow" : "follow back"

              const handleClick = () => {
                if (btnTxt === "follow back") {
                  handleFollowBack(
                    targetUserId,
                    d.user.isCompany ? d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`
                  )
                  currentUserFollowing.push(targetUserId)
                } else {
                  handleUnfollow(
                    targetUserId,
                    d.user.isCompany ? d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`
                  )
                  const index = currentUserFollowing.indexOf(targetUserId)
                  if (index > -1) return currentUserFollowing.splice(index, 1)
                }
              }
              return (
                <Box>
                  <Card key={d.profile.userId} sx={{ width: '100%', maxWidth: { lg: '55vw', md: '55vw', sm: '55vw', xs: '100vw' }, borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                    <CardContent>
                      <Box sx={{ flexGrow: 1, display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                        <Grid container spacing={2} alignItems='center'>
                          <Grid size={{ lg: 2, md: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              {d.profile.currentDp && d.profile.currentDp.startsWith('https://') ? (
                                <Avatar src={d.profile.currentDp} alt='Display Pic'
                                  sx={{ width: '100%', height: '100%' }} />
                              ) : (
                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: 80, height: 80, fontSize: 40 }}>
                                  {d.profile.currentDp}
                                </Avatar>
                              )}
                            </Box>
                          </Grid>
                          <Grid size={{ lg: 7, md: 6 }}>
                            <Box sx={{ width: '100%' }}>
                              <Typography variant="body2" sx={{ color: theme.primaryText, fontWeight: 'bolder' }}>{d.user.isCompany ?
                                d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}</Typography>
                              <Typography variant="body2" sx={{ color: theme.secondaryText }}>@{d.user.username}{d.user.isCompany ? ` | ${d.profile.industry}` : ""}</Typography>
                              <Typography variant="body2" sx={{ color: theme.secondaryText, pt: 2, fontSize: 10 }}>{d.profile.description}</Typography>
                            </Box>
                          </Grid>
                          <Grid size={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button variant='outlined' disabled={loading}
                                onClick={handleClick}
                                sx={{
                                  borderRadius: '20px',
                                  color: theme.primaryAccent,
                                  borderColor: theme.primaryAccent,
                                  '&:hover': {
                                    backgroundColor: theme.hoverAccent,
                                    borderColor: theme.hoverAccent,
                                    color: theme.primaryText
                                  }
                                }}>{loading ? "following..." : btnTxt}</Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ flexGrow: 1, display: { lg: 'none', md: 'none', sm: 'block', xs: 'block' } }}>
                        <Grid container spacing={2} alignItems='center' justifyContent='center'>
                          <Grid size={12}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              {d.profile.currentDp && d.profile.currentDp.startsWith('https://') ? (
                                <Avatar src={d.profile.currentDp} alt='Display Pic'
                                  sx={{ width: '100%', height: '100%' }} />
                              ) : (
                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: 100, height: 100, fontSize: 50 }}>
                                  {d.profile.currentDp}
                                </Avatar>
                              )}
                            </Box>
                          </Grid>
                          <Grid size={12}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                              <Typography variant="body2" sx={{ color: theme.primaryText, fontWeight: 'bolder' }}>{d.user.isCompany ?
                                d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}</Typography>
                              <Typography variant="body2" sx={{ color: theme.secondaryText }}>@{d.user.username}{d.user.isCompany ? ` | ${d.profile.industry}` : ""}</Typography>
                              <Typography variant="body2" sx={{ color: theme.secondaryText, pt: 2, fontSize: 10, textAlign: 'center' }}>{d.profile.description}</Typography>
                            </Box>
                          </Grid>
                          <Grid size={12}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Button variant='outlined' disabled={loading}
                                onClick={handleClick}
                                sx={{
                                  borderRadius: '20px',
                                  color: theme.primaryAccent,
                                  borderColor: theme.primaryAccent,
                                  '&:hover': {
                                    backgroundColor: theme.hoverAccent,
                                    borderColor: theme.hoverAccent,
                                    color: theme.primaryText
                                  }
                                }}>{loading ? "following..." : btnTxt}</Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card><br />
                </Box>
              )
            })
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

const Following = ({ theme, users, setLoading, loading, setOpen, setError, setSuccess, fetchData }) => {

  const handleUnfollow = async (targetUserId, name) => {
    try {
      setLoading(true)

      await axios.delete(`http://localhost:2000/profile/connect/remove/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })
      setSuccess(`Unfollowed ${name}`)
      setError('')
      setOpen(true)
      fetchData()
    } catch (error) {
      setError(`Unable to unfollow ${name}`)
      setSuccess('')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          {!users || users.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: theme.secondaryText }}>
              <Typography variant='span'>No Following yet</Typography>
            </Box>
          ) : (
            users.map((d, i) => (
              <Box>
                <Card key={i} sx={{ width: '100%', maxWidth: { lg: '55vw', md: '55vw', sm: '55vw', xs: '100vw' }, borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                  <CardContent>
                    <Box sx={{ flexGrow: 1, display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                      <Grid container spacing={2} alignItems='center'>
                        <Grid size={{ lg: 2, md: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {d.profile.currentDp && d.profile.currentDp.startsWith('https://') ? (
                              <Avatar src={d.profile.currentDp} alt='Display Pic'
                                sx={{ width: '100%', height: '100%' }} />
                            ) : (
                              <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: 80, height: 80, fontSize: 40 }}>
                                {d.profile.currentDp}
                              </Avatar>
                            )}
                          </Box>
                        </Grid>
                        <Grid size={{ lg: 7, md: 6 }}>
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body2" sx={{ color: theme.primaryText, fontWeight: 'bolder' }}>{d.user.isCompany ?
                              d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}</Typography>
                            <Typography variant="body2" sx={{ color: theme.secondaryText }}>@{d.user.username}{d.user.isCompany ? ` | ${d.profile.industry}` : ""}</Typography>
                            <Typography variant="body2" sx={{ color: theme.secondaryText, pt: 2, fontSize: 10 }}>{d.profile.description}</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ lg: 3, md: 4 }}>
                          <Button variant='outlined' disabled={loading}
                            onClick={() => handleUnfollow(d.profile.userId, d.user.username)}
                            sx={{
                              borderRadius: '20px',
                              color: theme.primaryAccent,
                              borderColor: theme.primaryAccent,
                              '&:hover': {
                                backgroundColor: theme.hoverAccent,
                                borderColor: theme.hoverAccent,
                                color: theme.primaryText
                              }
                            }}>{loading ? "unfollowing..." : "unfollow"}</Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { lg: 'none', md: 'none', sm: 'block', xs: 'block' } }}>
                      <Grid container spacing={2} alignItems='center' justifyContent='center'>
                        <Grid size={12}>
                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {d.profile.currentDp && d.profile.currentDp.startsWith('https://') ? (
                              <Avatar src={d.profile.currentDp} alt='Display Pic'
                                sx={{ width: 100, height: 100 }} />
                            ) : (
                              <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: 100, height: 100, fontSize: 50 }}>
                                {d.profile.currentDp}
                              </Avatar>
                            )}
                          </Box>
                        </Grid>
                        <Grid size={12}>
                          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Typography variant="body2" sx={{ color: theme.primaryText, fontWeight: 'bolder' }}>{d.user.isCompany ?
                              d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}</Typography>
                            <Typography variant="body2" sx={{ color: theme.secondaryText }}>@{d.user.username}{d.user.isCompany ? ` | ${d.profile.industry}` : ""}</Typography>
                            <Typography variant="body2" sx={{ color: theme.secondaryText, pt: 2, fontSize: 10, textAlign: 'center' }}>{d.profile.description}</Typography>
                          </Box>
                        </Grid>
                        <Grid size={12}>
                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='outlined' disabled={loading}
                              onClick={() => handleUnfollow(d.profile.userId, d.user.username)}
                              sx={{
                                borderRadius: '20px',
                                color: theme.primaryAccent,
                                borderColor: theme.primaryAccent,
                                '&:hover': {
                                  backgroundColor: theme.hoverAccent,
                                  borderColor: theme.hoverAccent,
                                  color: theme.primaryText
                                }
                              }}>{loading ? "unfollowing..." : "unfollow"}</Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card><br />
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export const Connections = () => {
  const { theme } = useThemeContext()
  const [value, setValue] = useState(0)
  const [drawerValue, setDrawerValue] = useState(0)
  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [currentUserFollowing, setCurrentUserFollowing] = useState([])

  // Snackbar
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (_, newValue) => {
    setDrawerValue(newValue);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/user/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setData(response.data.result)
    } catch (error) {
      console.error("Error Fetching user data")
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:2000/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })

      setUserId(response.data.profile.userId)
      setCurrentUserFollowing(response.data.profile.following || [])
    } catch (error) {
      console.error("Error Fetching user data")
    }
  }

  const DRAWERLIST = [
    {
      name: 'Following', text: 'People you follow', icon: <PersonAdd />,
      component: <Following theme={theme} users={data.filter(u => u.profile?.followers?.includes(userId))}
        setLoading={setLoading} loading={loading} setError={setError} setSuccess={setSuccess} setOpen={setOpen}
        fetchData={fetchData} />,
      count: data.filter(u => Array.isArray(u.profile?.followers) && u.profile?.followers?.includes(userId)).length || "0"
    },
    {
      name: 'Followers', text: 'People who follows you', icon: <PeopleAlt />,
      component: <Followers theme={theme} users={data.filter(u => u.profile?.following?.includes(userId))}
        setError={setError} setSuccess={setSuccess} setLoading={setLoading} loading={loading} setOpen={setOpen}
        fetchData={fetchData} currentUserId={userId} setCurrentUserFollowing={setCurrentUserFollowing}
        currentUserFollowing={currentUserFollowing} />,
      count: data.filter(u => Array.isArray(u.profile?.following) && u.profile?.following?.includes(userId)).length || "0"
    },
  ]

  useEffect(() => {
    fetchData()
    fetchUser()
  }, [])

  return (
    <Box sx={{
      flexGrow: 1, pt: { lg: 9, md: 8, sm: 8, xs: 7 }, pb: '80px', minHeight: '100vh',
      backgroundColor: theme.primaryBg, color: theme.primaryText
    }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2, backgroundColor: theme.primaryBg, color: theme.primaryText }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => { setValue(newValue) }}
          sx={{
            backgroundColor: theme.primaryBg,
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
          <BottomNavigationAction label="Connect" icon={<PersonAdd />} />
          <BottomNavigationAction label="Connections" icon={<PeopleAlt />} />
        </BottomNavigation>
      </Paper>
      {value === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 2, gap: 2 }}>
              {data.filter(d => d.profile && !d.profile.followers?.includes(userId) && d.profile.userId !== userId).map((d, i) => (
                <CONNECTCARD key={i} theme={theme} industry={d.profile?.industry} desc={d.profile?.description}
                  name={d.user.isCompany ? d.profile.companyName : `${d.profile.firstName} ${d.profile.lastName}`}
                  isCompany={d.user?.isCompany} username={d.user.username} profileType={d.profile.profileType}
                  dp={d.profile.currentDp} setError={setError} setSuccess={setSuccess} setOpen={setOpen} loading={loading}
                  setLoading={setLoading} targetUserId={d.profile.userId} fetchData={fetchData} currentUserId={userId}
                  currentUserFollowing={data.find(u => u.profile?.userId === userId)?.profile?.following || []}
                  userFollowers={d.profile.following || []} />
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      {value === 1 && (
        <Grid container spacing={12}>
          <Grid size={12}>
            <Box sx={{ display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' } }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                sx={{
                  width: { lg: `calc(100% - 540px)`, md: `calc(100% - 440px)`, sm: `calc(100% - 270px)` }, mt: 8,
                  backgroundColor: theme.background,
                  backdropFilter: 'blur(10px)',
                  borderBottom: `1px solid ${theme.cardBorder}`,
                  color: theme.primaryText,
                  zIndex: (theme) => theme.zIndex.drawer + 1
                }}
              >
                <Toolbar>
                  <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bolder' }}>
                    {DRAWERLIST[drawerValue]?.text}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: { lg: 540, md: 440, sm: 270 },
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: { lg: 540, md: 440, sm: 270 },
                    boxSizing: 'border-box',
                    zIndex: 1,
                    backgroundColor: theme.primaryBg,
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
                      <ListItemButton onClick={() => setDrawerValue(index)} selected={drawerValue === index}
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
                            color: theme.primaryText,
                            "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                              color: theme.primaryText
                            }
                          },
                          "&:hover": {
                            backgroundColor: theme.secondaryBg,
                            color: theme.hoverAccent,
                            "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                              color: theme.hoverAccent
                            }
                          },
                        }}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
                        <ListItemText primary={text.count} />
                        <ListItemIcon><ArrowRightRounded /></ListItemIcon>
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
            <Box sx={{ width: 'auto', display: { lg: 'none', md: 'none', sm: 'none', xs: 'block' }, background: theme.primaryBg, minHeight: '100vh', height: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={drawerValue} onChange={handleChange}
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
                  aria-label="basic tabs example" centered>
                  {DRAWERLIST.map((s, i) => (
                    <Tab key={s.name} label={s.name} icon={s.icon} {...a11yProps(i)} />
                  ))}
                </Tabs>
              </Box>
              {DRAWERLIST.map((s, i) => (
                <CustomTabPanel value={drawerValue} index={i}>
                  {s.component}
                </CustomTabPanel>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
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
