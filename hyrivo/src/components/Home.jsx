import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Link, Menu, MenuItem, Typography } from '@mui/material'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { HomeOrgProfileCard } from '../Utils/HomeOrgProfileCard'
import { HomeProfileCard } from '../Utils/HomeProfileCard'
import { useNavigate } from 'react-router-dom'
import logo from '../Assets/Images/Hyrivo copy.png'
import { PuzzleList } from '../Utils/PuzzleList'
import { Posts } from './Posts'
import { ArrowDropDown, ArrowDropUp, Article, InsertPhoto, Movie } from '@mui/icons-material'

export const Home = () => {
  const {theme} = useThemeContext()
  const navigate = useNavigate()
  const [isCompany, setIsCompany] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [username, setUsername] = useState('')
  const [industry, setIndustry] = useState('')
  const [desc, setDesc] = useState('')
  const [dp, setDp] = useState('')

  // Menu in divider to sort
  const options = ['Top','Recent']
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Addpostbtn = () => {
    return (
      <>
        <style>{`  
        .blue-btn {
          width: 100%;
          height: 50px;
          margin: 15px;
          background: ${theme.primaryAccent};
          background: linear-gradient(
            90deg,
            ${theme.primaryAccent} 0%,
            ${theme.hoverAccent} 100%
          );
          color: white;
          border: none;
          border-radius: 0.625em;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .blue-btn:hover {
          color: rgb(0, 0, 0);
        }

        .blue-btn:after {
          content: "";
          background: white;
          position: absolute;
          z-index: -1;
          left: -20%;
          right: -20%;
          top: 0;
          bottom: 0;
          transform: skewX(-45deg) scale(0, 1);
          transition: all 0.5s;
        }

        .blue-btn:hover:after {
          transform: skewX(-45deg) scale(1, 1);
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
        }
        `}</style>
        <button class="blue-btn">Create Post</button>
      </>
    )
  }

  const handleViewUserPosts = () => {navigate('/UserPosts')}

  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
        const response = await axios.get('http://localhost:2000/user/me',{
          headers: {Authorization: `Bearer ${token}`}
        })

        const user = response.data.user
        const profile = response.data.profile
        setIsCompany(user.isCompany)
        setUsername(user.username)
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setCompanyName(profile.companyName)
        setIndustry(profile.industry)
        setDesc(profile.description)
        setDp(profile.currentDp)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {fetchUser()},[])
  return (
    <Box sx={{flexGrow:1, height:'100%', backgroundColor:theme.primaryBg, color: theme.primaryText}}>
      <Grid container>
          <Grid size={{lg:4, md:4, sm:5, xs:12}} sx={{display:{lg:'block', md: 'block', sm:'block', xs:'none'}}}>
              <Box>
                {isCompany ? <HomeOrgProfileCard theme={theme} companyName={companyName} industry={industry}
                handleView={handleViewUserPosts} desc={desc} dp={dp} username={username}/> : 
                <HomeProfileCard theme={theme} firstName={firstName} lastName={lastName} 
                username={username} handleView={handleViewUserPosts} desc={desc} dp={dp}/>}
              </Box>
              <Box sx={{display:{lg:'none', md:'none', sm:'block', xs:'none'},width: '80%',ml:4,mb:2}}>
                <PuzzleList/>
              </Box>
              <Box sx={{display:{lg:'none', md:'none', sm:'flex', xs:'none'},
              p:2, gap:1, alignItems: 'center', justifyContent:'center'}}>
                <Box>
                  <img src={logo} alt="Hyrivo" height='22px'/>
                </Box>
                <Box>
                  <Typography variant='span' sx={{color: theme.secondaryText}}>by Mike Davis &#169; 2025</Typography>
                </Box>
              </Box>
          </Grid>
          <Grid size={{lg:5,md:5,sm:7, xs:12}}>
              <Box sx={{flexGrow:1, pt:2}}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Card sx={{borderRadius:'15px', background: theme.cardBg, border:theme.cardBorder}}>
                      <CardContent>
                        <Box sx={{flexGrow:1}}>
                          <Grid container spacing={2} alignItems='center'>
                            <Grid size={{lg:1, md:2, sm:2, xs:2}}>
                              <Box>
                                {dp && dp.startsWith('https://') ? (
                                  <Avatar src={dp} alt={isCompany ? companyName :`${firstName} ${lastName}`} 
                                  sx={{width:50,height:50}}/>
                                ):(
                                  <Avatar sx={{background:'linear-gradient(135deg, #00BFFF, #1BC47D)',width:{lg:30,md:25,sm:25},height:{lg:30,md:25,sm:25},fontSize:{lg:17,md:13,sm:14}}}>
                                    {dp}
                                  </Avatar>
                                )}
                              </Box>
                            </Grid>
                            <Grid size={{lg:11, md:10, sm:10, xs:10}}>
                                <Box sx={{pr:2}}>
                                <Addpostbtn/>
                                </Box>
                            </Grid>
                            <Grid size={12}>
                                <Box sx={{flexGrow:1}}>
                                  <Grid container>
                                    <Grid size={4}>
                                      <Box sx={{display:'flex', justifyContent:'center'}}>
                                        <Button startIcon={<Movie/>} sx={{
                                          color: theme.primaryAccent,
                                          '&:hover':{color: theme.hoverAccent}
                                          }}>Video</Button>
                                      </Box>
                                    </Grid>
                                    <Grid size={4}>
                                      <Box>
                                      <Box sx={{display:'flex', justifyContent:'center'}}>
                                        <Button startIcon={<InsertPhoto/>} sx={{
                                            color: theme.primaryAccent,
                                            '&:hover':{color: theme.hoverAccent}
                                            }}>Photo</Button>
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid size={4}>
                                      <Box sx={{display:'flex', justifyContent:'center'}}>
                                        <Button startIcon={<Article/>} sx={{
                                            color: theme.primaryAccent,
                                            '&:hover':{color: theme.hoverAccent}
                                            }}>Article</Button>
                                        </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={12}>
                    <Divider sx={{
                      '&::before, &::after': {
                        borderColor: theme.secondaryText,
                      },
                    }} textAlign="right">
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='span' sx={{color: theme.secondaryText}}>Sort By:</Typography>
                        <Link component='button' onClick={handleClickListItem}
                        sx={{textDecoration:'none', fontWeight:'bolder', color:theme.primaryText}}
                        >{options[selectedIndex]}</Link>
                        {open ? <ArrowDropUp/> : <ArrowDropDown/>}
                      </Box>
                    </Divider>
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          'aria-labelledby': 'lock-button',
                          role: 'listbox',
                        },
                        paper:{
                          sx:{
                            background: theme.secondaryBg,
                            color: theme.primaryText
                          }
                        }
                      }}
                    >
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          sx={{
                            "&.Mui-selected": {
                                backgroundColor: theme.primaryAccent,
                                color: theme.primaryText,
                                "& .MuiListItemText-root": {
                                    color: theme.primaryBg,
                                },
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: theme.hoverAccent,
                                color:theme.primaryText
                            },
                            "&:hover": {
                                backgroundColor: theme.secondaryBg,
                                color:theme.hoverAccent
                            },
                        }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  <Grid size={12}>
                    <Posts/>
                  </Grid>
                </Grid>
              </Box>
          </Grid>
          <Grid size={12} sx={{display:{lg:'none', md: 'none', sm:'none', xs:'block'}}}>
            <Box sx={{display:{lg:'none', md:'none', sm:'none', xs:'flex'},
            p:2, gap:1, alignItems: 'center', justifyContent:'center'}}>
              <Box>
                <img src={logo} alt="Hyrivo" height='22px'/>
              </Box>
              <Box>
                <Typography variant='span' sx={{color: theme.secondaryText}}>by Mike Davis &#169; 2025</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={3} sx={{display:{lg:'block', md: 'block', sm:'none', xs:'none'},p:2}}>
              <PuzzleList/>
          </Grid>
      </Grid>
    </Box>
  )
}
