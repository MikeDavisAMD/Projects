import { Avatar, Box, Button, ButtonBase, Card, CardContent, Collapse, Grid, Link, Portal, TextField, Tooltip, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useThemeContext } from './ThemeContext'
import { ArrowDropDown, ArrowDropUp, ArrowUpward, ThumbUpOffAlt } from '@mui/icons-material'

export const Comments = ({ dp, users, profiles }) => {
    // Portal for comment
    const [showPortal, setShowPortal] = useState(false);
    const container = useRef(null);

    const handleClickPortal = () => {
        setShowPortal(!showPortal);
    };

    // Collapse for Reply
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const CommentReply = () => {
        return (
            <Box sx={{ flexGrow: 1, pt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {dp && dp.startsWith('https://') ? (
                                <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                                    sx={{ width: 30, height: 30 }} />
                            ) : (
                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                    {dp}
                                </Avatar>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 10, md: 10, sm: 10, xs: 8 }}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Box>
                                    <Typography variant='body2' sx={{ color: theme.primaryText }} fullWidth>This is the Comment</Typography>
                                </Box>
                            </Grid>
                            <Grid size={12}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container alignItems="center">
                                        <Grid size={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 12 }} fullWidth>0 likes | 0 replies</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={3}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Link component="button" onClick={handleChange} sx={{
                                                    textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                    '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                                }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        Reply
                                                    </Box>
                                                </Link>
                                            </Box>
                                        </Grid>
                                        <Grid size={3}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                                <Link component="button" sx={{
                                                    textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                    '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                                }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        Show Replies
                                                        <ArrowDropDown />
                                                    </Box>
                                                </Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                        <Tooltip title="Like">
                            <ButtonBase sx={{
                                display: 'flex', color: theme.primaryText,
                                flexDirection: 'column', justifyContent: 'flex-end',
                                alignItems: 'center', pb: 0.5, px: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: theme.hoverAccent,
                                }
                            }}><ThumbUpOffAlt /></ButtonBase>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    const TypeComment = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
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
                    <Grid size={{ lg: 10, md: 10, sm: 10, xs: 8 }}>
                        <Box sx={{ pl: 2, pr: 1 }}>
                            <TextField variant='standard' label='Add a comment...' fullWidth multiline maxRows={10}
                                sx={{
                                    // label color
                                    '& .MuiInputLabel-root': {
                                        color: theme.secondaryText,
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: theme.primaryAccent,
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: theme.primaryAccent,
                                    },

                                    // input text color
                                    '& .MuiInputBase-input': {
                                        color: theme.secondaryText,
                                    },

                                    // underline color
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: theme.primaryAccent,
                                    },
                                    '& .MuiInput-underline:hover:before': {
                                        borderBottomColor: theme.hoverAccent,
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: theme.primaryAccent,
                                    },
                                }} />
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                        <Tooltip title="Post Comment">
                            <Button variant='contained' sx={{
                                display: 'flex', color: 'black',
                                flexDirection: 'column', justifyContent: 'center',
                                alignItems: 'center', borderRadius: '50%', bgcolor: theme.primaryAccent,
                                height: 50, width: 50, minWidth: 0, padding: 0,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: theme.hoverAccent,
                                }
                            }}><ArrowUpward sx={{ width: 30, height: 30 }} /></Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    const TypeReply = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container alignItems="center">
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2.5 }}>
                            {dp && dp.startsWith('https://') ? (
                                <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                                    sx={{ width: 30, height: 30 }} />
                            ) : (
                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                    {dp}
                                </Avatar>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 10, md: 10, sm: 10, xs: 8 }}>
                        <Box sx={{ pl: 2, pr: 2 }}>
                            <TextField variant='standard' label='Reply to comment...' fullWidth
                                sx={{
                                    // label color
                                    '& .MuiInputLabel-root': {
                                        color: theme.secondaryText,
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: theme.primaryAccent,
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: theme.primaryAccent,
                                    },

                                    // input text color
                                    '& .MuiInputBase-input': {
                                        color: theme.secondaryText,
                                    },

                                    // underline color
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: theme.primaryAccent,
                                    },
                                    '& .MuiInput-underline:hover:before': {
                                        borderBottomColor: theme.hoverAccent,
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: theme.primaryAccent,
                                    },
                                }} />
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                        <Box sx={{ pt: 2.5 }}>
                            <Tooltip title="Post Reply">
                                <Button variant='contained' sx={{
                                    display: 'flex', color: 'black',
                                    flexDirection: 'column', justifyContent: 'center',
                                    alignItems: 'center', borderRadius: '50%', bgcolor: theme.primaryAccent,
                                    height: 30, width: 30, minWidth: 0, padding: 0,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: theme.hoverAccent,
                                    }
                                }}><ArrowUpward sx={{ width: 20, height: 20 }} /></Button>
                            </Tooltip>
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
                            <Grid size={12}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ lg: 8 }}>
                                            <Typography variant='span' sx={{ fontSize: { lg: '18px', md: '18px', sm: '13px', xs: '12px' }, color: theme.primaryText }}>
                                                0 Comments
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ lg: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link component="button" onClick={handleClickPortal} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {showPortal ? "Show Less" : "Show More"}
                                                    {showPortal ? <ArrowDropUp /> : <ArrowDropDown />}
                                                </Box>
                                            </Link>
                                            {showPortal ? (
                                                <Portal container={() => container.current}>
                                                    <CommentReply />
                                                    <Collapse in={checked}><TypeReply /></Collapse>
                                                </Portal>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    <Grid size={12} ref={container} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
