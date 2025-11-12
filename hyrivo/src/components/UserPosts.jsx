import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { Alert, AppBar, Avatar, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Divider, Grid, IconButton, Menu, MenuItem, Modal, Snackbar, TextareaAutosize, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, ArrowDropDown, ArrowDropUp, Article, ChatBubbleOutline, Close, Delete, Description, Done, Edit, LockOutline, MoreHoriz, Public, Publish, ThumbUpOutlined } from '@mui/icons-material'
import { bull } from '../Utils/bull'
import axios from 'axios'
import { formatTimeAgo } from '../Utils/formatTimeAgo'
import { Comments } from '../Utils/Comments'

export const UserPosts = () => {
  const { theme } = useThemeContext()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState("")
  const [profiles, setProfiles] = useState("")
  const [selectedPost, setSelectedPost] = useState("")
  const dp = profiles.currentDp

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

  // Menu for Edit Delete
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePostId, setActivePostId] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setActivePostId(postId)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActivePostId(null)
  };

  // Modal for create post
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const PostHead = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ lg: 4, md: 4, sm: 4, xs: 2 }}>
            <Box>
              {dp && dp.startsWith('https://') ? (
                <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
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
              <Typography variant='span' sx={{ fontWeight: 'bolder', color: theme.primaryText, fontSize: { sm: 20, xs: 20 } }}>{users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant='span' sx={{ color: theme.secondaryText, fontSize: { sm: 12, xs: 12 } }}>{optionsPostView[selectedIndexPostView].name}</Typography>
            </Box>
          </Grid>
          <Grid size={{ lg: 2, md: 2, sm: 2, xs: 2 }}>
            {openPostView ? <ArrowDropUp /> : <ArrowDropDown />}
          </Grid>
        </Grid>
      </Box>
    )
  }

  const fetchData = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.get("http://localhost:2000/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      })

      setUsers(response.data.user)
      setProfiles(response.data.profile)
      setPosts(response.data.post)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => { fetchData() }, [])

  const optionsPostView = [
    { name: 'Post to anyone', value: "everyone" },
    { name: 'Connections only', value: "connections" }
  ]
  const optionsPostComment = [
    { name: 'Anyone', value: "everyone" },
    { name: 'Connections only', value: "connections" },
    { name: 'No one', value: "none" }
  ]
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

  const handleEdit = async () => {
    setLoading(true)
    try {
      const updatedData = {
        postId: selectedPost._id,
        postText: selectedPost.postText,
        postView: optionsPostView[selectedIndexPostView]?.value,
        postComment: optionsPostComment[selectedIndexPostComment]?.value
      }
      await axios.put("http://localhost:2000/posts/edit", updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
      })

      setSuccess("Post Edited Successfully")
      setOpenSnackbar(true)
      setOpenModal(false)
      fetchData()
    } catch (error) {
      setError("Unable to edit")
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId) => {
    setLoading(true)
    try {
      await axios.delete('http://localhost:2000/posts/delete', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` },
        data: { postId }
      })

      setPosts(prev => prev.filter(p => p._id !== postId))
      handleClose()
      setSuccess("Post deleted successfully")
      setOpenSnackbar(true)
    } catch (error) {
      setError("Unable to delete")
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  // Comment section
  const [openComment, setOpenComment] = useState(false)

  const handleOpenComment = (postId) => {
    setOpenComment(openComment === postId ? null : postId)
  }

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

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position='static' sx={{ backgroundColor: theme.background, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.cardBorder}`, color: theme.primaryText }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid size={{ lg: 1, md: 2, sm: 2, xs: 3 }}>
                    <Box sx={{ display: 'flex', gap: { lg: 2, md: 2, sm: 2, xs: 0 }, alignItems: 'center' }}>
                      <ButtonBase onClick={() => navigate('/')} sx={{
                        display: 'flex',
                        flexDirection: 'column', justifyContent: 'flex-end',
                        alignItems: 'center', pb: 0.5, px: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>
                        <ArrowBackIos />
                      </ButtonBase>
                      <Article sx={{
                        height: { lg: '35px', md: '35px', sm: '32px', xs: '18px' },
                        width: { lg: '35px', md: '35px', sm: '32px', xs: '18px' }
                      }} />
                    </Box>
                  </Grid>
                  <Grid size={{ lg: 11, md: 10, sm: 10, xs: 9 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography component='span' sx={{ fontWeight: 'bolder', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '14px' } }}>
                        My Posts
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={12} sx={{ pb: 10 }}>
          {posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: theme.primaryText }}>No Posts yet</Box>
          ) : posts.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, gap: 2 }}>
              <Card sx={{ width: { lg: '50%', md: '50%', sm: '80%', xs: '90%' }, borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, boxShadow: `2px 2px 10px ${theme.shadow}` }}>
                <CardHeader
                  avatar={
                    dp && dp.startsWith('https://') ? (
                      <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                        sx={{ width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 } }} />
                    ) : (
                      <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 }, fontSize: { lg: 22, md: 20, sm: 20, xs: 20 } }}>
                        {dp}
                      </Avatar>
                    )
                  }
                  action={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
                      <IconButton onClick={e => handleClick(e, p._id)} sx={{
                        color: theme.primaryText, '&:hover': {
                          color: theme.hoverAccent
                        }
                      }}>
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && activePostId === p._id}
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
                        <MenuItem onClick={() => {
                          handleClose()
                          setSelectedPost(p)

                          const viewIndex = optionsPostView.findIndex(o => o.value === p.postView)
                          const commentIndex = optionsPostComment.findIndex(o => o.value === p.postComment)

                          setSelectedIndexPostView(viewIndex !== -1 ? viewIndex : 0)
                          setSelectedIndexPostComment(commentIndex !== -1 ? commentIndex : 0)

                          setTimeout(() => {
                            handleOpenModal()
                          }, 0);
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Edit />Edit
                          </Box>
                        </MenuItem>
                        <MenuItem onClick={() => {
                          handleDelete(p._id)
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Delete />Delete
                          </Box>
                        </MenuItem>
                      </Menu>
                    </Box>
                  }
                  title={
                    <Typography gutterBottom variant="h5" component="div" sx={{
                      color: theme.primaryText, fontWeight: 'bolder', display: 'block',
                      fontSize: { lg: 20, md: 20, sm: 18, xs: 18 }, maxWidth: '90%',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}</Typography>
                  }
                  subheader={
                    <Box>
                      <Typography variant="body2" sx={{
                        display: 'block', maxWidth: '90%',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }, pb: .5
                      }}>
                        @ {users.username} {users.isCompany ? `${bull} ${profiles.industry}` : null}
                      </Typography>
                      <Typography variant="body2" sx={{
                        display: 'block', maxWidth: '90%',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }
                      }}>
                        {profiles.description}
                      </Typography>
                      <Typography variant="body2" sx={{
                        display: 'block', maxWidth: '90%',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 10, md: 10, sm: 8, xs: 8 }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {formatTimeAgo(p.postedAt)}
                          {bull}
                          {p.postView === "everyone" ?
                            <Public sx={{ fontSize: { lg: 14, md: 14, sm: 11, xs: 11 } }} /> :
                            <LockOutline sx={{ fontSize: { lg: 14, md: 14, sm: 11, xs: 11 } }} />}
                        </Box>
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: theme.secondaryText }}>
                    {p.postText}
                  </Typography>
                </CardContent><br />
                {p.media && (
                  <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                    {p.mediaType === 'image' && (
                      <CardMedia
                        component="img"
                        src={p.media} alt='Pic Post'
                        sx={{
                          maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                        }}
                      />
                    )}
                    {p.mediaType === 'video' && (
                      <CardMedia
                        component="video"
                        src={p.media} controls
                        sx={{
                          maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                        }}
                      />
                    )}
                    {p.mediaType === 'document' && (
                      <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                        <CardActionArea onClick={() => window.open(p.media, '_blank')}>
                          <CardContent sx={{ width: { lg: 500, md: 400, sm: 400, xs: 200 } }}>
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
                                    {p.media.split("/").pop()}
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
                <br />
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 } }}>0 Likes</Typography>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 } }}>0 Comments</Typography>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 } }}>0 Reposts</Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1 }}>
                  <Button variant='outlined' startIcon={<ThumbUpOutlined />}
                    sx={{
                      color: theme.primaryText,
                      border: 'none', m: 0, p: 0,
                      '&:hover': {
                        color: theme.hoverAccent
                      }
                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                      Like
                    </Box></Button>
                  <Button variant='outlined' startIcon={<ChatBubbleOutline />}
                    onClick={() => handleOpenComment(p._id)} sx={{
                      color: theme.primaryText,
                      border: 'none', m: 0, p: 0,
                      '&:hover': {
                        color: theme.hoverAccent
                      }
                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                      comment
                    </Box></Button>
                </CardActions>
                <Collapse in={openComment === p._id} timeout="auto" unmountOnExit>
                  <Comments dp={dp} users={users} profiles={profiles}/>
                </Collapse>
              </Card>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
                    <ButtonBase onClick={() => {
                      handleCloseModal()
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
                          maxRows={15} minRows={5} value={selectedPost ? selectedPost.postText : ""}
                          onChange={(e) => setSelectedPost({ ...selectedPost, postText: e.target.value })}
                          style={{
                            border: 'none', outline: 'none',
                            background: 'transparent', resize: 'none',
                            width: '100%', color: theme.primaryText, font: 'inherit'
                          }} />
                        <br />
                        {selectedPost.media && (
                          <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                            {selectedPost.mediaType === 'image' && (
                              <CardMedia
                                component="img"
                                src={selectedPost.media} alt='Pic Post'
                                sx={{
                                  maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                                }}
                              />
                            )}
                            {selectedPost.mediaType === 'video' && (
                              <CardMedia
                                component="video"
                                src={selectedPost.media} controls
                                sx={{
                                  maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                                }}
                              />
                            )}
                            {selectedPost.mediaType === 'document' && (
                              <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                                <CardActionArea onClick={() => window.open(selectedPost.media, '_blank')}>
                                  <CardContent sx={{ width: { lg: 500, md: 400, sm: 400, xs: 200 } }}>
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
                                            {selectedPost.media.split("/").pop()}
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
                    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant='outlined' size='large' startIcon={<Publish />}
                          onClick={handleEdit}
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
                            key={option.value}
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
                            {option.name}
                          </MenuItem>
                        ))}
                        <Divider color={theme.secondaryText} />
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant='span' sx={{ fontWeight: 'bolder', color: theme.primaryText, fontSize: 12 }}>Who can comment on the post</Typography>
                        </Box>
                        {optionsPostComment.map((option, index) => (
                          <MenuItem
                            key={option.value}
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
                            {option.name}
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
                    </CardActions>
                  </Card>
                </Box>
              </Modal>
            </Box>
          ))}
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
