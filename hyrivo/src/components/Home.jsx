import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { HomeOrgProfileCard } from '../Utils/HomeOrgProfileCard'
import { HomeProfileCard } from '../Utils/HomeProfileCard'

export const Home = () => {
  const {theme} = useThemeContext()
  const [isCompany, setIsCompany] = useState(false)

  const fetchUser = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
        const response = await axios.get('http://localhost:2000/user/me',{
          headers: {Authorization: `Bearer ${token}`}
        })
        setIsCompany(response.data.isCompany)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {fetchUser()},[])
  return (
    <Box sx={{flexGrow:1, height:'100vh', backgroundColor:theme.primaryBg, color: theme.primaryText}}>
      <Grid container>
          <Grid size={3}>
              {isCompany ? <HomeOrgProfileCard/> : <HomeProfileCard/>}
          </Grid>
          <Grid size={6}>
              Home
          </Grid>
          <Grid size={3}>
              Home
          </Grid>
      </Grid>
    </Box>
  )
}
