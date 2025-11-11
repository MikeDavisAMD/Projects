import { Box, Card, CardContent } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'

export const Comments = () => {
    const { theme } = useThemeContext()
    return (
        <Box sx={{ flexGrow: 1, py: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '95%', borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, }}>
                <CardContent>
                    Comment Section
                </CardContent>
            </Card>
        </Box>
    )
}
