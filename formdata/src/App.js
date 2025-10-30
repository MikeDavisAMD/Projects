import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { RouteSecure } from './components/RouteSecure'
import './App.css'
import { Home } from './components/Home'
import { Form } from './components/Form'
import { List } from './components/List'
import { Register } from './components/Register'
import { Profile } from './components/Profile'
import { FilledForm } from './components/FilledForm'


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Form' element={
          <RouteSecure>
            <Form/>
          </RouteSecure>
        }/>
        <Route path='/List' element={
          <RouteSecure>
            <List/>
          </RouteSecure>
        }/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Profile' element={
          <RouteSecure>
            <Profile/>
          </RouteSecure>
        }/>
        <Route path='/FilledForm' element={
          <RouteSecure>
            <FilledForm/>
          </RouteSecure>
        }
        />
      </Routes>
    </Router>
  )
}
