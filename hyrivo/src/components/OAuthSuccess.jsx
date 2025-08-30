import { Alert, AppBar, Box, Button, ButtonBase, CircularProgress, Grid, Modal, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { COLORS } from '../Utils/colors';
import { Save } from '@mui/icons-material';
import { AddUi } from '../Utils/AddUI';
import { UploadFileUi } from '../Utils/UploadFileUI';
import { AddSkills } from '../Utils/AddSkills'
import { AddExp } from '../Utils/AddExp'
import { AddEdu } from '../Utils/AddEdu'
import { AddCert } from '../Utils/AddCert'
import { AddProjects } from '../Utils/AddProjects'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:400,md:400,sm:300,xs:200},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [showConsent,setShowConsent] = useState(false)

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
  
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
  
    setOpen(false);
    };

    useEffect(() => {
      const checkUser = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
    
        if(!token) return navigate('/Login')

        localStorage.setItem('token',token)

        setLoading(true)
        try {
          const response = await axios.get('http://localhost:2000/user/me',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.data.isExistingUser) {
            setTimeout(() => {
              setShowConsent(true)
            }, 500);
          } else {
            setTimeout(() => {
              navigate('/')
            }, 500);
          }
        } catch (error) {
          setError(error.message)
          setOpen(true)
          navigate('/Login')
        } finally {
          setLoading(false)
        }
      }
      checkUser()
    }, [navigate]);

    // Skills 
    const [openSkills, setOpenSkills] = useState(false);
    const handleOpenSkills = () => setOpenSkills(true);
    const handleCloseSkills = () => setOpenSkills(false);

    // Experince
    const [openExp, setOpenExp] = useState(false);
    const handleOpenExp = () => setOpenExp(true);
    const handleCloseExp = () => setOpenExp(false);

    // Education
    const [openEdu, setOpenEdu] = useState(false);
    const handleOpenEdu = () => setOpenEdu(true);
    const handleCloseEdu = () => setOpenEdu(false);

    // License & Certifications
    const [openCert, setOpenCert] = useState(false);
    const handleOpenCert = () => setOpenCert(true);
    const handleCloseCert = () => setOpenCert(false);

    // Projects
    const [openProjects, setOpenProjects] = useState(false);
    const handleOpenProjects = () => setOpenProjects(true);
    const handleCloseProjects = () => setOpenProjects(false);

    const MODAL = [
      {name: 'Experience:', open: openExp, openModal: handleOpenExp, closeModal: handleCloseExp, component:<AddExp/> },
      {name: 'Education:', open: openEdu, openModal: handleOpenEdu, closeModal: handleCloseEdu, component: <AddEdu/>},
      {name: 'Licenses & Certifications:', open: openCert, openModal: handleOpenCert, closeModal: handleCloseCert, component: <AddCert/>},
      {name: 'Projects:', open: openProjects, openModal: handleOpenProjects, closeModal: handleCloseProjects, component: <AddProjects/>}
    ]
  
  return (
    <Box sx={{ height: '100vh' }}>
      {showConsent ? 
      <Box sx={{flexGrow: 1}}>
        <AppBar position='static' sx={{backgroundColor:COLORS.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${COLORS.cardBorder}`, color:COLORS.primaryText}}>
          <Toolbar>
            <Box sx={{flexGrow:1}}>
              <Grid container spacing={2} sx={{alignItems:'center'}}>
                <Grid size={{lg:6,md:6,sm:6,xs:9}}>
                  <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'30px',md:'25px',sm:'20px',xs:'18px'}}}>
                      Fill Details to continue
                  </Box>
                </Grid>
                <Grid size={{lg:6,md:6,sm:6,xs:3}}>
                  <Box sx={{display:{lg:'flex',md:'flex',sm:'flex',xs:'none'},justifyContent:'flex-end'}}>
                  <Button variant='outlined' size='large'
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} color="inherit"/>
                    ) : (
                      <Save/>
                    )
                  } 
                  sx={{
                      color:COLORS.primaryAccent,
                      borderColor:COLORS.primaryAccent,
                      '&:hover':{
                        backgroundColor:COLORS.hoverAccent,
                        borderColor:COLORS.hoverAccent,
                        color:COLORS.primaryBg
                      }
                    }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                       {loading ? 'Loading...' : 'Save'}
                      </Box></Button>
                  </Box>
                  <Box sx={{display:{lg:'none',md:'none',sm:'none',xs:'flex'},justifyContent:'flex-end',p:1}}>
                  <ButtonBase  
                  sx={{
                      borderRadius:2,
                      color:COLORS.primaryAccent,
                      borderColor:COLORS.primaryAccent,
                      backgroundColor:COLORS.primaryBg,
                      '&:hover':{
                        backgroundColor:COLORS.hoverAccent,
                        borderColor:COLORS.hoverAccent,
                        color:COLORS.primaryBg
                      }
                    }}>{loading ? <CircularProgress color='inherit'/> : <Save/>}</ButtonBase>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar><br />
        <Grid container spacing={2}>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Name:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='First Name' fullWidth/>
                <TextField variant='outlined' label='Last Name' fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Description:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter Your Short Description' rows={4} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  About:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter about yourself' rows={8} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Skills:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:5,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <AddUi onAdd={handleOpenSkills}/>
              </Box>
            </Box>
            <Modal
              open={openSkills}
              onClose={handleCloseSkills}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder'}}>
                  Add your relevant Skills
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddSkills/>
                </Typography>
              </Box>
            </Modal>
          </Grid>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            {MODAL.map((data) => (
              <Box sx={{p:1}}>
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                    {data.name}
                </Box>
                <br /><br />
                <Box sx={{display:'flex',justifyContent:'center',p:5,
                  border:`1px solid ${COLORS.cardBorder}`,
                  borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                    <AddUi onAdd={data.openModal}/>
                </Box>
                <Modal
                  open={data.open}
                  onClose={data.closeModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder'}}>
                      Add your {data.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {data.component}
                    </Typography>
                  </Box>
                </Modal>
              </Box>
            ))}
          </Grid>
          <Grid size={12}>
            <Box sx={{p:1, textAlign:'center'}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Upload Your Resume:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:10,
                border:`1px solid ${COLORS.cardBorder}`,
                borderRadius:2,backgroundColor:COLORS.secondaryBg, gap:2}}>
                <Box>
                 <UploadFileUi/>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> : <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
         <CircularProgress />
        </Box>}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' severity='error'
        sx={{
            backgroundColor: '#FF4D6D'
        }}>
            {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
