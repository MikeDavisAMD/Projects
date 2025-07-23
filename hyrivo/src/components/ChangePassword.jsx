import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import forgotpw from '../Assets/Images/forgotpw.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const ChangePassword = () => {
  const [showPw,setShowPw] = useState(false)
  const [showCPw,setShowCPw] = useState(false)
  return (
    <Grid container sx={{minHeight:'100vh',alignItems:'center'}}>
      <Grid size={{lg:6,md:6,sm:6,xs:12}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'end',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={forgotpw}
          height={{lg:'400px',md:'350px',sm:'250px'}}></Box>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'start',md:'start',sm:'center',xs:'center'},alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px',xs:'500px'}}}>
          <Card className='animate__animated animate__fadeInTopRight' sx={{width:{lg:'70%',md:'80%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Forgot Password?</span>
              </Typography>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#828282'}}>
              <span>Change password for username</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',width:'100%'}}>
              <TextField variant='standard' label='Enter new Password' type={showPw ? 'text' : 'password'}
                sx={{width:'80%',
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                  },
                  '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                  },
                  '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                  },
                  '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                  }
                }}
                slotProps={{
                  input:{
                    endAdornment:(
                      <InputAdornment position='end'>
                        <IconButton onClick={()=>setShowPw((prev)=>!prev)}>
                          {showPw ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}/> <br />
                <TextField variant='standard' label='Confirm new Password' type={showCPw ? 'text' : 'password'}
                sx={{width:'80%',
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':{ //underline on hovering
                    borderBottomColor:'#FF6EC7'
                  },
                  '& .MuiInput-underline:after':{ //underline on clicking
                    borderBottomColor:'#00BFFF'
                  },
                  '& label.Mui-focused':{ //label on clicking
                    color:'#00BFFF'
                  },
                  '&:hover label:not(.Mui-focused)':{
                    color:'#FF6EC7'
                  }
                }}
                slotProps={{
                  input:{
                    endAdornment:(
                      <InputAdornment position='end'>
                        <IconButton onClick={()=>setShowCPw((prev)=>!prev)}>
                          {showCPw ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}/> <br />
                <Button variant='outlined' size='large' 
                sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>Change Password</Button> <br /> 
              </Box> <br />           
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
