import React from 'react'
import { Box, Grid } from '@mui/material'
import { useThemeContext } from '../Utils/ThemeContext'

export const Home = () => {
  const {theme} = useThemeContext()
  return (
    <Box sx={{flexGrow:1, height:'100vh', backgroundColor:theme.primaryBg, color: theme.primaryText}}>
      <Grid container>
          <Grid size={12}>
              Home
          </Grid>
      </Grid>
    </Box>
  )
}
