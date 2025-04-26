import { CircularProgress, Skeleton, Box, Grid } from '@mui/material'
import React from 'react'

export const Home = () => {
  return (
    <>
    <Skeleton variant="rectangular" width={210} height={60} /><br />
    <Skeleton variant="rounded" width={210} height={60} /><br />
    <Skeleton variant="rounded" width={210} height={60} /><br />
    <CircularProgress/>
    <Box sx={{height:{lg:'200px',md:'100px',sm:'150px',xs:'600px'},background:'linear-gradient(to bottom,#07BCFD,#190098)'}}>
        <Grid container>
            <Grid size={{lg:4,md:4,sm:6,xs:12}}>
                
            </Grid>
        </Grid>
    </Box>
    </>
  )
}
