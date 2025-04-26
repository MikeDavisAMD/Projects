import './App.css'
import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'

export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
