import React, { createContext, useContext, useEffect, useState } from 'react'
import { COLORS, DARKCOLORS } from './colors'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [themeMode,setThemeMode] = useState(localStorage.getItem('theme') || "Always Off")

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")

    const isDark = themeMode === "Always On" || (themeMode === "Device Settings" && prefersDark.matches)

    const theme = isDark ? DARKCOLORS : COLORS

    useEffect(()=>{
        localStorage.setItem('theme',themeMode)
    },[themeMode])

    useEffect(()=>{
        const handler = (e) => {
            if (themeMode === "Device Settings") {
                setThemeMode("Device Settings")
            }
        }
        prefersDark.addEventListener("change",handler)
        return () => prefersDark.removeEventListener("change",handler) 
    },[themeMode, prefersDark])
  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)