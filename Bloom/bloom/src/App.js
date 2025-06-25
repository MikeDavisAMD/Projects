import React from 'react'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/About' element={<Home/>}/>
        <Route path='/Services' element={<Home/>}/>
        <Route path='/Portfolio' element={<Home/>}/>
        <Route path='/Contact' element={<Home/>}/>
      </Routes>
    </Router>
  )
}
