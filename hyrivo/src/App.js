import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RouteSecure } from './Utils/SecureRoute'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Home } from './components/Home'
import './App.css'
import { ForgotPassword } from './components/ForgotPassword'
import { OAuthSuccess } from './components/OAuthSuccess'
import { LoginValidation } from './components/LoginValidation'
import { FPWVerification } from './components/FPWVerification'
import { ChangePassword } from './components/ChangePassword'
import { Enable2FA } from './components/Enable2FA'
import { Navbar } from './components/Navbar'
import { JobsUser } from './components/JobsUser'
import { JobsOrg } from './components/JobsOrg'
import { Connections } from './components/Connections'
import { Messages } from './components/Messages'
import { Notifications } from './components/Notifications'
import { Profile } from './components/Profile'
import { Setting } from './components/Setting'
import { Detailsform } from './components/Detailsform'
import { ThemeProvider } from './Utils/ThemeContext'
import { Loading } from './components/Loading'
import { DetailsOrg } from './components/DetailsOrg'
import { ProfileOrg } from './components/ProfileOrg'
import { EditDP } from './Utils/EditDP'
import { ProfileCardWrapper } from './Utils/ProfileCardWrapper'
import { Puzzles } from './components/Puzzles'
import { UserPosts } from './components/UserPosts'
import { SudokuGame } from './Games/SudokuGame'
import { CrossWordGame } from './Games/CrossWordGame'
import { Game2048 } from './Games/Game2048'
import { MemoryMatchGame } from './Games/MemoryMatchGame'
import { MinesweeperGame } from './Games/MinesweeperGame'
import { WordSearchGame } from './Games/WordSearchGame'
import { MobileProfileCard } from './Utils/MobileProfileCard'

const AppContent = () => {

  const location = useLocation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);
    return clearTimeout(timer)
  }, [])

  if (loading) {
    <Loading/>
  }

  const navbar = ['/','/JobsUser','/JobsOrg','/Connections','/Messages','/Notifications']
  const showNavbar = navbar.includes(location.pathname)
  
  return (
    <>
    {showNavbar && <Navbar/>}
      <Routes>
        <Route path='/profile/v/:profileType/:username' element={<ProfileCardWrapper/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={
          <RouteSecure>
            <Home/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles' element={
          <RouteSecure>
            <Puzzles/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/Sudoku' element={
          <RouteSecure>
            <SudokuGame/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/Cross-Word' element={
          <RouteSecure>
            <CrossWordGame/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/Word-Search' element={
          <RouteSecure>
            <WordSearchGame/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/Minesweeper' element={
          <RouteSecure>
            <MinesweeperGame/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/Memory-Match' element={
          <RouteSecure>
            <MemoryMatchGame/>
          </RouteSecure>
        }/>
        <Route path='/Puzzles/2048' element={
          <RouteSecure>
            <Game2048/>
          </RouteSecure>
        }/>
        <Route path='/UserPosts' element={
          <RouteSecure>
            <UserPosts/>
          </RouteSecure>
        }/>
        <Route path='/JobsUser' element={
          <RouteSecure>
            <JobsUser/>
          </RouteSecure>
        }/>
        <Route path='/JobsOrg' element={
          <RouteSecure>
            <JobsOrg/>
          </RouteSecure>
        }/>
        <Route path='/Connections' element={
          <RouteSecure>
            <Connections/>
          </RouteSecure>
        }/>
        <Route path='/Messages' element={
          <RouteSecure>
            <Messages/>
          </RouteSecure>
        }/>
        <Route path='/Notifications' element={
          <RouteSecure>
            <Notifications/>
          </RouteSecure>
        }/>
        <Route path='/LoginValidation' element={
          <RouteSecure>
            <LoginValidation/>
          </RouteSecure>
        }/>
        <Route path='/Profile' element={
          <RouteSecure>
            <Profile/>
          </RouteSecure>
        }/>
        <Route path='/Profile/EditDP' element={
          <RouteSecure>
            <EditDP/>
          </RouteSecure>
        }/>
        <Route path='/ProfileOrg' element={
          <RouteSecure>
            <ProfileOrg/>
          </RouteSecure>
        }/>
        <Route path='/profile-card' element={
          <RouteSecure>
            <MobileProfileCard/>
          </RouteSecure>
        }/>
        <Route path='/Settings' element={
          <RouteSecure>
            <Setting/>
          </RouteSecure>
        }/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/FPWVerification' element={
          <RouteSecure>
            <FPWVerification/>
          </RouteSecure>
        }/>
        <Route path='/ChangePassword' element={
          <RouteSecure>
            <ChangePassword/>
          </RouteSecure>
        }/>
        <Route path='/Details' element={
          <RouteSecure>
            <Detailsform/>
          </RouteSecure>
        }/>
        <Route path='/DetailsOrg' element={
          <RouteSecure>
            <DetailsOrg/>
          </RouteSecure>
        }/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/oauthSuccess' element={<OAuthSuccess/>}/>
        <Route path='/Enable2FA' element={<Enable2FA/>}/>
      </Routes>
    </>
  )
}

export const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppContent/>
      </ThemeProvider>
    </Router>
  )
}