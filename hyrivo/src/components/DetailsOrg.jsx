import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Alert, AppBar, Box, Button, ButtonBase, CircularProgress, Grid, Modal, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import { AddUi } from '../Utils/AddUI';
import { Save } from '@mui/icons-material';
import { AddSpecialities } from '../Utils/AddSpecialities';

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

export const DetailsOrg = () => {
    const navigate = useNavigate();
        const [loading,setLoading] = useState(false)
        const [showConsent,setShowConsent] = useState(false)
    
        // getting profile details
        const [companyName, setCompanyName] = useState('')
        const [mobile, setMobile] = useState('')
        const [location, setLocation] = useState('')
        const [description, setDescription] = useState('')
        const [about, setAbout] = useState('')
        const [industry,setIndustry] = useState('')
        const [founded,setFounded] = useState('')
        const [size,setSize] = useState('')
        const [website,setWebsite] = useState('')
        const [headquarters,setHeadquarters] = useState('')
        const [Specialities, setSpeciatities] = useState([])
    
        const handleSave = async () => {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token')
          if (!token) return navigate('/')
          setLoading(true)
    
          try {    
            await axios.post("http://localhost:2000/profile/",{
              companyName,
              industry,
              mobile,
              location,
              about,
              description,
              founded,
              size,
              website,
              headquarters,
              specialities: Specialities
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
        const [openSpecialities, setOpenSpecialities] = useState(false);
        const handleOpenSpecialities = () => setOpenSpecialities(true);
        const handleCloseSpecialities = () => setOpenSpecialities(false);
    
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
                  Company Name:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Company Name' value={companyName} 
                onChange={e => setCompanyName(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Mobile:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Mobile number with code eg. +184353453' value={mobile} 
                onChange={e => setMobile(e.target.value)} fullWidth/>
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
                rows={4} multiline fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  About:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Enter about your company' 
                value={about} onChange={e => setAbout(e.target.value)}
                rows={8} multiline fullWidth/>
              </Box>
            </Box>
          </Grid>
          <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Industry:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Industry type e.g. IT, Multimedia, etc.' value={industry} 
                onChange={e => setIndustry(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Founded:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Founded on year' value={founded} 
                onChange={e => setFounded(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Size:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Company Size in range e.g. 100-200' value={size} 
                onChange={e => setSize(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Website:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Company Website' value={website} 
                onChange={e => setWebsite(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Headquarters: 
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Company Headquarters Location' value={headquarters} 
                onChange={e => setHeadquarters(e.target.value)} fullWidth/>
              </Box>
            </Box>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Office Location:
              </Box>
              <br /><br />
              <Box sx={{display:'flex', gap:2}}>
                <TextField variant='outlined' label='Location' value={location} 
                onChange={e => setLocation(e.target.value)} fullWidth/>
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box sx={{p:1}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:'25px',md:'20px',sm:'18px',xs:'15px'}}}>
                  Specialities:
              </Box>
              <br /><br />
              <Box sx={{display:'flex',justifyContent:'center',p:10,
                border:`1px solid ${theme.cardBorder}`,
                borderRadius:2,backgroundColor:theme.secondaryBg, gap:2}}>
                <AddUi onAdd={handleOpenSpecialities}/>
              </Box>
            </Box>
            <Modal
              open={openSpecialities}
              onClose={handleCloseSpecialities}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bolder'}}>
                  Add your relevant Specialities
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <AddSpecialities specialities={Specialities} setSpecialities={setSpeciatities} handleCloseModal={handleCloseSpecialities}/>
                </Typography>
              </Box>
            </Modal>
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
