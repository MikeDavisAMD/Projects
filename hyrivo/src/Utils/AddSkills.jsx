import { Box, Grid } from '@mui/material'
import React from 'react'
import { AddSkillsUi } from './AddSkillsUI'

export const AddSkills = () => {
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AddSkillsUi/>
        </Grid>
      </Grid>
    </Box>
  )
}
