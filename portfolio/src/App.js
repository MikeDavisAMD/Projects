import React, { useRef } from 'react'
import { Home } from './component/Home'
import { Navbar } from './component/Navbar'
import { Footer } from './component/Footer'

export const App = () => {
  const footerRef = useRef(null)
  return (
    <>
    <Navbar footerRef = {footerRef}/>
    <Home/>
    <Footer ref = {footerRef}/>
    </>
  )
}
