import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RouteSecure } from './components/SecureRoute'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Home } from './components/Home'
import './App.css'

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
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </Router>
  )
}
