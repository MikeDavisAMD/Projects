import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, ButtonBase, Card, CardActions, CardContent, Divider, Grid, Link, Menu, MenuItem, Modal, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { HomeOrgProfileCard } from '../Utils/HomeOrgProfileCard'
import { HomeProfileCard } from '../Utils/HomeProfileCard'
import { useNavigate } from 'react-router-dom'
import logo from '../Assets/Images/Hyrivo copy.png'
import { PuzzleList } from '../Utils/PuzzleList'
import { Posts } from './Posts'
import { ArrowDropDown, ArrowDropUp, Article, Close, Description, Done, InsertPhoto, Movie, NavigateNext, PersonPin, Publish } from '@mui/icons-material'

export const Home = () => {
  const { theme } = useThemeContext()
  const navigate = useNavigate()
  const [isCompany, setIsCompany] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [username, setUsername] = useState('')
  const [industry, setIndustry] = useState('')
  const [desc, setDesc] = useState('')
  const [dp, setDp] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: 800, md: 800, sm: 500, xs: 220 },
    bgcolor: theme.primaryBg,
    border: `2px solid ${theme.cardBorder}`,
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  // Modal for create post
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const handleOpenCreatePost = () => setOpenCreatePost(true);
  const handleCloseCreatPost = () => setOpenCreatePost(false);

  // Modal for create post image
  const [openCreatePostImage, setOpenCreatePostImage] = useState(false);
  const handleOpenCreatePostImage = () => setOpenCreatePostImage(true);
  const handleCloseCreatPostImage = () => setOpenCreatePostImage(false);

  // Modal for create post video
  const [openCreatePostVideo, setOpenCreatePostVideo] = useState(false);
  const handleOpenCreatePostVideo = () => setOpenCreatePostVideo(true);
  const handleCloseCreatPostVideo = () => setOpenCreatePostVideo(false);

  // Modal for create find an expert
  const [openCreatePostExpert, setOpenCreatePostExpert] = useState(false);
  const handleOpenCreatePostExpert = () => setOpenCreatePostExpert(true);
  const handleCloseCreatPostExpert = () => setOpenCreatePostExpert(false);

  // Menu in divider to sort
  const options = ['Top', 'Recent']
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu in post to select who to receive the post
  const optionsPostView = ['Post to anyone', 'Connections only']
  const optionsPostComment = ['Anyone', 'Connections only', 'No one']
  const [anchorElPostView, setAnchorElPostView] = useState(null);
  const [selectedIndexPostView, setSelectedIndexPostView] = useState(0);
  const [selectedIndexPostComment, setSelectedIndexPostComment] = useState(0);
  const openPostView = Boolean(anchorElPostView);
  const handleClickPostView = (event) => {
    setAnchorElPostView(event.currentTarget);
  };

  const handleMenuPostView = (event, index) => {
    setSelectedIndexPostView(index);
  };

  const handleMenuPostComment = (event, index) => {
    setSelectedIndexPostComment(index);
  };

  const handleClosePostView = () => {
    setAnchorElPostView(null);
  };

  const Addpostbtn = () => {
    return (
      <>
        <style>{`  
        .blue-btn {
          width: 100%;
          height: 50px;
          margin: 15px;
          background: ${theme.primaryAccent};
          background: linear-gradient(
            90deg,
            ${theme.primaryAccent} 0%,
            ${theme.hoverAccent} 100%
          );
          color: white;
          border: none;
          border-radius: 0.625em;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .blue-btn:hover {
          color: rgb(0, 0, 0);
        }

        .blue-btn:after {
          content: "";
          background: white;
          position: absolute;
          z-index: -1;
          left: -20%;
          right: -20%;
          top: 0;
          bottom: 0;
          transform: skewX(-45deg) scale(0, 1);
          transition: all 0.5s;
        }

        .blue-btn:hover:after {
          transform: skewX(-45deg) scale(1, 1);
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
        }
        `}</style>
        <button onClick={handleOpenCreatePost} class="blue-btn">Create Post</button>
      </>
    )
  }

  const UploadMedia = ({ icon }) => {
    return (
      <>
        <style>{`
        .container {
          height: 300px;
          width: auto;
          border-radius: 10px;
          box-shadow: 4px 4px 30px ${theme.shadow};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          gap: 5px;
          background-color: ${theme.background};
        }

        .header {
          flex: 1;
          width: 100%;
          border: 2px dashed ${theme.secondaryText};
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .header p {
          text-align: center;
          color: ${theme.secondaryText};
        }

        .footer {
          background-color: ${theme.cardBg};
          width: 100%;
          height: 40px;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: ${theme.secondaryText};
          border: none;
        }

        .footer svg {
          height: auto;
          fill: ${theme.secondaryText};
          background-color: ${theme.cardBg};
          border-radius: 50%;
          padding: 12px;
          cursor: pointer;
          box-shadow: 0 2px 30px ${theme.shadow};
        }

        .footer p {
          flex: 1;
          text-align: center;
        }

        #file {
          display: none;
        }
      `}</style>

        <div class="container">
          <div class="header">
            {icon} <p>Browse File to upload!</p>
          </div>
          <label for="file" class="footer">
            <p>Not selected file</p>
          </label>
          <input id="file" type="file" />
        </div>
      </>
    )
  }

  const handleViewUserPosts = () => { navigate('/UserPosts') }

  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.get('http://localhost:2000/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      const user = response.data.user
      const profile = response.data.profile
      setIsCompany(user.isCompany)
      setUsername(user.username)
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setCompanyName(profile.companyName)
      setIndustry(profile.industry)
      setDesc(profile.description)
      setDp(profile.currentDp)
      setFollowers(profile.followers)
      setFollowing(profile.following)
    } catch (error) {
      console.error(error.message)
    }
  }

  const CREATEPOSTBUTTONS = [
    { title: 'Add Photo', icon: <InsertPhoto />, click: handleOpenCreatePostImage },
    { title: 'Add Video', icon: <Movie />, click: handleOpenCreatePostVideo },
    { title: 'Add Document', icon: <Description />, click: () => navigate('/Post/Article')},
    { title: 'Find an Expert', icon: <PersonPin />, click: handleOpenCreatePostExpert }
  ]

  const POSTCREATION = [
    { icon: <Movie />, title: "Video", click: handleOpenCreatePostVideo },
    { icon: <InsertPhoto />, title: "Photo", click: handleOpenCreatePostImage },
    { icon: <Article />, title: "Article", click: () => navigate('/Post/Article') }
  ]

  const PostHead = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ lg: 4, md: 4, sm: 4, xs: 2 }}>
            <Box>
              {dp && dp.startsWith('https://') ? (
                <Avatar src={dp} alt={isCompany ? companyName : `${firstName} ${lastName}`}
                  sx={{ width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 } }} />
              ) : (
                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 }, fontSize: { lg: 22, md: 20, sm: 20, xs: 20 } }}>
                  {dp}
                </Avatar>
              )}
            </Box>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant='span' sx={{ fontWeight: 'bolder', color: theme.primaryText, fontSize: { sm: 20, xs: 20 } }}>{isCompany ? companyName : `${firstName} ${lastName}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant='span' sx={{ color: theme.secondaryText, fontSize: { sm: 12, xs: 12 } }}>{optionsPostView[selectedIndexPostView]}</Typography>
            </Box>
          </Grid>
          <Grid size={{ lg: 2, md: 2, sm: 2, xs: 2 }}>
            {openPostView ? <ArrowDropUp /> : <ArrowDropDown />}
          </Grid>
        </Grid>
      </Box>
    )
  }

  useEffect(() => { fetchUser() }, [])
  return (
    <Box sx={{ flexGrow: 1, pt: { lg: 9, md: 8, sm: 8, xs: 7 }, height: '100%', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
      <Grid container>
        <Grid size={{ lg: 4, md: 4, sm: 5, xs: 12 }} sx={{ display: { lg: 'block', md: 'block', sm: 'flex', xs: 'none' }, flexDirection: 'column' }}>
          <Box>
            {isCompany ? <HomeOrgProfileCard theme={theme} companyName={companyName} industry={industry}
              handleView={handleViewUserPosts} desc={desc} dp={dp} username={username} followers={followers}
              following={following} /> :
              <HomeProfileCard theme={theme} firstName={firstName} lastName={lastName} following={following}
                username={username} handleView={handleViewUserPosts} desc={desc} dp={dp} followers={followers} />}
          </Box>
          <Box sx={{ display: { lg: 'none', md: 'none', sm: 'block', xs: 'none' }, width: 'auto', ml: 2, mr: 2, mb: 2 }}>
            <PuzzleList />
          </Box>
          <Box sx={{
            display: { lg: 'none', md: 'none', sm: 'flex', xs: 'none' },
            p: 2, gap: 1, alignItems: 'center', justifyContent: 'center'
          }}>
            <Box>
              <img src={logo} alt="Hyrivo" height='22px' />
            </Box>
            <Box>
              <Typography variant='span' sx={{ color: theme.secondaryText }}>by Mike Davis &#169; 2025</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ lg: 5, md: 5, sm: 7, xs: 12 }}>
          <Box sx={{ flexGrow: 1, pt: 2, pr: { lg: 0, md: 0, sm: 2, xs: 2 }, pl: { lg: 0, md: 0, sm: 0, xs: 2 } }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                  <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2} alignItems='center'>
                        <Grid size={{ lg: 1, md: 2, sm: 2, xs: 2 }}>
                          <Box>
                            {dp && dp.startsWith('https://') ? (
                              <Avatar src={dp} alt={isCompany ? companyName : `${firstName} ${lastName}`}
                                sx={{ width: 50, height: 50 }} />
                            ) : (
                              <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                {dp}
                              </Avatar>
                            )}
                          </Box>
                        </Grid>
                        <Grid size={{ lg: 11, md: 10, sm: 10, xs: 10 }}>
                          <Box sx={{ pr: 2 }}>
                            <Addpostbtn />
                            <Modal
                              open={openCreatePost}
                              onClose={handleCloseCreatPost}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                                  <ButtonBase onClick={handleCloseCreatPost} sx={{
                                    display: 'flex', color: theme.primaryText,
                                    flexDirection: 'column', justifyContent: 'flex-end',
                                    alignItems: 'center', pb: 0.5, px: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      color: theme.hoverAccent,
                                    }
                                  }}><Close /></ButtonBase>
                                </Box>
                                <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                  <CardActions>
                                    <Box>
                                      <ButtonBase onClick={handleClickPostView} sx={{
                                        display: 'flex', color: theme.primaryText,
                                        flexDirection: 'column', justifyContent: 'flex-end',
                                        alignItems: 'center', pb: 0.5, px: 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          color: theme.hoverAccent,
                                        }
                                      }}><PostHead /></ButtonBase>
                                    </Box>
                                  </CardActions>
                                  <CardContent>
                                    <Box sx={{ display: 'flex', width: '100%', fontSize: { lg: 20, md: 20, sm: 18, xs: 15 }, }}>
                                      <TextareaAutosize placeholder='What do you wanna talk about?'
                                        maxRows={15} minRows={5} style={{
                                          border: 'none', outline: 'none',
                                          background: 'transparent', resize: 'none',
                                          width: '100%', color: theme.primaryText, font: 'inherit'
                                        }} />
                                    </Box>
                                  </CardContent>
                                  <CardActions>
                                    <Box sx={{ display: 'flex', gap: { lg: 2, md: 2, sm: 2, xs: 1 } }}>
                                      {CREATEPOSTBUTTONS.map((d, i) => (
                                        <Tooltip key={i} title={d.title} placement='top' arrow>
                                          <ButtonBase onClick={d.click} sx={{
                                            display: 'flex', color: theme.primaryText,
                                            flexDirection: 'column', justifyContent: 'flex-end',
                                            alignItems: 'center', pb: 0.5, px: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                              color: theme.hoverAccent,
                                            }
                                          }}>{d.icon}</ButtonBase>
                                        </Tooltip>
                                      ))}
                                    </Box>
                                  </CardActions>
                                </Card>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                  <Button variant='outlined' size='large' startIcon={<Publish />}
                                    sx={{
                                      color: theme.primaryAccent,
                                      borderColor: theme.primaryAccent,
                                      '&:hover': {
                                        backgroundColor: theme.hoverAccent,
                                        borderColor: theme.hoverAccent,
                                        color: theme.primaryBg
                                      }
                                    }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      post
                                    </Box></Button>
                                </Box>
                              </Box>
                            </Modal>
                          </Box>
                          <Menu
                            id="lock-menu"
                            anchorEl={anchorElPostView}
                            open={openPostView}
                            onClose={handleClosePostView}
                            slotProps={{
                              list: {
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                              },
                              paper: {
                                sx: {
                                  background: theme.secondaryBg,
                                  color: theme.primaryText
                                }
                              }
                            }}
                          >
                            <Box sx={{ textAlign: 'center', p: 1 }}>
                              <Typography variant='span' sx={{ fontWeight: 'bolder', color: theme.primaryText, fontSize: 12 }}>Who can view the post</Typography>
                            </Box>
                            {optionsPostView.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndexPostView}
                                onClick={(event) => handleMenuPostView(event, index)}
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
                                }}
                              >
                                {option}
                              </MenuItem>
                            ))}
                            <Divider color={theme.secondaryText} />
                            <Box sx={{ textAlign: 'center', p: 1 }}>
                              <Typography variant='span' sx={{ fontWeight: 'bolder', color: theme.primaryText, fontSize: 12 }}>Who can comment on the post</Typography>
                            </Box>
                            {optionsPostComment.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndexPostComment}
                                onClick={(event) => handleMenuPostComment(event, index)}
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
                                }}
                              >
                                {option}
                              </MenuItem>
                            ))}
                            <Divider color={theme.secondaryText} />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                              <Button variant='outlined' size='large' startIcon={<Done />}
                                onClick={handleClosePostView}
                                sx={{
                                  color: theme.primaryAccent,
                                  borderColor: theme.primaryAccent,
                                  '&:hover': {
                                    backgroundColor: theme.hoverAccent,
                                    borderColor: theme.hoverAccent,
                                    color: theme.primaryBg
                                  }
                                }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  done
                                </Box></Button>
                            </Box>
                          </Menu>
                        </Grid>
                        <Grid size={12}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                              {POSTCREATION.map((d, i) => (
                                <Grid key={i} size={4}>
                                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button startIcon={d.icon} onClick={d.click}
                                      sx={{
                                        color: theme.primaryAccent,
                                        '&:hover': { color: theme.hoverAccent }
                                      }}>{d.title}</Button>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                          <Modal
                            open={openCreatePostImage}
                            onClose={handleCloseCreatPostImage}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                                <ButtonBase onClick={handleCloseCreatPostImage} sx={{
                                  display: 'flex', color: theme.primaryText,
                                  flexDirection: 'column', justifyContent: 'flex-end',
                                  alignItems: 'center', pb: 0.5, px: 1,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    color: theme.hoverAccent,
                                  }
                                }}><Close /></ButtonBase>
                              </Box>
                              <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                <CardContent>
                                  <Box>
                                    <UploadMedia icon={<InsertPhoto sx={{ color: theme.secondaryText, height: 100, width: 100 }} />} />
                                  </Box>
                                </CardContent>
                              </Card>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                <Button variant='outlined' size='large' endIcon={<NavigateNext />}
                                  sx={{
                                    color: theme.primaryAccent,
                                    borderColor: theme.primaryAccent,
                                    '&:hover': {
                                      backgroundColor: theme.hoverAccent,
                                      borderColor: theme.hoverAccent,
                                      color: theme.primaryBg
                                    }
                                  }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    next
                                  </Box></Button>
                              </Box>
                            </Box>
                          </Modal>
                          <Modal
                            open={openCreatePostVideo}
                            onClose={handleCloseCreatPostVideo}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                                <ButtonBase onClick={handleCloseCreatPostVideo} sx={{
                                  display: 'flex', color: theme.primaryText,
                                  flexDirection: 'column', justifyContent: 'flex-end',
                                  alignItems: 'center', pb: 0.5, px: 1,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    color: theme.hoverAccent,
                                  }
                                }}><Close /></ButtonBase>
                              </Box>
                              <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                <CardContent>
                                  <Box>
                                    <UploadMedia icon={<Movie sx={{ color: theme.secondaryText, height: 100, width: 100 }} />} />
                                  </Box>
                                </CardContent>
                              </Card>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                <Button variant='outlined' size='large' endIcon={<NavigateNext />}
                                  sx={{
                                    color: theme.primaryAccent,
                                    borderColor: theme.primaryAccent,
                                    '&:hover': {
                                      backgroundColor: theme.hoverAccent,
                                      borderColor: theme.hoverAccent,
                                      color: theme.primaryBg
                                    }
                                  }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    next
                                  </Box></Button>
                              </Box>
                            </Box>
                          </Modal>
                          <Modal
                            open={openCreatePostExpert}
                            onClose={handleCloseCreatPostExpert}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                                <ButtonBase onClick={handleCloseCreatPostExpert} sx={{
                                  display: 'flex', color: theme.primaryText,
                                  flexDirection: 'column', justifyContent: 'flex-end',
                                  alignItems: 'center', pb: 0.5, px: 1,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    color: theme.hoverAccent,
                                  }
                                }}><Close /></ButtonBase>
                              </Box>
                              <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                <CardContent>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                      <Grid size={12}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <Typography component='span' sx={{
                                            fontWeight: 'bolder', color: theme.primaryText,
                                            fontSize: { lg: '25px', md: '25px', sm: '18px', xs: '15px' }
                                          }}>
                                            Find an expert
                                          </Typography>
                                          <Typography component='span' sx={{
                                            color: theme.secondaryText,
                                            fontSize: { lg: '15px', md: '15px', sm: '12px', xs: '10px' }
                                          }}>
                                            A few question to describe what are you looking for:
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                          <TextField variant='outlined' label='What do you need help with'
                                            fullWidth required
                                            sx={{
                                              "& .MuiInputBase-input": {
                                                color: theme.primaryText, // input text color
                                                "&::placeholder": {
                                                  color: theme.secondaryText, // placeholder color
                                                  opacity: 1, // ensures custom color shows
                                                },
                                              },
                                              "& .MuiInputLabel-root": {
                                                color: theme.secondaryText, // default label color
                                              },
                                              "& .MuiInputLabel-root.Mui-focused": {
                                                color: theme.primaryAccent, // focused label color
                                              },
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor: theme.primaryAccent, // default border
                                                },
                                                "&:hover fieldset": {
                                                  borderColor: theme.hoverAccent, // hover border
                                                },
                                                "&.Mui-focused fieldset": {
                                                  borderColor: theme.primaryAccent, // focus border
                                                },
                                              },
                                              '& label.Mui-focused': { //label on clicking
                                                color: theme.primaryAccent
                                              },
                                              '&:hover label:not(.Mui-focused)': {
                                                color: theme.primaryAccent
                                              },
                                              "& .MuiFormHelperText-root": {
                                                color: theme.secondaryText,
                                              },
                                            }} />
                                          <TextField variant='outlined' label='What type of help you need with'
                                            fullWidth required
                                            sx={{
                                              "& .MuiInputBase-input": {
                                                color: theme.primaryText, // input text color
                                                "&::placeholder": {
                                                  color: theme.secondaryText, // placeholder color
                                                  opacity: 1, // ensures custom color shows
                                                },
                                              },
                                              "& .MuiInputLabel-root": {
                                                color: theme.secondaryText, // default label color
                                              },
                                              "& .MuiInputLabel-root.Mui-focused": {
                                                color: theme.primaryAccent, // focused label color
                                              },
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor: theme.primaryAccent, // default border
                                                },
                                                "&:hover fieldset": {
                                                  borderColor: theme.hoverAccent, // hover border
                                                },
                                                "&.Mui-focused fieldset": {
                                                  borderColor: theme.primaryAccent, // focus border
                                                },
                                              },
                                              '& label.Mui-focused': { //label on clicking
                                                color: theme.primaryAccent
                                              },
                                              '&:hover label:not(.Mui-focused)': {
                                                color: theme.primaryAccent
                                              },
                                              "& .MuiFormHelperText-root": {
                                                color: theme.secondaryText,
                                              },
                                            }} />
                                        </Box>
                                      </Grid>
                                      <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                          <TextField variant='outlined' label='Skills that are required for the problem'
                                            fullWidth required
                                            sx={{
                                              "& .MuiInputBase-input": {
                                                color: theme.primaryText, // input text color
                                                "&::placeholder": {
                                                  color: theme.secondaryText, // placeholder color
                                                  opacity: 1, // ensures custom color shows
                                                },
                                              },
                                              "& .MuiInputLabel-root": {
                                                color: theme.secondaryText, // default label color
                                              },
                                              "& .MuiInputLabel-root.Mui-focused": {
                                                color: theme.primaryAccent, // focused label color
                                              },
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor: theme.primaryAccent, // default border
                                                },
                                                "&:hover fieldset": {
                                                  borderColor: theme.hoverAccent, // hover border
                                                },
                                                "&.Mui-focused fieldset": {
                                                  borderColor: theme.primaryAccent, // focus border
                                                },
                                              },
                                              '& label.Mui-focused': { //label on clicking
                                                color: theme.primaryAccent
                                              },
                                              '&:hover label:not(.Mui-focused)': {
                                                color: theme.primaryAccent
                                              },
                                              "& .MuiFormHelperText-root": {
                                                color: theme.secondaryText,
                                              },
                                            }} />
                                          <TextField variant='outlined' label='Location'
                                            fullWidth required
                                            sx={{
                                              "& .MuiInputBase-input": {
                                                color: theme.primaryText, // input text color
                                                "&::placeholder": {
                                                  color: theme.secondaryText, // placeholder color
                                                  opacity: 1, // ensures custom color shows
                                                },
                                              },
                                              "& .MuiInputLabel-root": {
                                                color: theme.secondaryText, // default label color
                                              },
                                              "& .MuiInputLabel-root.Mui-focused": {
                                                color: theme.primaryAccent, // focused label color
                                              },
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor: theme.primaryAccent, // default border
                                                },
                                                "&:hover fieldset": {
                                                  borderColor: theme.hoverAccent, // hover border
                                                },
                                                "&.Mui-focused fieldset": {
                                                  borderColor: theme.primaryAccent, // focus border
                                                },
                                              },
                                              '& label.Mui-focused': { //label on clicking
                                                color: theme.primaryAccent
                                              },
                                              '&:hover label:not(.Mui-focused)': {
                                                color: theme.primaryAccent
                                              },
                                              "& .MuiFormHelperText-root": {
                                                color: theme.secondaryText,
                                              },
                                            }} />
                                        </Box>
                                      </Grid>
                                      <Grid size={12}>
                                        <Box sx={{ pb: 2 }}>
                                          <Typography component='span' sx={{
                                            color: theme.secondaryText,
                                            fontSize: { lg: '15px', md: '15px', sm: '12px', xs: '10px' }
                                          }}>
                                            Description:
                                          </Typography>
                                        </Box>
                                        <Box sx={{
                                          display: 'flex', width: '100%', fontSize: { lg: 20, md: 20, sm: 18, xs: 15 }, color: theme.primaryText,
                                          '& textarea': {
                                            border: 'none', background: 'transparent', resize: 'none', width: '100%',
                                            font: 'inherit', color: 'inherit', outline: `1px solid ${theme.primaryAccent}`,
                                            borderRadius: '5px', p: 2
                                          },
                                          '& textarea:focus': {
                                            outline: `1px solid ${theme.hoverAccent}`
                                          },
                                          '& textarea::placeholder': {
                                            color: theme.secondaryText,
                                          }
                                        }}>
                                          <TextareaAutosize
                                            placeholder='I am looking for professionals who can help me with few projects. Does anyone have a recommendation?'
                                            maxRows={15} minRows={5} />
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </CardContent>
                              </Card>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                <Button variant='outlined' size='large' endIcon={<NavigateNext />}
                                  sx={{
                                    color: theme.primaryAccent,
                                    borderColor: theme.primaryAccent,
                                    '&:hover': {
                                      backgroundColor: theme.hoverAccent,
                                      borderColor: theme.hoverAccent,
                                      color: theme.primaryBg
                                    }
                                  }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    next
                                  </Box></Button>
                              </Box>
                            </Box>
                          </Modal>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={12}>
                <Divider sx={{
                  '&::before, &::after': {
                    borderColor: theme.secondaryText,
                  },
                }} textAlign="right">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='span' sx={{ color: theme.secondaryText }}>Sort By:</Typography>
                    <Link component='button' onClick={handleClickListItem}
                      sx={{ textDecoration: 'none', fontWeight: 'bolder', color: theme.primaryText }}
                    >{options[selectedIndex]}</Link>
                    {open ? <ArrowDropUp /> : <ArrowDropDown />}
                  </Box>
                </Divider>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': 'lock-button',
                      role: 'listbox',
                    },
                    paper: {
                      sx: {
                        background: theme.secondaryBg,
                        color: theme.primaryText
                      }
                    }
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
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
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
              <Grid size={12}>
                <Box sx={{ minHeight: '100vh', height: '100%' }}>
                  <Posts />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid size={12} sx={{ display: { lg: 'none', md: 'none', sm: 'none', xs: 'block' } }}>
          <Box sx={{
            display: { lg: 'none', md: 'none', sm: 'none', xs: 'flex' },
            p: 2, gap: 1, alignItems: 'center', justifyContent: 'center'
          }}>
            <Box>
              <img src={logo} alt="Hyrivo" height='22px' />
            </Box>
            <Box>
              <Typography variant='span' sx={{ color: theme.secondaryText }}>by Mike Davis &#169; 2025</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={3} sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' }, p: 2 }}>
          <PuzzleList /><br />
          <Box sx={{
            display: 'flex',
            p: 2, gap: 1, alignItems: 'center', justifyContent: 'center'
          }}>
            <Box>
              <img src={logo} alt="Hyrivo" height='22px' />
            </Box>
            <Box>
              <Typography variant='span' sx={{ color: theme.secondaryText }}>by Mike Davis &#169; 2025</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
