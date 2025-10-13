import { Alert, AppBar, Box, Button, ButtonBase, Card, CardActions, CardContent, Chip, CircularProgress, Divider, FormControl, FormControlLabel, Grid, Link, Modal, Radio, RadioGroup, Snackbar, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add, ArrowBackIos, Delete, Done, Download, Edit, LinkRounded, Mail, Person, Place, Preview, Save, Smartphone } from '@mui/icons-material'
import { useThemeContext } from '../Utils/ThemeContext'
import { ProfileUI } from '../Utils/ProfileUI'
import axios from 'axios'
import { AddSkills } from '../Utils/AddSkills'
import { ListEdu } from '../Utils/ListEdu'
import { ListExp } from '../Utils/ListExp'
import { ListProjects } from '../Utils/ListProjects'
import { ListCert } from '../Utils/ListCert'
import { AddExp } from '../Utils/AddExp'
import { EditExp } from '../Utils/EditExp'
import { UploadFileUi } from '../Utils/UploadFileUI'
import { saveAs } from 'file-saver'
import { AddEdu } from '../Utils/AddEdu'
import { AddProjects } from '../Utils/AddProjects'
import { AddCert } from '../Utils/AddCert'
import { EditEdu } from '../Utils/EditEdu'
import { EditProjects } from '../Utils/EditProjects'
import { EditCert } from '../Utils/EditCert'

