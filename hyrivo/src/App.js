import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

export const App = () => {
  return (
    <Router>
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
      </Routes>
    </Router>
  )
}