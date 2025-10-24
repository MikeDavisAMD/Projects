import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { AppBar, Box, ButtonBase, Grid, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, Article } from '@mui/icons-material'

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
          <Box sx={{textAlign:'center'}}>No Posts Yet</Box>
        </Grid>
      </Grid>
    </Box>
  )
}
