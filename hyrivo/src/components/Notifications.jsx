import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { Box, Grid } from '@mui/material'

export const Notifications = () => {
  const { theme } = useThemeContext()
  return (
    <Box sx={{ flexGrow: 1, pt: { lg: 10, md: 9, sm: 9, xs: 8 }, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{ textAlign: 'center' }}>Notifications</Box>
        </Grid>
      </Grid>
    </Box>
  )
}
