import React, { useRef } from 'react'
import './App.css'
import { Home } from './component/Home'
import { Navbar } from './component/Navbar'
import { Footer } from './component/Footer'
import { About } from './component/About'
import { Skills } from './component/Skills'
import { Education } from './component/Education'
import { Experience } from './component/Experience'
import { Projects } from './component/Projects'
import { Contact } from './component/Contact'
import ScrollToTop from 'react-scroll-to-top'
import { KeyboardDoubleArrowUp } from '@mui/icons-material'
 
export const App = () => {
  const AboutRef = useRef(null)
  const HomeRef = useRef(null)
  const EduRef = useRef(null)
  const SkillsRef = useRef(null)
  const ExpRef = useRef(null)
  const ProjectRef = useRef(null)
  const ContactRef = useRef(null)
  return (
    <>
    <Navbar 
    AboutRef = {AboutRef}
    HomeRef = {HomeRef}
    EduRef = {EduRef}
    SkillsRef = {SkillsRef}
    ExpRef = {ExpRef}
    ProjectRef = {ProjectRef}
    ContactRef = {ContactRef}/>
    <Home ref = {HomeRef}/>
    <About ref = {AboutRef}/>
    <Education ref = {EduRef}/>
    <Skills ref = {SkillsRef}/>
    <Experience ref = {ExpRef}/>
    <Projects ref = {ProjectRef}/>
    <Contact ref={ContactRef}/>
    <Footer/>
    <ScrollToTop smooth className='back2top'
    component={<KeyboardDoubleArrowUp/>}
    />
    </>
  )
}