export const Profile = () => {
  const {theme} = useThemeContext()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg:400,md:400,sm:300,xs:200},
    bgcolor: theme.primaryBg,
    border: `2px solid ${theme.cardBorder}` ,
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  const navigate = useNavigate()

  const [dp,setDp] = useState('')
  const [userId, setUserId] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [location, setLocation] = useState('')
  const [desc, setDesc] = useState('')
  const [about, setAbout] = useState('')
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [accType, setAccType] = useState('')
  const [skills, setSkills] = useState([])
  const [exp,setExp] = useState([])
  const [edu,setEdu] = useState([])
  const [projects,setProjects] = useState([])
  const [cert,setCert] = useState([])
  const [resumeLink, setResumeLink] = useState([])

  // Snackbar
  const [open,setOpen] = useState(false)
  const [error,setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }

  setOpen(false);
  };

  // Edit Details
  const [editMobile, setEditMobile] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [isEditDetails, setIsEditDetails] = useState(false)

  const handleSaveDetails = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/update/details/${userId}`,{
        mobile: editMobile,
        location: editLocation
      },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setIsEditDetails(false)
      fetchUser()
    } catch (error) {
      setError("Failed to edit details",error.message)
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Edit About
  const [editAbout, setEditAbout] = useState('')
  const [isEditAbout, setIsEditAbout] = useState(false)

  const handleSaveAbout = async () => {
    try {
      setLoading(true)
      
      await axios.put(`http://localhost:2000/profile/update/about/${userId}`,{about: editAbout},{
        headers:{ Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
      })

      setIsEditAbout(false)
      fetchUser()
    } catch (error) {
      setError("Cannot update about")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Skills 
  const [openSkills, setOpenSkills] = useState(false);
  const handleOpenSkills = () => setOpenSkills(true);
  const handleCloseSkills = () => setOpenSkills(false);
  // Edit Skills
  const [prevSkills,setPrevSkills] = useState([])
  const [skillsChanged, setSkillsChanged] = useState(false)
  const handleSaveSkills = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/update/skills/${userId}`,{skills},{
        headers:{Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setSkillsChanged(false)
      fetchUser()
    } catch (error) {
      setError("unable to update skills")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Experince
  const [openExp, setOpenExp] = useState(false);
  const handleOpenExp = () => setOpenExp(true);
  const handleCloseExp = () => setOpenExp(false);
  // Add Experience
  const [prevExp, setPrevExp] = useState([])
  const [addedExp, setAddedExp] = useState(false)
  const handleAddExp = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/add/new/experience/${userId}`,{experience: exp},{
        headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setAddedExp(false)
      fetchUser()
    } catch (error) {
      setError('Unable to add new experience')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
  // Edit Experience
  const [openEditExp, setOpenEditExp] = useState(false)
  const handleOpenEditExp = () => setOpenEditExp(true);
  const handleCloseEditExp = () => setOpenEditExp(false);

  // Education
  const [openEdu, setOpenEdu] = useState(false);
  const handleOpenEdu = () => setOpenEdu(true);
  const handleCloseEdu = () => setOpenEdu(false);
  // Add Education
  const [prevEdu, setPrevEdu] = useState([])
  const [addedEdu, setAddedEdu] = useState(false)
  const handleAddEdu = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/add/new/education/${userId}`,{education: edu},{
        headers: {Authorization:`Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setAddedEdu(false)
      fetchUser()
    } catch (error) {
      setError("Unable to add education")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
  // Edit education details
  const [openEditEdu, setOpenEditEdu] = useState(false);
  const handleOpenEditEdu = () => setOpenEditEdu(true);
  const handleCloseEditEdu = () => setOpenEditEdu(false);

  // License & Certifications
  const [openCert, setOpenCert] = useState(false);
  const handleOpenCert = () => setOpenCert(true);
  const handleCloseCert = () => setOpenCert(false);
  // Add License & certificates
  const [prevCert, setPrevCert] = useState([])
  const [addedCert, setAddedCert] = useState(false)
  const handleAddCert = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/add/new/certificates/${userId}`,{certificates: cert},{
        headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setAddedCert(false)
      fetchUser()
    } catch (error) {
      setError("Unable to add Certificates & licenses")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
  // Edit License & Certifications
  const [openEditCert, setOpenEditCert] = useState(false);
  const handleOpenEditCert = () => setOpenEditCert(true);
  const handleCloseEditCert = () => setOpenEditCert(false);

  // Projects
  const [openProjects, setOpenProjects] = useState(false);
  const handleOpenProjects = () => setOpenProjects(true);
  const handleCloseProjects = () => setOpenProjects(false);
  // Add projects
  const [prevProjects, setPrevProjects] = useState([])
  const [addedProjects, setAddedProjects] = useState(false)
  const handleAddProjects = async () => {
    try {
      setLoading(true)

      await axios.put(`http://localhost:2000/profile/add/new/projects/${userId}`,{projects},{
        headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
      })

      setAddedProjects(false)
      fetchUser()
    } catch (error) {
      setError("Unable to add new project")
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }
  // edit Projects
  const [openEditProjects, setOpenEditProjects] = useState(false);
  const handleOpenEditProjects = () => setOpenEditProjects(true);
  const handleCloseEditProjects = () => setOpenEditProjects(false);

  // Resume
  const [openResume, setOpenResume] = useState(false);
  const handleOpenResume = () => setOpenResume(true);
  const handleCloseResume = () => setOpenResume(false);

  // selected resume for default resume
  const [selectedResume, setSelectedResume] = useState("");

  // new resume adding
  const [resume, setResume] = useState('')

  const handleAddResume = async () => {
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

        if (uploadedResume) {
          const res = await axios.post("http://localhost:2000/profile/resume",uploadedResume,{
            headers: {Authorization: `Bearer ${token}`}
          })
          setResumeLink(prev => [...prev,res.data])
        }
        
        await fetchUser()
        handleCloseResume()
    } catch (error) {
      !token ? setError("Invalid Token or Token Expired") : setError('Something went wrong')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  // Download Resume
  const handleDownloadResume = async () => {
    const resume = resumeLink.find(r => r.public_id === selectedResume)
    if (!resume) {
      setError("Resume not found")
      setOpen(true)
      return
    }

    const url = resume.url
    const fileName = resume.fileName

    try {
      const response = await fetch(url)
      const blob = await response.blob()
      saveAs(blob, fileName)
    } catch (error) {
      setError("Failed to download resume")
      setOpen(true)
    }
  }

  // Preview resume
  const handlePreviewResume = () => {
    const resume = resumeLink.find(r => r.public_id === selectedResume)
    if (!resume) {
      setError("Cannot Open Resume")
      setOpen(true)
      return
    }
    window.open(resume.url,"_blank")
  }

  // Delete Resume
  const handleDeleteResume = async () => {
    if (!selectedResume) {
      setError("No resume found")
      setOpen(true)
      return
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
      await axios.delete(`http://localhost:2000/profile/delete/resume/${encodeURIComponent(selectedResume)}`,{
        headers: {Authorization: `Bearer ${token}`}
      })

      setResumeLink(prev => prev.filter(r => r.public_id !== selectedResume))

      if (resumeLink.length > 1) {
        const newSelected = resumeLink.find(r => r.public_id !== selectedResume)?.public_id
        setSelectedResume(newSelected || "")
      } else {
        setSelectedResume("")
      }
    } catch (error) {
      setError("Failed to resume resume")
      setOpen(true)
    } 
  }

  // Fetches user details
  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return
    try {
      const response = await axios.get('http://localhost:2000/user/me',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const user = response.data.profile
      const users = response.data.user
      setUserId(user.userId)
      setDp(user.currentDp)
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setMobile(user.mobile)
      setLocation(user.location)
      setDesc(user.description)
      setAbout(user.about)
      setEmail(users.email)
      setUsername(users.username)
      setAccType(user.profileType)
      setSkills(user.skills)
      setPrevSkills(user.skills)
      setExp(user.experience)
      setPrevExp(user.experience)
      setEdu(user.education)
      setPrevEdu(user.education)
      setCert(user.certificates)
      setPrevCert(user.certificates)
      setProjects(user.projects)
      setPrevProjects(user.projects)
      setResumeLink(user.resumes)
    } catch (error) {
      setError(error.message)
      setOpen(true)
    }
  }

  // to get details of users
  useEffect(() => {
    fetchUser()
    setEditMobile(mobile || "")
    setEditLocation(location || "")
    setEditAbout(about || "")
  },[mobile, location, about])

  // for enabling done button and setting selected resume
  useEffect(()=>
  {
    skills.length !== prevSkills.length ? setSkillsChanged(true) : setSkillsChanged(false)
    exp.length !== prevExp.length ? setAddedExp(true) : setAddedExp(false)
    edu.length !== prevEdu.length ? setAddedEdu(true) : setAddedEdu(false)
    cert.length !== prevCert.length ? setAddedCert(true) : setAddedCert(false)
    projects.length !== prevProjects.length ? setAddedProjects(true) : setAddedProjects(false)
    if (resumeLink.length > 0) {
      setSelectedResume(resumeLink[0].public_id);
    }
  },
  [skills, prevSkills, exp, prevExp, edu, prevEdu, cert, prevCert, projects, prevProjects, resumeLink])

  return (
    <Box sx={{flexGrow: 1, minHeight: '100vh', background:theme.primaryBg, color: theme.primaryText}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <AppBar position='static' sx={{backgroundColor:theme.background,backdropFilter:'blur(10px)',borderBottom:`1px solid ${theme.cardBorder}`, color:theme.primaryText}}>
            <Toolbar>
              <Grid container sx={{alignItems:'center'}}>
                <Grid size={4}>
                  <Box>
                    <ButtonBase onClick={()=>navigate('/')} sx={{display:'flex',
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.hoverAccent,
                    }
                  }}>
                      <ArrowBackIos/>
                    </ButtonBase>
                  </Box>
                </Grid>
                <Grid size={8}>
                    <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                        <Person sx={{
                          height:{lg:'35px',md:'35px',sm:'32px'},
                          width:{lg:'35px',md:'35px',sm:'32px'}}}/>
                        <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                            My
                        </Box>
                        <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'22px',md:'22px',sm:'20px'}}}>
                            Account
                        </Box>
                    </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={12}>
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <ProfileUI dp={dp} name={`${firstname} ${lastname}`} desc={desc} username={username} 
            theme={theme} setError={setError} setOpen={setOpen} userId={userId} fetchUser={fetchUser}/>
          </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
              <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
                <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    <ButtonBase onClick={() => isEditDetails ? handleSaveDetails() : setIsEditDetails(true)} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}>{isEditDetails ? loading ? <CircularProgress size={24} color="inherit"/> : <Done/> : <Edit/>}</ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      <span style={{fontWeight:"bolder", color:theme.primaryText}}>Personal Details</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.secondaryText }}>
                    <Box sx={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:2}}>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Mail/>
                      :
                      <span>{email}</span>
                      </Box>
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Smartphone/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={editMobile}
                        onChange={e=>setEditMobile(e.target.value)} autoFocus
                        sx={{
                            '& .MuiInputBase-input': {
                                color: theme.primaryText,
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: theme.cardBorder,
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: theme.primaryAccent,
                            },
                            }}
                        slotProps={{
                            input: {
                                style: {
                                    width: `${Math.max(editMobile.length,4)}ch`
                                }
                            }
                        }}/> : <span>{mobile}</span>}
                      </Box> 
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Place/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={editLocation}
                      onChange={e=>setEditLocation(e.target.value)} autoFocus
                      sx={{
                          '& .MuiInputBase-input': {
                              color: theme.primaryText,
                          },
                          '& .MuiInput-underline:before': {
                              borderBottomColor: theme.cardBorder,
                          },
                          '& .MuiInput-underline:after': {
                              borderBottomColor: theme.primaryAccent,
                          },
                          }}
                      slotProps={{
                          input: {
                              style: {
                                  width: `${Math.max(editLocation.length,4)}ch`
                              }
                          }
                      }}/> : <span>{location}</span>}
                      </Box> 
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <LinkRounded/>
                      :
                      <Link href={`/profile/v/${accType}/${username}`} target="_blank" rel="noopener noreferrer" 
                        sx={{textDecoration:'none',color:theme.primaryAccent,
                        '&:hover':{color:theme.hoverAccent}}}>
                          {`http://localhost:3000/profile/v/${accType}/${username}`}
                      </Link>
                      </Box> 
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'}, borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                  <ButtonBase onClick={() => isEditAbout ? handleSaveAbout() : setIsEditAbout(true)} 
                  sx={{display:'flex',color: theme.primaryText,
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.hoverAccent,
                    }
                  }}>{isEditAbout ? loading ? <CircularProgress size={24} color="inherit"/> : <Done/> : <Edit/>}</ButtonBase>
              </CardActions>
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <span style={{fontWeight:"bolder", color:theme.primaryText}}>About</span>
              </Typography>
              <Typography variant="body2" sx={{ color: theme.secondaryText }}>
                {isEditAbout ? 
                <Box sx={{display:'flex', flexWrap:'wrap', width:'100%'}}>
                  <TextField variant='standard' value={editAbout}
                onChange={e=>setEditAbout(e.target.value)} autoFocus multiline fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.primaryText,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.cardBorder,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.primaryAccent,
                    },
                    }}/>
                </Box> : <span>{about}</span>}
              </Typography>
              </CardContent>
            </Card>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    {skillsChanged && (
                      <ButtonBase onClick={handleSaveSkills} sx={{display:'flex',color: theme.primaryText,
                        flexDirection:'column',justifyContent:'flex-end',
                        alignItems:'center', pb:0.5, px:1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>)}
                    <ButtonBase onClick={handleOpenSkills} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Skills</span>
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{display:'flex',flexWrap:'wrap',gap:1}}>
                    {skills.map((s,i)=>(
                        <Chip key={i} label={s} 
                        sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <Modal
                open={openSkills}
                onClose={handleCloseSkills}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" 
                  sx={{fontWeight:'bolder',background:theme.primaryBg,color:theme.primaryText}}>
                    Add your relevant Skills
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddSkills skills={skills} setSkills={setSkills} handleCloseModal={handleCloseSkills}/>
                  </Typography>
                </Box>
              </Modal>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    {addedExp && (
                      <ButtonBase onClick={handleAddExp} sx={{display:'flex',color: theme.primaryText,
                        flexDirection:'column',justifyContent:'flex-end',
                        alignItems:'center', pb:0.5, px:1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>)}
                    <ButtonBase onClick={handleOpenExp} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                    <ButtonBase onClick={handleOpenEditExp} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Edit/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Experience</span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ListExp experience={exp}/>
                  </Typography>
                </CardContent>
              </Card>
              <Modal
                open={openExp}
                onClose={handleCloseExp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder', color:theme.primaryText}}>
                    Add experience details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddExp experience={exp} setExperience={setExp} handleCloseModal={handleCloseExp} skills={skills}/>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openEditExp}
                onClose={handleCloseEditExp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder', color:theme.primaryText}}>
                    Edit experience details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EditExp experience={exp} setExperience={setExp} handleCloseModal={handleCloseEditExp} skills={skills}/>
                  </Typography>
                </Box>
              </Modal>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    {addedEdu && (
                      <ButtonBase onClick={handleAddEdu} sx={{display:'flex',color: theme.primaryText,
                        flexDirection:'column',justifyContent:'flex-end',
                        alignItems:'center', pb:0.5, px:1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>)}
                    <ButtonBase onClick={handleOpenEdu} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                    <ButtonBase onClick={handleOpenEditEdu} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Edit/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Education</span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ListEdu education={edu}/>
                  </Typography>
                </CardContent>
              </Card>
              <Modal
                open={openEdu}
                onClose={handleCloseEdu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Add Education details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddEdu education={edu} setEducation={setEdu} handleCloseModal={handleCloseEdu}/>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openEditEdu}
                onClose={handleCloseEditEdu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Edit Education details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EditEdu education={edu} setEducation={setEdu} handleCloseModal={handleCloseEditEdu}/>
                  </Typography>
                </Box>
              </Modal>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    {addedProjects && (
                      <ButtonBase onClick={handleAddProjects} sx={{display:'flex',color: theme.primaryText,
                        flexDirection:'column',justifyContent:'flex-end',
                        alignItems:'center', pb:0.5, px:1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>
                    )}
                    <ButtonBase onClick={handleOpenProjects} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                    <ButtonBase onClick={handleOpenEditProjects} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Edit/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Projects</span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ListProjects projects={projects}/>
                  </Typography>
                </CardContent>
              </Card>
              <Modal
                open={openProjects}
                onClose={handleCloseProjects}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Add more projects
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddProjects projects={projects} setProjects={setProjects} handleCloseModal={handleCloseProjects}
                    skills={skills} college={edu.map(c => c.institute)} work={exp.map(w => w.company)}/>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openEditProjects}
                onClose={handleCloseEditProjects}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Edit project details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EditProjects projects={projects} setProjects={setProjects} handleCloseModal={handleCloseEditProjects}
                    skills={skills} college={edu.map(c => c.institute)} work={exp.map(w => w.company)}/>
                  </Typography>
                </Box>
              </Modal>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    {addedCert && (
                      <ButtonBase onClick={handleAddCert} sx={{display:'flex',color: theme.primaryText,
                        flexDirection:'column',justifyContent:'flex-end',
                        alignItems:'center', pb:0.5, px:1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.hoverAccent,
                        }
                      }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>
                    )}
                    <ButtonBase onClick={handleOpenCert} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                    <ButtonBase onClick={handleOpenEditCert} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Edit/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Certifications & Licenses</span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ListCert certificates={cert}/>
                  </Typography>
                </CardContent>
              </Card>
              <Modal
                open={openCert}
                onClose={handleCloseCert}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Add More Certificates or License
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <AddCert certificates={cert} setCertificates={setCert} handleCloseModal={handleCloseCert} skills={skills}/>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openEditCert}
                onClose={handleCloseEditCert}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Edit Certificates or License details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EditCert certificates={cert} setCertificates={setCert} handleCloseModal={handleCloseEditCert} skills={skills}/>
                  </Typography>
                </Box>
              </Modal>
            </Box>
        </Grid>
        <Grid size={12}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:{xs:'center'},gap:2}}>
            <Card sx={{width:{lg:'82%',md:'82%',sm:'82%',xs:'90%'},borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
              <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
                    <ButtonBase onClick={handlePreviewResume} sx={{display:'flex',color: theme.primaryText, 
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Preview/></ButtonBase>
                    <ButtonBase onClick={handleDownloadResume} sx={{display:'flex',color: theme.primaryText, 
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Download/></ButtonBase>
                    <ButtonBase onClick={handleOpenResume} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Add/></ButtonBase>
                    <ButtonBase onClick={handleDeleteResume} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}><Delete/></ButtonBase>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:"bolder", color:theme.primaryText}}>Resumes</span>
                  </Typography>
                  <FormControl sx={{ml:4}}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={selectedResume}
                      onChange={e => setSelectedResume(e.target.value)}
                      name="radio-buttons-group"
                    >
                      {resumeLink.map((res,index)=>(
                         <FormControlLabel sx={{color: theme.primaryText}}
                         key={index || res._id} value={res.public_id} control={<Radio/>} label={res.fileName} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Modal
                open={openResume}
                onClose={handleCloseResume}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder',color:theme.primaryText}}>
                    Add additional resumes
                  </Typography><br />
                  <Divider color={theme.secondaryText}/><br /><br />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <UploadFileUi setResume={f => setResume(f)}/>
                  </Typography><br />
                  <Divider color={theme.secondaryText}/><br />
                  <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'}}}>
                  <Button variant='outlined' size='large' onClick={handleAddResume}
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
                          {loading? "Loading..." :"save"}
                        </Box></Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
        </Grid> 
        <br />
      </Grid>
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
