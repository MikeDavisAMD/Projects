import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RouteSecure } from './components/SecureRoute'
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
import { Settings } from './components/Settings'

const AppContent = () => {

  const location = useLocation()

  const navbar = ['/','/JobsUser','/JobsOrg','/Connections','/Messages','/Notifications']
  const showNavbar = navbar.includes(location.pathname)
  
  return (
    <>
    {showNavbar && <Navbar/>}
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={
          <RouteSecure>
            <Home/>
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
        <Route path='/Settings' element={
          <RouteSecure>
            <Settings/>
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
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/oauthSuccess' element={<OAuthSuccess/>}/>
        <Route path='Enable2FA' element={<Enable2FA/>}/>
      </Routes>
    </>
  )
}

export const App = () => {
  return (
    <Router>
      <AppContent/>
    </Router>
  )
}