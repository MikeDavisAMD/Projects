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
import tailwind from '../Assets/Logo/TailwindCSS.png'
import ts from '../Assets/Logo/typescript.png'
import mui from '../Assets/Logo/material-ui.png'
import shadcn from '../Assets/Logo/shadcn-ui-seeklogo.png'
import firestore from '../Assets/Logo/firestore.png'
import zod from '../Assets/Logo/zod.png'
import reactHookForm from '../Assets/Logo/react-hook-form.png'

export const Skills = React.forwardRef((props, ref) => {
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{ height: { lg: '100px', md: '100px', sm: '90px', xs: '70px' }, alignContent: 'center' }}>
          <Typography variant='h1'
            sx={{
              fontFamily: '"Special Gothic Expanded One", sans-serif', fontSize: { lg: '40px', md: '40px', sm: '40px', xs: '20px' },
              fontWeight: 400, fontStyle: 'normal', color: '#1A73E8', textAlign: 'center'
            }}>
            Skills
          </Typography>
        </Box>
      </Grid>
      <Grid size={12} sx={{ backgroundColor: '#F5F7FA' }}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={html} alt="HTML" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                HTML
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={css} alt="CSS" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                CSS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={js} alt="JavaScript" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector sx={{ height: '50px' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Java Script
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={ts} alt="JavaScript" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector sx={{ height: '50px' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'start' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Type Script
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={react} alt="React JS" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector sx={{ height: '50px' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                React JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={mui} alt="Material UI" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Material UI
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={shadcn} alt="shadcn ui" height={40} width={40} style={{ aspectRatio: 1 / 1, borderRadius: 5 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                ShadCN UI
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={tailwind} alt="Tailwind CSS" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Tailwind CSS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={node} alt="Node.js" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Node JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={express} alt="Express JS" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Express JS
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={mongodb} alt="Mongo DB" height={40} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Mongo DB
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={firestore} alt="firestore" height={50} width={50} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '23px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Firestore
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={zod} alt="Zod Valid" height={45} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2, display: 'flex', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                Zod Validation
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />
              <TimelineDot sx={{ p: 0, bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <img src={reactHookForm} alt="React-hook-form" height={45} width={40} style={{ aspectRatio: 1 / 1 }} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '22px', px: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Typography variant="h6" component="span"
                sx={{ fontFamily: '"Space Grotesk", sans-serif', fontOpticalSizing: 'auto', fontSize: { lg: 20, md: 20, sm: 15, xs: 12 } }}>
                React Hook Form
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    </Grid>
  )
})
