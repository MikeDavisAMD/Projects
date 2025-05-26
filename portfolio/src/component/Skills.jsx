import { Box, Grid, Typography } from '@mui/material'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import React from 'react'
import html from '../Assets/Logo/html.png'
import css from '../Assets/Logo/css-3.png'
import js from '../Assets/Logo/js.png'
import react from '../Assets/Logo/react.png'
import node from '../Assets/Logo/nodejs.png'
import express from '../Assets/Logo/Express.png'
import mongodb from '../Assets/Logo/mongodb.png'

export const Skills = React.forwardRef((props,ref) => {
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},alignContent:'center'}}>
          <Typography variant='h1' 
          sx={{fontFamily:'"Special Gothic Expanded One", sans-serif',fontSize:{lg:'40px',md:'40px',sm:'40px',xs:'20px'},
          fontWeight:400,fontStyle:'normal',color:'#1A73E8',textAlign:'center'}}>
            Skills
          </Typography>
        </Box>
      </Grid>
      <Grid size={12} sx={{backgroundColor:'#F5F7FA'}}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot >
                <img src={html} alt="HTML" height={35}/>
              </TimelineDot>
              <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
              <Typography variant="h6" component="span">
                HTML
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{height:'50px'}}/>
              <TimelineDot >
                <img src={css} alt="CSS" height={35}/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2,display:'flex',justifyContent:'end',alignItems:'end' }}>
              <Typography variant="h6" component="span">
                CSS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{height:'50px'}}/>
              <TimelineDot >
                <img src={js} alt="JavaScript" height={35} style={{borderRadius:'15px'}}/>
              </TimelineDot>
              <TimelineConnector sx={{height:'50px'}} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display:'flex',alignItems:'center' }}>
              <Typography variant="h6" component="span">
                Java Script
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <img src={react} alt="React JS" height={35}/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
              <Typography variant="h6" component="span">
                React JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{height:'50px'}} />
              <TimelineDot >
                <img src={node} alt="Node.js" height={35}/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display:'flex', alignItems:'end' }}>
              <Typography variant="h6" component="span">
                Node JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{height:'50px'}} />
              <TimelineDot sx={{p:0}}>
                <img src={express} alt="Express JS" height={40} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2,display:'flex',justifyContent:'end',alignItems:'end' }}>
              <Typography variant="h6" component="span">
                Express JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{height:'50px'}} />
              <TimelineDot >
                <img src={mongodb} alt="Mongo DB" height={35} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2,display:'flex',alignItems:'end' }}>
              <Typography variant="h6" component="span">
                Mongo DB
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    </Grid>
  )
})
