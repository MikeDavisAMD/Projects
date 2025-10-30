import { AppBar, Box, ButtonBase, Grid, Toolbar } from '@mui/material'
import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, Extension } from '@mui/icons-material'
import { PuzzleList } from '../Utils/PuzzleList'

export const Puzzles = () => {
    const {theme} = useThemeContext()
    const navigate = useNavigate()

  return (
    <Box sx={{flexGrow: 1, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText}}>
        <Grid container spacing={2}>
            <Grid size={12}>
                <AppBar position='static' sx={{backgroundColor:theme.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${theme.cardBorder}`, color:theme.primaryText}}>
                    <Toolbar>
                        <Grid container sx={{alignItems:'center'}}>
                            <Grid size={3}>
                                <Box>
                                <ButtonBase onClick={()=>navigate('/')} sx={{display:'flex',
                                flexDirection:'column',justifyContent:'flex-end',
                                alignItems:'center', pb:0.5, px:1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: theme.hoverAccent,
                                }
                                }}>
                                    <ArrowBackIos/>
                                </ButtonBase>
                                </Box>
                            </Grid>
                            <Grid size={9}>
                                <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                                    <Extension sx={{
                                        height:{lg:'35px',md:'35px',sm:'32px'},
                                        width:{lg:'35px',md:'35px',sm:'32px'}}}/>
                                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                                        Puzzles
                                    </Box>
                                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                                        &
                                    </Box>
                                    <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                                        Games
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid size={12}>
                <PuzzleList/>
            </Grid>
        </Grid>
    </Box>
  )
}
