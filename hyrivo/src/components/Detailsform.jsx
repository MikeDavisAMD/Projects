import { Alert, AppBar, Box, Button, ButtonBase, CircularProgress, Grid, Modal, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Save } from '@mui/icons-material'
import { AddUi } from '../Utils/AddUI'
import { AddSkills } from '../Utils/AddSkills'
import { UploadFileUi } from '../Utils/UploadFileUI'
import { useNavigate } from 'react-router-dom'
import { AddExp } from '../Utils/AddExp'
import { AddEdu } from '../Utils/AddEdu'
import { AddCert } from '../Utils/AddCert'
import { AddProjects } from '../Utils/AddProjects'
import { useThemeContext } from '../Utils/ThemeContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:400,md:400,sm:300,xs:200},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto'
};

export const Detailsform = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [showConsent,setShowConsent] = useState(false)

    // getting profile details
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [about, setAbout] = useState('')
    const [skills, setSkills] = useState([])
    const [experience, setExperience] = useState([])
    const [education, setEducation] = useState([])
    const [certificates, setCertificates] = useState([])
    const [projects, setProjects] = useState([])
    const [resume, setResume] = useState(null)

    const handleSave = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) return navigate('/')
      setLoading(true)

      try {
        let uploadedResume = null

        if (resume?.file) {
          const formData = new FormData()
          formData.append("file", resume.file)

          const uploadRes = await axios.post("http://localhost:2000/profile/upload/resume",formData,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          })

          uploadedResume = {
            url: uploadRes.data.url,
            public_id: uploadRes.data.public_id,
            fileName: resume.file.name,
            uploadedAt: new Date()
          }
        }

        await axios.post("http://localhost:2000/profile/",{
          firstName,
          lastName,
          mobile,
          location,
          description,
          about,
          skills,
          experience,
          education,
          certificates,
          projects,
          resumes: uploadedResume ? [uploadedResume] : []
        },{
          headers: {Authorization: `Bearer ${token}`}
        })
        navigate('/')
      } catch (error) {
        !token ? setError("Invalid Token or Token Expired") : setError('Something went wrong')
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }

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
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
        if(!token) return navigate('/Login')

        setLoading(true)
        try {
          const response = await axios.get('http://localhost:2000/user/me',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.data.user.isExistingUser) {
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
      {name: 'Skills:', open: openSkills, openModal: handleOpenSkills, closeModal: handleCloseSkills,
        component:<AddSkills skills={skills} setSkills={setSkills} handleCloseModal={handleCloseSkills}/>
      },
      {name: 'Experience:', open: openExp, openModal: handleOpenExp, closeModal: handleCloseExp, 
        component:<AddExp experience={experience} setExperience={setExperience} 
        handleCloseModal={handleCloseExp} skills={skills}/> },
      {name: 'Education:', open: openEdu, openModal: handleOpenEdu, closeModal: handleCloseEdu, 
        component: <AddEdu education={education} setEducation={setEducation} handleCloseModal={handleCloseEdu}/>},
      {name: 'Licenses & Certifications:', open: openCert, openModal: handleOpenCert, closeModal: handleCloseCert, 
        component: <AddCert certificates={certificates} setCertificates={setCertificates} 
        handleCloseModal={handleCloseCert} skills={skills}/>},
      {name: 'Projects:', open: openProjects, openModal: handleOpenProjects, closeModal: handleCloseProjects, 
        component: <AddProjects projects={projects} setProjects={setProjects} 
        handleCloseModal={handleCloseProjects} skills={skills} 
        college={education.map(c => c.institute)} work={experience.map(w => w.company)}/>}
    ]

    const {theme} = useThemeContext()

  return (
    <Box sx={{ height: '100vh' }}>
      {showConsent ? 
      <Box sx={{flexGrow: 1}}>
        <AppBar position='static' sx={{backgroundColor:theme.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${theme.cardBorder}`, color:theme.primaryText}}>
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
                  <Button variant='outlined' size='large' onClick={handleSave}
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} color="inherit"/>
                    ) : (
                      <Save/>
                    )
                  } 
                  sx={{
                      color:theme.primaryAccent,
                      borderColor:theme.primaryAccent,
                      '&:hover':{
                        backgroundColor:theme.hoverAccent,
                        borderColor:theme.hoverAccent,
                        color:theme.primaryBg
                      }
                    }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                        {loading ? 'Loading...' : 'Save'}
                      </Box></Button>
                  </Box>
                  <Box sx={{display:{lg:'none',md:'none',sm:'none',xs:'flex'},justifyContent:'flex-end',p:1}}>
                  <ButtonBase  
                  sx={{
                      borderRadius:2,
                      color:theme.primaryAccent,
                      borderColor:theme.primaryAccent,
                      backgroundColor:theme.primaryBg,
                      '&:hover':{
                        backgroundColor:theme.hoverAccent,
                        borderColor:theme.hoverAccent,
                        color:theme.primaryBg
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
                <TextField variant='outlined' label='First Name' value={firstName} 
                onChange={e => setFirstname(e.target.value)} fullWidth/>
                <TextField variant='outlined' label='Last Name' value={lastName} 
                onChange={e => setLastName(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Mobile:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter mobile with code eg: +971234567' value={mobile} 
                onChange={e => setMobile(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Location:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Location in format city, state, country' value={location} 
                onChange={e => setLocation(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Description:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter Your Short Description' 
                value={description} onChange={e => setDescription(e.target.value)}
                rows={6} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  About:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter about yourself' 
                value={about} onChange={e => setAbout(e.target.value)}
                rows={12} multiline fullWidth/>
              </Box>
            </Box>
          </Grid>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            {MODAL.map((data) => (
              <Box sx={{p:1}}>
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                    {data.name}
                </Box>
                <br /><br />
                <Box sx={{display:'flex',justifyContent:'center',p:5,
                  border:`1px solid ${theme.cardBorder}`,
                  borderRadius:2,backgroundColor:theme.secondaryBg, gap:2}}>
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
                border:`1px solid ${theme.cardBorder}`,
                borderRadius:2,backgroundColor:theme.secondaryBg, gap:2}}>
                <Box>
                  <UploadFileUi setResume={f => setResume(f)}/>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> : <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
          <CircularProgress />
        </Box>}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant='filled' severity='error' 
        sx={{
            backgroundColor: '#FF4D6D'
        }}>
            {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
