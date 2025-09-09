import { Box, Chip, Grid, Stack } from '@mui/material'
import React from 'react'
import { COLORS } from './colors'

export const ListExp = ({experience}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {!experience || experience.length === 0 ? (
          <Grid size={12} sx={{textAlign:'center'}}>
            <Box component='span'>No Experience Added</Box>
          </Grid>
        ):(
          <Grid size={12}>
            {experience.map((data, index) => (
              <Box key={index} sx={{m:1,p:1,background:COLORS.secondaryBg,borderRadius:2}}>
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data.title}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>{data.company}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>{data.EmpType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.location}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.LocType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.startDate ? data.startDate.toLocaleDateString() : "N/A" }</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                  -
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.isCurrentRole ? "Present" : data.endDate ? data.endDate.toLocaleDateString() : "N/A"}</Box><br />
                {data.skills && data.skills.length > 0 && (
                  <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
                    sx={{display:'grid',gridTemplateColumns:{lg:'repeat(4, 1fr)',md:'repeat(4, 1fr)',sm:'repeat(3, 1fr)',xs:'repeat(2, 1fr)'}, 
                    gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                      {data.skills.map((skill, index) => (
                        <Chip key={index} label={skill} 
                        sx={{ backgroundColor: COLORS.cardBg, color:COLORS.primaryText, border:`1px solid ${COLORS.cardBorder}` }}/>
                      ))}
                  </Stack>
                )}
              </Box>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
