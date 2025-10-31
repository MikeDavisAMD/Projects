import React, { useEffect, useState } from 'react'
import { Alert, Avatar, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Divider, Grid, Link, Menu, MenuItem, Modal, Snackbar, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { HomeOrgProfileCard } from '../Utils/HomeOrgProfileCard'
import { HomeProfileCard } from '../Utils/HomeProfileCard'
import { useNavigate } from 'react-router-dom'
import logo from '../Assets/Images/Hyrivo copy.png'
import { PuzzleList } from '../Utils/PuzzleList'
import { Posts } from './Posts'
import { ArrowDropDown, ArrowDropUp, Article, Close, Description, Done, InsertPhoto, Movie, NavigateNext, PersonPin, Publish } from '@mui/icons-material'
import { UploadMedia } from '../Utils/UploadMedia'

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
  const [mediaUrl, setMediaUrl] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [expert, setExpert] = useState({ help: "", helpType: "", skills: "", location: "", desc: "" })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: 800, md: 800, sm: 500, xs: 300 },
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

  // Modal for create article
  const [openCreatePostArticle, setOpenCreatePostArticle] = useState(false);
  const handleOpenCreatePostArticle = () => setOpenCreatePostArticle(true);
  const handleCloseCreatPostArticle = () => setOpenCreatePostArticle(false);

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

  const handlePost = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      setLoading(true)
      const textArea = document.querySelector("#postTextArea")
      const postText = textArea?.value?.trim()

      if (!postText && !mediaUrl) {
        setError("Please write something or attach media to post")
        setOpenSnackbar(true)
        return
      }

      const formData = new FormData()
      formData.append("postText", postText)

      if (mediaUrl && mediaUrl.startsWith("blob:")) {
        const res = await fetch(mediaUrl)
        const blob = await res.blob()

        const maxSize = 100 * 1024 * 1024
        if (blob.size > maxSize) {
          setError("Max Size of 100MB can only be uploaded")
          setOpenSnackbar(true)
          setLoading(false)
          return
        }

        formData.append("media", blob, "mediaFile")
      }

      await axios.post("http://localhost:2000/posts/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      })

      setError("")
      setSuccess("Post created successfully")
      setOpenSnackbar(true)

      textArea.value = ""
      setMediaUrl(null)
      setMediaType(null)
      handleCloseCreatPost()
    } catch (error) {
      setError("Failed to create post")
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

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

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
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
    { title: 'Add Document', icon: <Description />, click: handleOpenCreatePostArticle },
    { title: 'Find an Expert', icon: <PersonPin />, click: handleOpenCreatePostExpert }
  ]

  const POSTCREATION = [
    { icon: <Movie />, title: "Video", click: handleOpenCreatePostVideo },
    { icon: <InsertPhoto />, title: "Photo", click: handleOpenCreatePostImage },
    { icon: <Article />, title: "Article", click: handleOpenCreatePostArticle }
  ]

  const POSTMODALS = [
    {
      open: openCreatePostImage, close: handleCloseCreatPostImage,
      icon: <InsertPhoto sx={{ color: theme.secondaryText, height: 100, width: 100 }} />
    },
    {
      open: openCreatePostVideo, close: handleCloseCreatPostVideo,
      icon: <Movie sx={{ color: theme.secondaryText, height: 100, width: 100 }} />
    },
    {
      open: openCreatePostArticle, close: handleCloseCreatPostArticle,
      icon: <Description sx={{ color: theme.secondaryText, height: 100, width: 100 }} />
    },
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
                                  <ButtonBase onClick={() => {
                                    handleCloseCreatPost()
                                    setMediaUrl(null)
                                    setMediaType(null)
                                  }} sx={{
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
                                    <Box sx={{
                                      display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center',
                                      gap: 2, fontSize: { lg: 20, md: 20, sm: 18, xs: 15 },
                                    }}>
                                      <TextareaAutosize id='postTextArea' placeholder='What do you wanna talk about?'
                                        maxRows={15} minRows={5} style={{
                                          border: 'none', outline: 'none',
                                          background: 'transparent', resize: 'none',
                                          width: '100%', color: theme.primaryText, font: 'inherit'
                                        }} />
                                      {mediaUrl && (
                                        <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                                          {mediaType?.startsWith("image/") && (
                                            <Box sx={{ height: { lg: 400, md: 400, sm: 300, xs: 160 }, width: { lg: 400, md: 400, sm: 300, xs: 160 } }}>
                                              <img src={mediaUrl} alt="Pic Post"
                                                style={{ maxWidth: 'auto', maxHeight: 'auto', height: 'inherit', width: 'inherit', borderRadius: '15px', }} />
                                            </Box>
                                          )}
                                          {mediaType?.startsWith("video/") && (
                                            <Box sx={{ height: { lg: 400, md: 400, sm: 235, xs: 250 }, width: { lg: 700, md: 700, sm: 400, xs: 250 } }}>
                                              <video src={mediaUrl} controls
                                                style={{ maxWidth: 'auto', maxHeight: 'auto', height: 'inherit', width: 'inherit', borderRadius: '15px', }} />
                                            </Box>
                                          )}
                                          {!mediaType?.startsWith("image/") && !mediaType?.startsWith("video/") && (
                                            <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                              <CardActionArea onClick={() => window.open(mediaUrl, '_blank')}>
                                                <CardContent sx={{ width: { lg: 700, md: 700, sm: 400, xs: 200 } }}>
                                                  <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={2}>
                                                      <Grid size={{ lg: 2, md: 2, sm: 3, xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Description sx={{
                                                          color: theme.primaryText,
                                                          height: { lg: 100, md: 100, sm: 80, xs: 50 }, width: { lg: 100, md: 100, sm: 80, xs: 50 }
                                                        }} />
                                                      </Grid>
                                                      <Grid size={{ lg: 10, md: 10, sm: 9, xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{
                                                          color: theme.primaryText,
                                                          fontSize: { lg: 20, md: 20, sm: 18, xs: 15 }
                                                        }}>
                                                          {fileName}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: theme.secondaryText }}>
                                                          Document / PDF
                                                        </Typography>
                                                      </Grid>
                                                    </Grid>
                                                  </Box>
                                                </CardContent>
                                              </CardActionArea>
                                            </Card>
                                          )}
                                        </CardMedia>
                                      )}
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
                                    onClick={handlePost}
                                    sx={{
                                      color: theme.primaryAccent,
                                      borderColor: theme.primaryAccent,
                                      '&:hover': {
                                        backgroundColor: theme.hoverAccent,
                                        borderColor: theme.hoverAccent,
                                        color: theme.primaryBg
                                      }
                                    }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      {loading ? <CircularProgress size={24} color="inherit" /> : "post"}
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
                          {POSTMODALS.map((d, i) => (
                            <Modal key={i}
                              open={d.open}
                              onClose={d.close}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                                  <ButtonBase onClick={d.close} sx={{
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
                                      <UploadMedia icon={d.icon} onMediaChange={(url, fileType, name) => {
                                        setMediaUrl(url)
                                        setMediaType(fileType)
                                        if (name) setFileName(name)
                                      }} />
                                    </Box>
                                  </CardContent>
                                </Card>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                                  <Button variant='outlined' size='large' endIcon={<NavigateNext />}
                                    onClick={() => {
                                      d.close()
                                      setOpenCreatePost(true)
                                    }}
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
                          ))}
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
                                            fullWidth required value={expert.help}
                                            onChange={(e) => setExpert({ ...expert, help: e.target.value })}
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
                                            fullWidth required value={expert.helpType}
                                            onChange={(e) => setExpert({ ...expert, helpType: e.target.value })}
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
                                            fullWidth required value={expert.skills}
                                            onChange={(e) => setExpert({ ...expert, skills: e.target.value })}
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
                                            fullWidth required value={expert.location}
                                            onChange={(e) => setExpert({ ...expert, location: e.target.value })}
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
                                            maxRows={15} minRows={5} value={expert.desc}
                                            onChange={(e) => setExpert({ ...expert, desc: e.target.value })} />
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </CardContent>
                              </Card>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                <Button variant='outlined' size='large' endIcon={<NavigateNext />}
                                  onClick={() => {
                                    const combinedText =
                                      `I need an expert for ${expert.help} in ${expert.helpType} with skills ${expert.skills} in ${expert.location}\n\nMore Details:\n${expert.desc}\n\n#findanexpert #ineedhelp #experthelp`

                                    handleCloseCreatPostExpert()
                                    setTimeout(() => {
                                      const textArea = document.querySelector("#postTextArea")
                                      if (textArea) textArea.value = combinedText
                                    }, 300)
                                  }}
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
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} variant='filled' severity={error ? 'error' : 'success'}
          sx={{
            backgroundColor: error ? '#FF4D6D' : '#1BC47D'
          }}>
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  )
}
