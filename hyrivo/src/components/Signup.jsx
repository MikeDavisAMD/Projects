import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Card, CardContent, FormControlLabel, Grid, IconButton, InputAdornment, Link, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SignupImg from '../Assets/Images/Signup.png'
import 'animate.css'

export const Signup = () => {
  const [showPw,setShowPw] = useState(false)

  return (
    <Grid container>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'end',md:'center',sm:'center',xs:'center'},alignItems:'center',height:'550px'}}>
          <Card className='animate__animated animate__fadeInTopLeft' sx={{width:{lg:'70%',md:'70%',sm:'95%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Welcome to</span> <span style={{fontStyle:'italic'}}>Hyrivo</span>
              </Typography>
              <Typography variant='body2' sx={{textAlign:'center',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#4F4F4F'}}>
                <span>Please Register to be a member</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
              <TextField variant='standard' label='Email' type='email' sx={{width:'80%',
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
                }}/> <br />
                <TextField variant='standard' label='Username' sx={{width:'80%',
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
                }}/> <br />
                <TextField variant='standard' label='Password' type={showPw ? 'text' : 'password'} sx={{width:'80%',
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
                }}
                /> <br />
                <TextField variant='standard' label='Confirm Password' type={showPw ? 'text' : 'password'} sx={{width:'80%',
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
                }}
                /> <br />
                <Box>
                  <FormControlLabel required control={<Switch size='small'/>} label={<span>Create Account as an Organization</span>}
                  sx={{
                    '& .MuiSwitch-switchBase':{
                      backgroundColor:'default',
                      '&:hover':{
                        color:'#FF6EC7'
                      }
                    },
                    '& .Mui-checked':{
                      color:'#00BFFF'
                    },
                    '& .Mui-checked + .MuiSwitch-track':{
                      backgroundColor:'#00BFFF'
                    }
                  }}/>
                </Box><br />
                <Button variant='outlined' size='large' sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>Register</Button> <br />
                <Typography variant='span' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'}}}>
                  Already have an account? <Link href="/Login" sx={{textDecoration:'none',color:'#00BFFF',
                    '&:hover':{color:'#FF6EC7'}
                  }}>Access Account</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopRight' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={SignupImg}
          height={{lg:'500px',md:'550px',sm:'400px'}}></Box>
        </Box>
      </Grid>
    </Grid>
  )
}
