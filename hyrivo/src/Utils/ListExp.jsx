import { Box, Chip, Grid, Stack } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'
import { Star } from '@mui/icons-material'

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
                <Box component='span' sx={{fontWeight:'bolder',color:theme.primaryText,fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data?.title}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data?.company}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data?.empType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data?.location}</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  •
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data?.locType}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data?.startDate ? new Date(data?.startDate).toLocaleDateString() : "N/A" }</Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                  -
                </Box>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data?.isCurrentRole ? "Present" : data?.endDate ? new Date(data?.endDate).toLocaleDateString() : "N/A"}</Box><br />
                <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.primaryAccent}}><Star/></Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>-</Box><br />
                    {data.skills && data.skills.length > 0 && (
                      <Stack direction='row'
                        sx={{display:'flex', flexWrap:'wrap',
                        gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                          {data.skills.map((skill, index) => (
                            <Chip key={index} label={skill} 
                            sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
                          ))}
                      </Stack>
                    )}
                </Box>
              </Box>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
