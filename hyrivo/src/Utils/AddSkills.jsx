import { Box, Button, Chip, Divider, Grid, Stack } from '@mui/material'
import React from 'react'
import { AddSkillsUi } from './AddSkillsUI'
import { Cancel, Save } from '@mui/icons-material'
import { useThemeContext } from './ThemeContext'

export const AddSkills = ({ skills, setSkills, handleCloseModal }) => {
  const {theme} = useThemeContext()

  const handleAddSkills = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }

  const handleDelSkills = (skill) => {
    setSkills(skills.filter(skl => skl !== skill))
  }

  return (
    <Box sx={{flexGrow:1, background:theme.primaryBg}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AddSkillsUi onAdd={handleAddSkills}/>
          <br /><Divider color={theme.secondaryText}/>
        </Grid>
        <Grid size={12}>
          <Box sx={{m:1, backgroundColor: theme.secondaryBg, color:theme.secondaryText, minHeight:'150px', 
            textAlign:'center', alignContent:'center', borderRadius:5, border: `1px solid ${theme.cardBorder}`}}>
            {skills.length === 0 ? (
              <Box component='span'>No Skills Added</Box>
            ) : (
              <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
              sx={{display:'flex',flexWrap:'wrap', 
              gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                {skills.map((skill, index) => (
                  <Chip key={index} label={skill} 
                  onDelete={() => handleDelSkills(skill)}
                  sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}`,
                  '& .MuiChip-deleteIcon': {
                    color:theme.primaryText,
                  },
                  '& .MuiChip-deleteIcon:hover': {
                    color: theme.primaryAccent, 
                  }
                }}/>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>
        <Grid size={12}>
            <Divider color={theme.secondaryText}/><br />
            <Box sx={{display:'flex',gap:2,justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'}}}>
            <Button variant='outlined' size='large' startIcon={<Cancel/>} onClick={handleCloseModal}
              sx={{
                  color:theme.primaryAccent,
                  borderColor:theme.primaryAccent,
                  '&:hover':{
                    backgroundColor:theme.hoverAccent,
                    borderColor:theme.hoverAccent,
                    color:theme.primaryBg
                  }
                }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                    Cancel
                  </Box></Button>
            <Button variant='outlined' size='large' startIcon={<Save/>} onClick={handleCloseModal}
              sx={{
                  color:theme.primaryAccent,
                  borderColor:theme.primaryAccent,
                  '&:hover':{
                    backgroundColor:theme.hoverAccent,
                    borderColor:theme.hoverAccent,
                    color:theme.primaryBg
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
