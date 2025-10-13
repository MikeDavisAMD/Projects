import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { Alert, AppBar, Box, ButtonBase, Card, CardActions, CardContent, Chip, CircularProgress, Grid, Link, Modal, Snackbar, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { Add, ArrowBackIos, Done, Edit, Groups2, Language, LinkRounded, LocationCity, Mail, Person, Place, Smartphone } from '@mui/icons-material'
import axios from 'axios'
import { ProfilUIOrg } from '../Utils/ProfilUIOrg'
import { AddSpecialities } from '../Utils/AddSpecialities'
import foundedOn from '../Assets/icons/foundedOn.png'

export const ProfileOrg = () => {
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
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [dp, setDp] = useState('')
    const [username, setUsername] = useState('')
    const [accType, setAccType] = useState('')
    const [email,setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [location,setLocation] = useState('')
    const [about, setAbout] = useState('')
    const [industry, setIndustry] = useState('')
    const [founded, setFounded] = useState('')
    const [size, setSize] = useState('')
    const [hq,setHq] = useState('')
    const [website,setWebsite] = useState('')
    const [specialities, setSpecialities] = useState([])

    // Edit Details
    const [editMobile, setEditMobile] = useState('')
    const [editLocation, setEditLocation] = useState('')
    const [editFounded, setEditFounded] = useState('')
    const [editSize, setEditSize] = useState('')
    const [editHq, setEditHq] = useState('')
    const [editWebsite, setEditWebsite] = useState('')
    const [isEditDetails, setIsEditDetails] = useState(false)
  
    const handleSaveDetails = async () => {
      try {
        setLoading(true)
  
        await axios.put(`http://localhost:2000/profile/update/Org/details/${userId}`,{
          mobile: editMobile,
          location: editLocation,
          founded: editFounded,
          size: editSize,
          headquarters: editHq,
          website: editWebsite
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

    // Specialities
    const [openSpecialities, setOpenSpecialities] = useState(false);
    const handleOpenSpecialities = () => setOpenSpecialities(true);
    const handleCloseSpecialities = () => setOpenSpecialities(false);
    // Edit Skills
    const [prevSpecialities,setPrevSpecialities] = useState([])
    const [specialitiesChanged, setSpecialitiesChanged] = useState(false)
    const handleSaveSpecialities = async () => {
      try {
        setLoading(true)
  
        await axios.put(`http://localhost:2000/profile/update/specialities/${userId}`,{specialities},{
          headers:{Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
        })
  
        setSpecialitiesChanged(false)
        fetchUser()
      } catch (error) {
        setError("unable to update specialities")
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }

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
        setName(user.companyName)
        setIndustry(user.industry)
        setDesc(user.description)
        setUsername(users.username)
        setAccType(user.profileType)
        setEmail(users.email)
        setMobile(user.mobile)
        setLocation(user.location)
        setAbout(user.about)
        setFounded(user.founded)
        setSize(user.size)
        setHq(user.headquarters)
        setWebsite(user.website)
        setSpecialities(user.specialities)
        setPrevSpecialities(user.specialities)
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
      setEditFounded(founded || "")
      setEditSize(size || "")
      setEditHq(hq || "")
      setEditWebsite(website || "")
    },[mobile, location, about, founded, size, hq, website])

    // for enabling done button 
    useEffect(()=>{
      specialities.length !== prevSpecialities.length ? setSpecialitiesChanged(true) : setSpecialitiesChanged(false)
    },[specialities, prevSpecialities])

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
            <ProfilUIOrg dp={dp} name={name} desc={desc} username={username} industry={industry}
            theme={theme} setError={setError} setOpen={setOpen} userId={userId} fetchUser={fetchUser}/>
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
                  {specialitiesChanged && (
                    <ButtonBase onClick={handleSaveSpecialities} sx={{display:'flex',color: theme.primaryText,
                      flexDirection:'column',justifyContent:'flex-end',
                      alignItems:'center', pb:0.5, px:1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.hoverAccent,
                      }
                    }}>{loading ? <CircularProgress color="inherit"/> :<Done/>}</ButtonBase>)}
                  <ButtonBase onClick={handleOpenSpecialities} sx={{display:'flex',color: theme.primaryText,
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
                  <span style={{fontWeight:"bolder", color:theme.primaryText}}>Specialities of our company</span>
                </Typography>
                <Stack direction="row" spacing={1} sx={{display:'flex',flexWrap:'wrap',gap:1}}>
                  {specialities.map((s,i)=>(
                      <Chip key={i} label={s} 
                      sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Modal
              open={openSpecialities}
              onClose={handleCloseSpecialities}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" 
                sx={{fontWeight:'bolder',background:theme.primaryBg,color:theme.primaryText}}>
                  Add your relevant Skills
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddSpecialities specialities={specialities} setSpecialities={setSpecialities} handleCloseModal={handleCloseSpecialities}/>
                </Typography>
              </Box>
            </Modal>
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
                      <span style={{fontWeight:"bolder", color:theme.primaryText}}>Contact Info & Company Details</span>
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
                        '&:hover':{color:theme.hoverAccent},cursor: 'pointer'
                      }}>{`http://localhost:3000/profile/v/${accType}/${username}`}</Link>
                      </Box>
                      <Box>|</Box> 
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <img src={foundedOn} alt="FoundedOnIcon" height="25" width="25"/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={new Date(editFounded).getFullYear()}
                        onChange={e=>setEditFounded(e.target.value)} autoFocus
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
                                    width: `${Math.max(new Date(editFounded).getFullYear().length,4)}ch`
                                }
                            }
                        }}/> : <span>{new Date(founded).getFullYear()}</span>}
                      </Box> 
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Groups2/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={editSize}
                        onChange={e=>setEditSize(e.target.value)} autoFocus
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
                                    width: `${Math.max(editSize.length,4)}ch`
                                }
                            }
                        }}/> : <span>{size}</span>}
                      </Box> 
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <LocationCity/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={editHq}
                        onChange={e=>setEditHq(e.target.value)} autoFocus
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
                                    width: `${Math.max(editHq.length,4)}ch`
                                }
                            }
                        }}/> : <span>{hq}</span>}
                      </Box> 
                      <Box>|</Box>
                      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      <Language/>
                      :
                      {isEditDetails ? 
                      <TextField variant='standard' value={editWebsite}
                        onChange={e=>setEditWebsite(e.target.value)} autoFocus
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
                                    width: `${Math.max(editWebsite.length,4)}ch`
                                }
                            }
                        }}/> : <Link href={website} sx={{textDecoration:'none',color:theme.primaryAccent,
                          '&:hover':{color:theme.hoverAccent}
                        }}>{website}</Link>}
                      </Box> 
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
        </Grid>
        <br/>
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
