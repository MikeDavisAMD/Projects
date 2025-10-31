import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { AppBar, Avatar, Box, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, Article, ChatBubbleOutline, MoreHoriz, Repeat, ThumbUpOutlined } from '@mui/icons-material'
import { bull } from '../Utils/bull'

export const UserPosts = () => {
  const { theme } = useThemeContext()
  const navigate = useNavigate()
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
        <Grid size={12}>
          {/* <Box sx={{textAlign:'center'}}>No Posts Yet</Box> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, gap: 2 }}>
            <Card sx={{ width: { lg: '50%', md: '50%', sm: '80%', xs: '90%' }, borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, boxShadow: `2px 2px 10px ${theme.shadow}` }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 50, md: 45, sm: 45, xs: 45 }, height: { lg: 50, md: 45, sm: 45, xs: 45 }, fontSize: { lg: 22, md: 20, sm: 20, xs: 20 } }}>
                    N
                  </Avatar>
                }
                action={
                  <Box sx={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}>
                    <IconButton sx={{
                      color: theme.primaryText, '&:hover': {
                        color: theme.hoverAccent
                      }
                    }}>
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                }
                title={
                  <Typography gutterBottom variant="h5" component="div" sx={{
                    color: theme.primaryText, fontWeight: 'bolder',
                    fontSize: { lg: 20, md: 20, sm: 18, xs: 18 }
                  }}>Name</Typography>
                }
                subheader={
                  <Box>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 } }}>industry (if organization)</Typography>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 12, md: 12, sm: 10, xs: 10 } }}>Description</Typography>
                    <Typography variant="body2" sx={{ color: theme.secondaryText, fontSize: { lg: 10, md: 10, sm: 8, xs: 8 } }}>Who can see {bull} posted time</Typography>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
              </CardContent><br />
              <CardMedia /><br />
              <Divider color={theme.secondaryText} /><br />
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
        </Grid>
      </Grid>
    </Box>
  )
}
