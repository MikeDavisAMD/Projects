import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const RouteSecure = ({children}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const location = useLocation()

  const isPWResetPath = location.pathname === '/FPWVerification'
  const isChangePasswordPath = location.pathname === '/ChangePassword'

  return !token && !isPWResetPath && !isChangePasswordPath ? <Navigate to="/Login" replace /> : children
}