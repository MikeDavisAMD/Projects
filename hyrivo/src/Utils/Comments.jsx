import { Avatar, Box, ButtonBase, Card, CardContent, Grid, TextField } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'
import { ArrowUpward } from '@mui/icons-material'

export const Comments = ({ dp, users, profiles }) => {
    const TypeComment = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{lg:1,md:1,sm:1,xs:2}}>
                        <Box>
                            {dp && dp.startsWith('https://') ? (
                                <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                                    sx={{ width: 50, height: 50 }} />
                            ) : (
                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                    {dp}
                                </Avatar>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{lg:10,md:10,sm:10,xs:8}}>
                        <Box sx={{ pl: 2 }}>
                            <TextField variant='outlined' label='Add a comment...' fullWidth
                                sx={{
                                    "& .MuiInputBase-input": {
                                        height: 2,
                                        color: theme.primaryText, // input text color
                                        "&::placeholder": {
                                            color: theme.secondaryText, // placeholder color
                                            opacity: 1, // ensures custom color shows
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: theme.secondaryText, // default label color
                                        transform: "translateX(5%) translateY(6px)", // re-center label
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: theme.primaryAccent, // focused label color
                                        transform: "translateX(11%) translateY(-9px) scale(0.75)" // adjust when focused
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: theme.primaryAccent, // default border
                                            borderRadius: 10,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: theme.hoverAccent, // hover border
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.primaryAccent, // focus border
                                        },
                                    },
                                    '& label.Mui-focused': { //label on clicking
                                        color: theme.primaryAccent
                                    },
                                    '&:hover label:not(.Mui-focused)': {
                                        color: theme.primaryAccent
                                    },
                                    "& .MuiFormHelperText-root": {
                                        color: theme.secondaryText,
                                    },
                                }} />
                        </Box>
                    </Grid>
                    <Grid size={{lg:1,md:1,sm:1,xs:2}}>
                        <Box>
                            <ButtonBase sx={{
                                display: 'flex', color: theme.primaryText,
                                flexDirection: 'column', justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: theme.hoverAccent,
                                }
                            }}><ArrowUpward /></ButtonBase>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    const { theme } = useThemeContext()
    return (
        <Box sx={{ flexGrow: 1, py: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '95%', borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TypeComment />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
