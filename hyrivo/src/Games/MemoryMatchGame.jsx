import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, ButtonBase, Grid, Toolbar, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import memorymatch from '../Assets/icons/memory-game.png'

export const MemoryMatchGame = () => {
  const { theme } = useThemeContext()
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', minWidth: '100vw', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position='static' sx={{ backgroundColor: theme.background, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.cardBorder}`, color: theme.primaryText }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid size={10}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box>
                        <Avatar alt='Memory-Match' src={memorymatch}
                          sx={{ width: { lg: 30, md: 25, sm: 25, xs: 25 }, height: { lg: 30, md: 25, sm: 25, xs: 25 } }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component='span' sx={{ fontWeight: 'bolder', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '14px' } }}>
                          Memory Match
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={2}>
                    <Box sx={{ display: 'flex', gap: { lg: 2, md: 2, sm: 2, xs: 0 }, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <ButtonBase onClick={() => navigate('/')} sx={{
                        display: 'flex',
                        flexDirection: 'column', justifyContent: 'flex-end',
                        alignItems: 'center', pb: 0.5, px: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>
                        <Close />
                      </ButtonBase>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={12}>
          <Box sx={{ textAlign: 'center' }}>Memory - Match</Box>
        </Grid>
      </Grid>
    </Box>
  )
}
