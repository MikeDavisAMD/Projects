import { CircularProgress, Skeleton } from '@mui/material'
import React from 'react'

export const Home = () => {
  return (
    <>
    <Skeleton variant="rectangular" width={210} height={60} /><br />
    <Skeleton variant="rounded" width={210} height={60} /><br />
    <Skeleton variant="rounded" width={210} height={60} /><br />
    <CircularProgress/>
    </>
  )
}
