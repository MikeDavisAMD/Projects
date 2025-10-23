import { AppBar, Box, Button, ButtonBase, Card, CardContent, Divider, Grid, TextareaAutosize, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos, ArrowForwardIos, EditDocument, FormatBold, FormatColorText, FormatItalic, FormatListBulleted, FormatListNumbered, FormatUnderlined, NavigateNext, UploadFile } from '@mui/icons-material'

export const Article = () => {
    const { theme } = useThemeContext()
    const navigate = useNavigate()

    const BUTTONCONTENT = [
        { icon: <FormatBold />, title: 'Bold' },
        { icon: <FormatItalic />, title: 'Italic' },
        { icon: <FormatUnderlined />, title: 'Underlined' },
        { icon: <FormatColorText />, title: 'Change text color' },
        { icon: <FormatListBulleted />, title: 'Unordered List' },
        { icon: <FormatListNumbered />, title: 'Ordered List' }
    ]

    const UploadMedia = () => {
        return (
            <>
                <style>{`
                    .container {
                        height: 300px;
                        width: auto;
                        border-radius: 10px;
                        box-shadow: 4px 4px 30px ${theme.shadow};
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px;
                        gap: 5px;
                        background-color: ${theme.background};
                    }
            
                    .header {
                        flex: 1;
                        width: 100%;
                        border: 2px dashed ${theme.secondaryText};
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
            
                    .header p {
                        text-align: center;
                        color: ${theme.secondaryText};
                    }
            
                    .footer {
                        background-color: ${theme.cardBg};
                        width: 100%;
                        height: 40px;
                        padding: 8px;
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        color: ${theme.secondaryText};
                        border: none;
                    }
            
                    .footer svg {
                        height: auto;
                        fill: ${theme.secondaryText};
                        background-color: ${theme.cardBg};
                        border-radius: 50%;
                        padding: 12px;
                        cursor: pointer;
                        box-shadow: 0 2px 30px ${theme.shadow};
                    }
            
                    .footer p {
                        flex: 1;
                        text-align: center;
                    }
            
                    #file {
                        display: none;
                    }
                `}</style>

                <div class="container">
                    <div class="header">
                        <UploadFile sx={{ color: theme.secondaryText, height: 100, width: 100 }} /> <p>Browse File to upload!</p>
                    </div>
                    <label for="file" class="footer">
                        <p>Not selected file</p>
                    </label>
                    <input id="file" type="file" />
                </div>
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: theme.primaryBg, color: theme.primaryText }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <AppBar position='static' sx={{ backgroundColor: theme.background, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.cardBorder}`, color: theme.primaryText }}>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2} alignItems='center'>
                                    <Grid size={{ lg: 1, md: 2, sm: 2, xs: 3 }}>
                                        <Box sx={{ display: 'flex', gap: { lg: 2, md: 2, sm: 2, xs: 0 }, alignItems: 'center' }}>
                                            <ButtonBase onClick={() => navigate('/')} sx={{
                                                display: 'flex',
                                                flexDirection: 'column', justifyContent: 'flex-end',
                                                alignItems: 'center', pb: 0.5, px: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    color: theme.hoverAccent,
                                                }
                                            }}>
                                                <ArrowBackIos />
                                            </ButtonBase>
                                            <EditDocument sx={{
                                                height: { lg: '35px', md: '35px', sm: '32px', xs: '18px' },
                                                width: { lg: '35px', md: '35px', sm: '32px', xs: '18px' }
                                            }} />
                                        </Box>
                                    </Grid>
                                    <Grid size={{ lg: 10, md: 8, sm: 8, xs: 8 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component='span' sx={{ fontWeight: 'bolder', fontSize: { lg: '22px', md: '22px', sm: '20px', xs: '14px' } }}>
                                                Write or upload an article
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ lg: 1, md: 2, sm: 2 }}
                                        sx={{ display: { lg: 'block', md: 'block', sm: 'block', xs: 'none' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 2 }}>
                                            <Button variant='outlined'
                                                endIcon={<NavigateNext />}
                                                sx={{
                                                    color: theme.primaryAccent,
                                                    borderColor: theme.primaryAccent,
                                                    '&:hover': {
                                                        backgroundColor: theme.hoverAccent,
                                                        borderColor: theme.hoverAccent,
                                                        color: theme.primaryBg
                                                    }
                                                }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    next
                                                </Box></Button>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ lg: 1, md: 2, sm: 2, xs: 1 }}
                                        sx={{ display: { lg: 'none', md: 'none', sm: 'none', xs: 'block' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <ButtonBase sx={{
                                                display: 'flex',
                                                flexDirection: 'column', justifyContent: 'flex-end',
                                                alignItems: 'center', pb: 0.5,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    color: theme.hoverAccent,
                                                }
                                            }}>
                                                <ArrowForwardIos />
                                            </ButtonBase>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ borderRadius: '15px', background: theme.cardBg, border: theme.cardBorder }}>
                            <CardContent>
                                <Box sx={{ width: { lg: 800, md: 800, sm: 500, xs: 220 } }}>
                                    <UploadMedia />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Divider sx={{
                        fontSize: 20,
                        '&::before, &::after': {
                            borderColor: theme.secondaryText,
                        }, width: { lg: 850, md: 850, sm: 550, xs: 270 }
                    }} textAlign="center">
                        or
                    </Divider>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ borderRadius: '25px', background: theme.cardBg, border: theme.cardBorder }}>
                            <CardContent>
                                <Box sx={{ width: { lg: 800, md: 800, sm: 500, xs: 220 }, fontSize: { lg: 20, md: 20, sm: 18, xs: 15 }, }}>
                                    <TextField variant='outlined' fullWidth placeholder='Title'
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                color: theme.primaryText, // input text color
                                                fontSize: { lg: 40, md: 40, sm: 28, xs: 25 },
                                                "&::placeholder": {
                                                    color: theme.secondaryText, // placeholder color
                                                },
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: theme.secondaryText, // default label color
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: theme.primaryAccent, // focused label color
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: 'transparent', // default border
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: 'transparent', // hover border
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: 'transparent', // focus border
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
                                        }} /><br /><br />
                                    <TextareaAutosize placeholder='Write your content here'
                                        maxRows={15} minRows={5} style={{
                                            border: 'none', outline: 'none',
                                            background: 'transparent', resize: 'none', padding: '0 15px',
                                            width: '100%', color: theme.primaryText, font: 'inherit'
                                        }} />
                                    <Box sx={{display:'flex',justifyContent:'flex-end',gap:2,flexWrap:'wrap'}}>
                                        {BUTTONCONTENT.map((d, i) => (
                                            <Tooltip key={i} title={d.title} placement='top' arrow>
                                                <ButtonBase sx={{
                                                    display: 'flex', color: theme.primaryText,
                                                    flexDirection: 'column', justifyContent: 'flex-end',
                                                    alignItems: 'center', pb: 0.5, px: 1,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        color: theme.hoverAccent,
                                                    }
                                                }}>{d.icon}</ButtonBase>
                                            </Tooltip>
                                        ))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid><br />
            </Grid>
        </Box>
    )
}
