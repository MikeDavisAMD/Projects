import { Box, Grid, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem ,{ timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import hm from '../Assets/Logo/HM.png'
import rooks from '../Assets/Logo/rooks.png'
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:400,md:400,sm:400,xs:300},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Experience = React.forwardRef((props,ref) => {
  const [openHM, setOpenHM] = useState(false);
  const [openRB, setOpenRB] = useState(false);
  const handleOpenHM = () => setOpenHM(true);
  const handleOpenRB = () => setOpenRB(true);
  const handleCloseHM = () => setOpenHM(false);
  const handleCloseRB = () => setOpenRB(false);
  
  return (
    <Grid container ref={ref}>
      <Grid size={12}>
        <Box sx={{height:{lg:'100px',md:'100px',sm:'90px',xs:'70px'},alignContent:'center'}}>
          <Typography variant='h1' 
          sx={{fontFamily:'"Special Gothic Expanded One", sans-serif',fontSize:{lg:'40px',md:'40px',sm:'40px',xs:'20px'},
          fontWeight:400,fontStyle:'normal',color:'#1A73E8',textAlign:'center'}}>
            Work Experience
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{p:2,backgroundColor:'#F5F7FA'}}>
        <Timeline position="left"
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
          },
        }}>
          <TimelineItem>
            <TimelineSeparator >
              <TimelineConnector sx={{backgroundColor:'#F9AB00'}}/>
              <TimelineDot sx={{backgroundColor:'#34A853'}}>
                <IconButton sx={{p:0}} onClick={handleOpenHM}>
                  <img src={hm} alt="Happiestminds Technologies" style={{borderRadius:'10px',height:'30px'}}/>
                </IconButton>
              </TimelineDot>
              <TimelineConnector sx={{backgroundColor:'#F9AB00'}}/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="body1" sx={{fontSize:{lg:'22px',md:'22px'}}} component="span">
              HAPPIEST MINDS TECHNOLOGIES LIMITED, BANGALORE, KARNATAKA-560100. <br />
              <i style={{opacity:0.5}}>Engineer, Cloud and Infrastructure (CIS)</i> <br />
              <i style={{opacity:0.5}}>Infrastructure Management and Security Service (IMSS),</i> <br />
              <i style={{opacity:0.5}}>(2022 - 2024)</i>
              </Typography>
              <Typography sx={{opacity:0.3}}>Click logo to see roles and responsibilties</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{backgroundColor:'#F9AB00'}}/>
              <TimelineDot sx={{backgroundColor:'#34A853'}}>
                <IconButton sx={{p:0}} onClick={handleOpenRB}>
                  <img src={rooks} alt="Rooks & Brooks Technologies" style={{borderRadius:'10px',height:'30px',width:'30px'}}/>
                </IconButton>
              </TimelineDot>
              <TimelineConnector sx={{backgroundColor:'#F9AB00'}}/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="body1" sx={{fontSize:{lg:'22px',md:'22px'}}} component="span">
                ROOKS AND BROOKS PVT. LTD., NAGERCOIL, TAMILNADU, 629004. <br />
                <i style={{opacity:0.5}}>Research Analyst</i> <br />
                <i style={{opacity:0.5}}>(2024 - 2025)</i>
              </Typography>
              <Typography sx={{opacity:0.3}}>Click logo to see roles and responsibilties</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Modal
          sx={{overflow:'scroll'}}
          open={openHM}
          onClose={handleCloseHM}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Roles and Responsibilities
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            I contributed to Project 1: Smilesinfra (Oct 2022 – Dec 2023) by configuring VMs, installing Linux/Windows OS, managing resources via vCenter, and handling user access through Active Directory. I ensured OS setups met project needs and maintained system performance.
            <br />
            For Project 2: Mylan (Jan 2023 – Sept 2023), I managed server patching by backing up servers, placing them in Maintenance Mode, checking for failures, re-triggering failed backups, and validating successful completion—all within defined downtime windows.
            </Typography>
          </Box>
        </Modal>
          <Modal
            open={openRB}
            onClose={handleCloseRB}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Roles and Responsibilities
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Coordinated the proposal submission process for research papers 
              within designated timelines, while establishing a structured workflow outlining the 
              development, review, and completion stages of each paper.
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Grid>
    </Grid>
  )
})
