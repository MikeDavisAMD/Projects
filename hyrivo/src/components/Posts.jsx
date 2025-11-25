import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { BookmarkOutlined, ChatBubbleOutline, Description, LockOutline, MoreHoriz, Public, Repeat, ThumbUpOutlined } from '@mui/icons-material'
import { bull } from '../Utils/bull'
import { formatTimeAgo } from '../Utils/formatTimeAgo'
import axios from 'axios'

export const Posts = ({ sortType }) => {
  const { theme } = useThemeContext()
  const [posts, setPosts] = useState("")

  // Menu for Edit Delete
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) return

      try {
        const response = await axios.get("http://localhost:2000/posts/all", {
          headers: { Authorization: `Bearer ${token}` }
        })
        let sortedPosts = [...response.data.result]

        if (sortType === 'Top') {
          sortedPosts = sortedPosts.sort((a, b) => b.post.likes?.length - a.post.likes?.length)
        } else if (sortType === 'Recent') {
          sortedPosts = sortedPosts.sort((a, b) => new Date(b.post.postedAt).getTime() - new Date(a.post.postedAt).getTime())
        }

        setPosts(sortedPosts)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [sortType])

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ pb: 10 }}>
          {posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: theme.primaryText }}>No Posts yet</Box>
          ) : posts.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 3, gap: 2 }}>
              <Card sx={{ width: '100%', borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, boxShadow: `1px 1px 5px ${theme.shadow}` }}>
                <CardHeader
                  avatar={
                    p.profile.currentDp && p.profile.currentDp.startsWith('https://') ? (
                      <Avatar src={p.profile.currentDp} alt={p.user.isCompany ? p.profile.companyName : `${p.profile.firstName} ${p.profile.lastName}`}
                        sx={{ width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 } }} />
                    ) : (
                      <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 }, fontSize: { lg: 22, md: 20, sm: 20, xs: 20 } }}>
                        {p.profile.currentDp}
                      </Avatar>
                    )
                  }
                  action={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
                      <IconButton onClick={handleClick} sx={{
                        color: theme.primaryText, '&:hover': {
                          color: theme.hoverAccent
                        }
                      }}>
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        id="basic-menu"
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
                        <MenuItem onClick={() => {
                          handleClose()
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <BookmarkOutlined />Save
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
                    }}>{p.user.isCompany ? p.profile.companyName : `${p.profile.firstName} ${p.profile.lastName}`}</Typography>
                  }
                  subheader={
                    <Box>
                      <Typography variant="body2" sx={{
                        display: 'flex', maxWidth: '90%', gap:.5, alignItems:'center',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }, pb: .5
                      }}>
                        @ {p.user.username} {p.user.isCompany ? 
                          <Box sx={{display:'flex', gap:.5}}>
                            {bull}
                            {p.profile.industry}
                          </Box>
                         : null}
                      </Typography>
                      <Typography variant="body2" sx={{
                        display: 'block', maxWidth: '90%',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 }
                      }}>
                        {p.profile.description}
                      </Typography>
                      <Typography variant="body2" sx={{
                        display: 'block', maxWidth: '90%',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: theme.secondaryText, fontSize: { lg: 10, md: 10, sm: 8, xs: 8 }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap:.5 }}>
                          {formatTimeAgo(p.post.postedAt)}
                          {bull}
                          {p.post.postView === "everyone" ?
                            <Public sx={{ fontSize: { lg: 14, md: 14, sm: 11, xs: 11 } }} /> :
                            <LockOutline sx={{ fontSize: { lg: 14, md: 14, sm: 11, xs: 11 } }} />}
                        </Box>
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: theme.secondaryText }}>
                    {p.post.postText}
                  </Typography>
                </CardContent><br />
                {p.post.media && (
                  <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                    {p.post.mediaType === 'image' && (
                      <CardMedia
                        component="img"
                        src={p.post.media} alt='Pic Post'
                        sx={{
                          maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                        }}
                      />
                    )}
                    {p.post.mediaType === 'video' && (
                      <CardMedia
                        component="video"
                        src={p.post.media} controls
                        sx={{
                          maxWidth: 'fit-content', maxHeight: 'fit-content', ml: 2, mr: 2,
                        }}
                      />
                    )}
                    {p.post.mediaType === 'document' && (
                      <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                        <CardActionArea onClick={() => window.open(p.post.media, '_blank')}>
                          <CardContent sx={{ width: { lg: 400, md: 330, sm: 280, xs: 200 } }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <Grid container spacing={2}>
                                <Grid size={{ lg: 3, md: 3, sm: 3, xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <Description sx={{
                                    color: theme.primaryText,
                                    height: { lg: 100, md: 90, sm: 80, xs: 50 }, width: { lg: 100, md: 90, sm: 80, xs: 50 }
                                  }} />
                                </Grid>
                                <Grid size={{ lg: 9, md: 9, sm: 9, xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                  <Typography gutterBottom variant="h5" component="div" sx={{
                                    color: theme.primaryText,
                                    fontSize: { lg: 20, md: 20, sm: 18, xs: 15 }
                                  }}>
                                    {p.post.media.split("/").pop()}
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
                    sx={{
                      color: theme.primaryText,
                      border: 'none', m: 0, p: 0,
                      '&:hover': {
                        color: theme.hoverAccent
                      }
                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                      comment
                    </Box></Button>
                  <Button variant='outlined' startIcon={<Repeat />}
                    sx={{
                      color: theme.primaryText,
                      border: 'none', m: 0, p: 0,
                      '&:hover': {
                        color: theme.hoverAccent
                      }
                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                      repost
                    </Box></Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
