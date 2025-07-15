import React from 'react'
import { Navigate } from 'react-router-dom'

export const RouteSecure = ({children}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return token ? children : <Navigate to="/Login" replace />
}