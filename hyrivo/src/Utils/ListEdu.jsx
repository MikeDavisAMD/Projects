import { Box, Grid } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'

export const ListEdu = ({education}) => {
  const {theme} = useThemeContext()
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        {!education || education.length === 0 ? (
          <Grid size={12} sx={{textAlign:'center'}}>
            <Box component='span'>No Education Added</Box>
          </Grid>
        ):(
          <Grid size={12}>
            {education.map((data,index) => (
              (
                <Box key={index} sx={{m:1,p:1,background:theme.secondaryBg,borderRadius:2}}>
                  <Box component='span' sx={{fontWeight:'bolder',color:theme.primaryText,fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data.institute}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data.degree}</Box>
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                    ,
                  </Box>
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data.fieldOfStudy}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.startDate ? new Date(data.startDate).toLocaleDateString() : "N/A" }</Box>
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',color:theme.secondaryText }}>
                    -
                  </Box>
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.isStudying ? "Present" : data.endDate ? new Date(data.endDate).toLocaleDateString() : "N/A"}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>{data.grade}</Box><br />
                </Box>
              )
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
