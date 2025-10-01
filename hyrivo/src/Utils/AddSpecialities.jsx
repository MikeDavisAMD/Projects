import { Box, Button, Chip, Divider, Grid, Stack } from '@mui/material'
import React from 'react'
import { AddSpecialitiesUI } from './AddSpecialitiesUI'
import { COLORS } from './colors'
import { Save } from '@mui/icons-material'

export const AddSpecialities = ({specialities, setSpecialities, handleCloseModal}) => {

    const handleAddSpecialities = (speciality) => {
        if (speciality && !specialities.includes(speciality)) {
          setSpecialities([...specialities, speciality])
        }
      }
    
      const handleDelSpecialities = (speciality) => {
        setSpecialities(specialities.filter(spl => spl !== speciality))
      }

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AddSpecialitiesUI onAdd={handleAddSpecialities}/>
          <br /><Divider/>
        </Grid>
        <Grid size={12}>
          <Box sx={{m:1, backgroundColor: COLORS.secondaryBg, color:COLORS.secondaryText, minHeight:'150px', 
            textAlign:'center', alignContent:'center', borderRadius:5, border: `1px solid ${COLORS.cardBorder}`}}>
            {specialities.length === 0 ? (
              <Box component='span'>No Specialities Added</Box>
            ) : (
              <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
              sx={{display:'flex',flexWrap:'wrap', 
              gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                {specialities.map((skill, index) => (
                  <Chip key={index} label={skill} 
                  onDelete={() => handleDelSpecialities(skill)}
                  sx={{ backgroundColor: COLORS.cardBg, color:COLORS.primaryText, border:`1px solid ${COLORS.cardBorder}` }}/>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>
        <Grid size={12}>
            <Divider/><br />
            <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'}}}>
            <Button variant='outlined' size='large' startIcon={<Save/>} onClick={handleCloseModal}
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
