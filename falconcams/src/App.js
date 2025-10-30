import './App.css'
import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import { Profile } from './Components/Profile'
import { Camera } from './Components/Camera'
import { Parts } from './Components/Parts'
import { Service } from './Components/Service'
import { Cart } from './Components/Cart'
import { Wishlist } from './Components/Wishlist'
import { Checkout } from './Components/Checkout'

export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Camera' element={<Camera/>}/>
        <Route path='/Parts' element={<Parts/>}/>
        <Route path='/Service' element={<Service/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Wishlist' element={<Wishlist/>}/>
        <Route path='/Checkout' element={<Checkout/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
