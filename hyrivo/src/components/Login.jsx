import { Box, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import 'animate.css'
import LoginImg from '../Assets/Images/Login.png'
import Google from '../Assets/Images/google.png'

export const Login = () => {
  const [showPw,setShowPw] = useState(false)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  return (
    <Grid container>
      <Grid size={{lg:6,md:6,sm:6}} sx={{display:{lg:'block',md:'block',sm:'block',xs:'none'}}}>
        <Box className='animate__animated animate__fadeInTopLeft' sx={{display:'flex',justifyContent:'end',alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px'}}}>
          <Box component='img' src={LoginImg}
          height={{lg:'500px',md:'550px',sm:'400px'}}></Box>
        </Box>
      </Grid>
      <Grid size={{lg:6,md:6,sm:6,xs:12}}>
        <Box sx={{display:'flex',justifyContent:{lg:'start',md:'start',sm:'center',xs:'center'},alignItems:'center',height:{lg:'550px',md:'550px',sm:'500px',xs:'500px'}}}>
          <Card className='animate__animated animate__fadeInTopRight' sx={{width:{lg:'70%',md:'80%',sm:'80%',xs:'90%'},boxShadow:'5px 5px 10px grey'}}>
            <CardContent>
              <Typography variant='body2' sx={{textAlign:'center',fontWeight:'bold',fontSize:{lg:'40px',md:'40px',sm:'30px',xs:'30px'},color:'#1A1A1A'}}>
                <span>Welcome to</span> <span style={{fontStyle:'italic'}}>Hyrivo</span>
              </Typography>
              <Typography variant='body2' sx={{textAlign:'center',fontSize:{lg:'18px',md:'18px',sm:'15px',xs:'15px'},color:'#4F4F4F'}}>
                <span>Please Login to Your Account</span>
              </Typography><br />
              <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <TextField variant='standard' label='Username' value={username} onClick={(e)=>setUsername(e.target.value)}
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
                }}/> <br />
                <TextField variant='standard' label='Password' type={showPw ? 'text' : 'password'} 
                value={password} onClick={(e)=>setPassword(e.target.value)} sx={{width:'80%',
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
                  <FormControlLabel control={<Checkbox />} label={<span>Remember Me</span>} />
                </Box><br />
                <Button variant='outlined' size='large' 
                
                sx={{
                  color:'#00BFFF',
                  borderColor:'#00BFFF',
                  '&:hover':{
                    backgroundColor:'#FF6EC7',
                    borderColor:'#FF6EC7',
                    color:'#fff'
                  }
                }}>Login</Button> <br />
                <Typography variant='span' sx={{fontSize:{lg:'18px',md:'18px',sm:'13px',xs:'12px'}}}>
                  Doesn't have an account? <Link href="/Signup" sx={{textDecoration:'none',color:'#00BFFF',
                    '&:hover':{color:'#FF6EC7'}
                  }}>Create an Account</Link>
                </Typography>                
              </Box><br />
              <Divider><span>or</span></Divider><br />
              <Box sx={{display:'flex',justifyContent:'center'}}>
                  <Button variant='outlined' sx={{borderRadius:'20px',
                    color:'#00BFFF',
                    borderColor:'#00BFFF',
                    '&:hover':{
                      backgroundColor:'#FF6EC7',
                      borderColor:'#FF6EC7',
                      color:'#fff'
                    }
                  }}><Box component='img' src={Google} alt='Google' height='20px' sx={{mr:1}}></Box> 
                  Sign In with Google</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
