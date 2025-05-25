import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import html from '../Assets/Logo/html.png'
import css from '../Assets/Logo/css-3.png'
import js from '../Assets/Logo/js.png'
import react from '../Assets/Logo/react.png'
import node from '../Assets/Logo/nodejs.png'
import express from '../Assets/Logo/Express.png'
import mongodb from '../Assets/Logo/mongodb.png'
import communication from '../Assets/Logo/communication.png'
import teamplayer from '../Assets/Logo/teamplayer.png'
import problemsolving from '../Assets/Logo/problemsolving.png'
import criticalthinking from '../Assets/Logo/criticalthinking.png'
import { ExpandMore } from '@mui/icons-material'

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
        <Box sx={{p:2,display:'flex',justifyContent:'center'}}>
          <Card sx={{minWidth: 275,maxWidth:530,backgroundColor:'#F5F7FA',borderRadius:'10px',boxShadow:'2px 4px 8px black'}}>
            <CardContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Frontend Skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{display:'flex',gap:{lg:8,md:8,sm:6,xs:3},justifyContent:'center'}}>
                    <Box>
                      <img src={html} alt="HTML" height={40}/>
                    </Box>
                    <Box>
                      <img src={css} alt="CSS" height={40}/>
                    </Box>
                    <Box>
                      <img src={js} alt="JS" height={40}/>
                    </Box>
                    <Box>
                      <img src={react} alt="React JS" height={40}/>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography component="span">Backend Skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{display:'flex',gap:{lg:10,md:10,sm:8,xs:5},justifyContent:'center'}}>
                    <Box>
                      <img src={node} alt="Node.js" height={40}/>
                    </Box>
                    <Box>
                      <img src={express} alt="Express.js" height={40}/>
                    </Box>
                    <Box>
                      <img src={mongodb} alt="MongoDB" height={40}/>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography component="span">Soft Skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{display:'flex',gap:{lg:8,md:8,sm:6,xs:3},justifyContent:'center'}}>
                    <Box>
                      <img src={communication} alt="Communication" height={50}/>
                    </Box>
                    <Box>
                      <img src={teamplayer} alt="Team Player" height={50}/>
                    </Box>
                    <Box>
                      <img src={problemsolving} alt="Problem Solving" height={50}/>
                    </Box>
                    <Box>
                      <img src={criticalthinking} alt="Critical Thinking" height={50}/>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
})
