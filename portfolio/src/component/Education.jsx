import { Box, Grid, Typography } from '@mui/material'
import Timeline from '@mui/lab/Timeline';
import TimelineItem,{ timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import React from 'react'

export const Education = React.forwardRef((props,ref) => {
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},alignContent:'center'}}>
          <Typography variant='h1' 
          sx={{fontFamily:'"Special Gothic Expanded One", sans-serif',fontSize:{lg:'40px',md:'40px',sm:'40px',xs:'20px'},
          fontWeight:400,fontStyle:'normal',color:'#1A73E8',textAlign:'center'}}>
            Education & Courses
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{backgroundColor:'#F5F7FA',p:2}}>
          <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{backgroundColor:'#F9AB00'}}/>
                <TimelineConnector sx={{backgroundColor:'#34A853'}}/>
              </TimelineSeparator>
              <TimelineContent sx={{fontSize:{lg:'22px',md:'22px'}}}>
                ST. XAVIER’S CATHOLIC COLLEGE OF ENGINEERING, CHUNKANKADAI, NAGERCOIL, TAMILNADU 629004. <br />
                <i style={{opacity:'0.5'}}>Bachelor of Engineering,</i><br /> 
                <i style={{opacity:'0.5'}}>Electronics and Communication Engineering, (2017-2021)</i>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
              <TimelineDot sx={{backgroundColor:'#F9AB00'}}/>
              <TimelineConnector sx={{backgroundColor:'#34A853'}}/>
              </TimelineSeparator>
              <TimelineContent sx={{fontSize:{lg:'22px',md:'22px'}}}>
              KARKA SOFTWARE ACADEMY, NAGERCOIL,TAMILNADU 629001. <br />
              <i style={{opacity:'0.5'}}>Fullstack-MERNstack course (2025)</i>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </Grid>
    </Grid>
  )
})
