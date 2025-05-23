import { KeyboardDoubleArrowUp } from '@mui/icons-material'
import { Fab, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const BackToTop = () => {
    const [visible,setVisible]=useState(false)
    const toggleVisible = () => {
        setVisible(window.scrollY > 50)
    }
    const scrollToTop = () => {
        window.scrollTo({top:0,behavior:'smooth'})
    }
    useEffect(()=>{
        window.addEventListener('scroll',toggleVisible)
        return () => window.removeEventListener('scroll',toggleVisible)
    })
  return (
    <>
    <Zoom in={visible}>
        <Fab
            size='medium'
            onClick={scrollToTop}
            sx={{backgroundColor:'#34A853',position:'fixed',bottom:{lg:40,md:40,sm:30,xs:20},right:{lg:40,md:40,sm:30,xs:20},zIndex:1000,
            '&:hover':{backgroundColor:'#F9AB00'}}}
        >
            <KeyboardDoubleArrowUp/>
        </Fab>
    </Zoom>
    </>
  )
}
