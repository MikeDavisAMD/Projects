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

const AppContent = () => {

  const location = useLocation()

  const navbar = ['/']
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
        <Route path='/LoginValidation' element={
          <RouteSecure>
            <LoginValidation/>
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