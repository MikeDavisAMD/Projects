import { Box, Button, Chip, Divider, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import { AddSkillsUi } from './AddSkillsUI'
import { COLORS } from './colors'
import { Save } from '@mui/icons-material'

export const AddSkills = () => {
  const [skills, setSkills] = useState([])

  const handleAddSkills = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }

  const handleDelSkills = (skill) => {
    setSkills(skills.filter(skl => skl !== skill))
  }

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AddSkillsUi onAdd={handleAddSkills}/>
          <br /><Divider/>
        </Grid>
        <Grid size={12}>
          <Box sx={{m:1, backgroundColor: COLORS.secondaryBg, color:COLORS.secondaryText, minHeight:'150px', 
            textAlign:'center', alignContent:'center', borderRadius:5, border: `1px solid ${COLORS.cardBorder}`}}>
            {skills.length === 0 ? (
              <Box component='span'>No Skills Added</Box>
            ) : (
              <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
              sx={{display:'grid',gridTemplateColumns:{lg:'repeat(4, 1fr)',md:'repeat(4, 1fr)',sm:'repeat(4, 1fr)',xs:'repeat(3, 1fr)'}, 
              gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                {skills.map((skill, index) => (
                  <Chip key={index} label={skill} 
                  onDelete={() => handleDelSkills(skill)}
                  sx={{ backgroundColor: COLORS.cardBg, color:COLORS.primaryText, border:`1px solid ${COLORS.cardBorder}` }}/>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>
        <Grid size={12}>
            <Divider/><br />
            <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'}}}>
            <Button variant='outlined' size='large' startIcon={<Save/>}
              sx={{
                  color:COLORS.primaryAccent,
                  borderColor:COLORS.primaryAccent,
                  '&:hover':{
                    backgroundColor:COLORS.hoverAccent,
                    borderColor:COLORS.hoverAccent,
                    color:COLORS.primaryBg
                  }
                }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                    save
                  </Box></Button>
            </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
