import { Box, Grid } from '@mui/material'
import React from 'react'
import { COLORS } from './colors'

export const ListEdu = ({education}) => {

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
                <Box key={index} sx={{m:1,p:1,background:COLORS.secondaryBg,borderRadius:2}}>
                  <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data.institute}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>{data.degree}</Box>
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                    ,
                  </Box>
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>{data.fieldOfStudy}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.startDate ? data.startDate.toLocaleDateString() : "N/A" }</Box>
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                    -
                  </Box>
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.isStudying ? "Present" : data.endDate ? data.endDate.toLocaleDateString() : "N/A"}</Box><br />
                  <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>{data.grade}</Box><br />
                </Box>
              )
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
