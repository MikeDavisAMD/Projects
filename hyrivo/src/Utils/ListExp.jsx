import { Box, Chip, Grid, Stack } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'

export const ListExp = ({experience}) => {
  const {theme} = useThemeContext()
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
              <Box key={index} sx={{m:1,p:1,background:theme.secondaryBg,borderRadius:2}}>
                <Box component='span' sx={{fontWeight:'bolder',color:theme.primaryText,fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data.title}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data.company}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data.empType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.location}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.locType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.startDate ? new Date(data.startDate).toLocaleDateString() : "N/A" }</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  -
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.isCurrentRole ? "Present" : data.endDate ? new Date(data.endDate).toLocaleDateString() : "N/A"}</Box><br />
                {data.skills && data.skills.length > 0 && (
                  <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
                    sx={{display:'grid',gridTemplateColumns:{lg:'repeat(3, 1fr)',md:'repeat(3, 1fr)',sm:'repeat(2, 1fr)',xs:'repeat(1, 1fr)'}, 
                    gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                      {data.skills.map((skill, index) => (
                        <Chip key={index} label={skill} 
                        sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
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
