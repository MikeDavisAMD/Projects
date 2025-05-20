import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './component/Home'
import { Navbar } from './component/Navbar'

export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}
