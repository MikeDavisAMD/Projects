import { Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, Collapse, Grid, Link, Portal, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useThemeContext } from './ThemeContext'
import { ArrowDropDown, ArrowDropUp, ArrowUpward, DeleteOutline, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material'
import axios from 'axios'

const NoComments = ({ theme }) => {
    return (
        <Box sx={{ flexGrow: 1, pt: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='body2' sx={{ color: theme.secondaryText }} fullWidth>No Comments</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const NoReply = ({ theme }) => {
    return (
        <Box sx={{ flexGrow: 1, pt: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='body2' sx={{ color: theme.secondaryText }} fullWidth>No Replies</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const Comment = ({ dp, users, profiles, theme, handleChange, handleClickReplyPortal, showReplyPortal, container, checkedReply,
    handleChangeReply, replyText, setReplyText, comment, handleLikeComment, handleDeleteComment }) => {
    return (
        <Box sx={{ flexGrow: 1, pt: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2} >
                                    <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {dp && dp.startsWith('https://') ? (
                                                <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                                                    sx={{ width: 35, height: 35 }} />
                                            ) : (
                                                <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                                    {dp}
                                                </Avatar>
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid size={{ lg: 11, md: 11, sm: 11, xs: 10 }}>
                                        <Box>
                                            <Typography variant='body2' sx={{ color: theme.primaryText, fontWeight: 900, fontSize: 13 }} fullWidth>{`${profiles.firstName} ${profiles.lastName}`}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 1, alignItems: 'center', p: 0 }}>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>{`@ ${users.username}`}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Typography variant='body2' sx={{ color: theme.primaryText, fontSize: { lg: 20, md: 20, sm: 15, xs: 15 } }} fullWidth>{comment.text}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ flexGrow: 1, display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                                <Grid container alignItems="center">
                                    <Grid size={{ lg: 8, md: 7 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>{comment.likes.length} likes</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>0 replies</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>1d</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ lg: 4, md: 5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                                            <Link component="button" onClick={handleChange} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    Reply
                                                </Box>
                                            </Link>
                                            <Link component="button" onClick={() => handleLikeComment(comment._id)} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {comment.likes.includes(users._id) ? (
                                                        <ThumbUpAlt sx={{ height: 15, width: 15 }} />
                                                    ) : (
                                                        <ThumbUpOffAlt sx={{ height: 15, width: 15 }} />
                                                    )}
                                                </Box>
                                            </Link>
                                            <Link component="button" onClick={() => handleDeleteComment(comment._id)} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <DeleteOutline sx={{ height: 15, width: 15 }} />
                                                </Box>
                                            </Link>
                                            <Link component="button" onClick={handleClickReplyPortal} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {showReplyPortal ? "Hide Replies" : "Show Replies"}
                                                    {showReplyPortal ? <ArrowDropUp /> : <ArrowDropDown />}
                                                </Box>
                                            </Link>
                                            {showReplyPortal ? (
                                                <Portal container={() => container.current}>
                                                    <CommentReply dp={dp} users={users} profiles={profiles} theme={theme}
                                                        handleChangeReply={handleChangeReply} />
                                                    <Collapse in={checkedReply}>
                                                        <TypeReply dp={dp} users={users} profiles={profiles} theme={theme}
                                                            replyText={replyText} setReplyText={setReplyText} />
                                                    </Collapse>
                                                </Portal>
                                            ) : null}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { lg: 'none', md: 'none', sm: 'block', xs: 'block' } }}>
                                <Grid container alignItems="center">
                                    <Grid size={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>{comment.likes.length} likes</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>0 replies</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                            <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>1d</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={6}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, pt: 2 }}>
                                            <Link component="button" onClick={handleChange} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    Reply
                                                </Box>
                                            </Link>
                                            <Link component="button" onClick={() => handleLikeComment(comment._id)} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {comment.likes.includes(users._id) ? (
                                                        <ThumbUpAlt sx={{ height: 15, width: 15 }} />
                                                    ) : (
                                                        <ThumbUpOffAlt sx={{ height: 15, width: 15 }} />
                                                    )}
                                                </Box>
                                            </Link>
                                            <Link component="button" onClick={() => handleDeleteComment(comment._id)} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <DeleteOutline sx={{ height: 15, width: 15 }} />
                                                </Box>
                                            </Link>
                                        </Box>
                                    </Grid>
                                    <Grid size={6}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                            <Link component="button" onClick={handleClickReplyPortal} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {showReplyPortal ? "Hide Replies" : "Show Replies"}
                                                    {showReplyPortal ? <ArrowDropUp /> : <ArrowDropDown />}
                                                </Box>
                                            </Link>
                                            {showReplyPortal ? (
                                                <Portal container={() => container.current}>
                                                    <CommentReply dp={dp} users={users} profiles={profiles} theme={theme}
                                                        handleChangeReply={handleChangeReply} />
                                                    <Collapse in={checkedReply}>
                                                        <TypeReply dp={dp} users={users} profiles={profiles} theme={theme} replyText={replyText} setReplyText={setReplyText} />
                                                    </Collapse>
                                                </Portal>
                                            ) : null}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const CommentReply = ({ dp, users, profiles, theme, handleChangeReply }) => {
    return (
        <Box sx={{ flexGrow: 1, pt: 2, pl: 4 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} >
                            <Grid size={{ lg: 1, md: 1, sm: 1, xs: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {dp && dp.startsWith('https://') ? (
                                        <Avatar src={dp} alt={users.isCompany ? profiles.companyName : `${profiles.firstName} ${profiles.lastName}`}
                                            sx={{ width: 35, height: 35 }} />
                                    ) : (
                                        <Avatar sx={{ background: `linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%)`, width: { lg: 30, md: 25, sm: 25 }, height: { lg: 30, md: 25, sm: 25 }, fontSize: { lg: 17, md: 13, sm: 14 } }}>
                                            {dp}
                                        </Avatar>
                                    )}
                                </Box>
                            </Grid>
                            <Grid size={{ lg: 11, md: 11, sm: 11, xs: 10 }}>
                                <Box>
                                    <Typography variant='body2' sx={{ color: theme.primaryText, fontWeight: 900, fontSize: 13 }} fullWidth>{`${profiles.firstName} ${profiles.lastName}`}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: 'center', p: 0 }}>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>{`@ ${users.username}`}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Box>
                        <Typography variant='body2' sx={{ color: theme.primaryText, fontSize: { lg: 20, md: 20, sm: 15, xs: 15 }, }} fullWidth>
                            <span style={{ color: theme.primaryAccent }}>@mainCommentUsername</span> This is the Reply
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container alignItems="center">
                            <Grid size={{ lg: 9, md: 9, sm: 9, xs: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>0 likes</Typography>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>0 replies</Typography>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>|</Typography>
                                    <Typography variant='body2' sx={{ color: theme.secondaryText, fontSize: 10 }} fullWidth>1d</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ lg: 3, md: 3, sm: 3, xs: 12 }}>
                                <Box sx={{
                                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2,
                                    pt: { lg: 0, md: 0, sm: 0, xs: 2 }
                                }}>
                                    <Link component="button" sx={{
                                        textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                        '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ThumbUpOffAlt sx={{ height: 15, width: 15 }} />
                                        </Box>
                                    </Link>
                                    <Link component="button" sx={{
                                        textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                        '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <DeleteOutline sx={{ height: 15, width: 15 }} />
                                        </Box>
                                    </Link>
                                    <Link component="button" onClick={handleChangeReply} sx={{
                                        textDecoration: 'none', color: theme.primaryAccent, fontSize: 12,
                                        '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                    }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            Reply
                                        </Box>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const TypeComment = ({ dp, users, profiles, theme, commentText, setCommentText, loading, handlePost }) => {
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
                        <TextField variant='standard' label='Add a comment...' fullWidth
                            value={commentText} onChange={(e) => setCommentText(e.target.value)}
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
                            <Button variant='contained' onClick={handlePost} sx={{
                                display: 'flex', color: 'black',
                                flexDirection: 'column', justifyContent: 'center',
                                alignItems: 'center', borderRadius: '50%', bgcolor: theme.primaryAccent,
                                height: 30, width: 30, minWidth: 0, padding: 0,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: theme.hoverAccent,
                                }
                            }}>{loading ? <CircularProgress size={20} color="inherit" /> : <ArrowUpward sx={{ width: 20, height: 20 }} />}</Button>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
const TypeReply = ({ dp, users, profiles, theme, replyText, setReplyText }) => {
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
                            value={replyText} onChange={(e) => setReplyText(e.target.value)}
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

export const Comments = ({ dp, users, profiles, postId }) => {
    // Comment states
    const [commentText, setCommentText] = useState('')
    const [replyText, setReplyText] = useState('')

    const [comments, setComments] = useState([])
    const [activeCommentId, setActiveCommentId] = useState(null)

    // Portal for comment
    const [showPortal, setShowPortal] = useState(false);
    const [showReplyPortal, setShowReplyPortal] = useState(false);
    const container = useRef(null);

    const handleClickPortal = () => {
        setShowPortal(!showPortal);
    };

    const handleClickReplyPortal = () => {
        setShowReplyPortal(!showReplyPortal);
    };

    // Collapse for Comment
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    // Collapse for Reply
    const [checkedReply, setCheckedReply] = useState(false);

    const handleChangeReply = () => {
        setCheckedReply((prev) => !prev);
    };

    // Comment handler
    const handleAddComment = async () => {
        if (!commentText.trim()) return

        setLoading(true)
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')

            await axios.post(`http://localhost:2000/comment/${postId}`, { text: commentText }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setCommentText('')
            fetchComments()
            setSuccess("Comment Added")
            setOpenSnackbar(true)
        } catch (error) {
            setError("Unable to Add Comment")
            setOpenSnackbar(true)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:2000/comment/${commentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
            })

            setComments(prev => prev.filter(c => c._id !== commentId))
            setSuccess("Comment Deleted Successfully")
            setOpenSnackbar(true)
        } catch (error) {
            setError("Unable to Delete Comment")
            setOpenSnackbar(true)
        }
    }

    const handleLikeComment = async (commentId) => {
        try {
            await axios.post(`http://localhost:2000/comment/like/${commentId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
            })

            setComments(prev => prev.map(c => c._id === commentId ? {
                ...c, likes: c.likes.includes(users._id) ? c.likes.filter(id => id !== users._id) : [...c.likes, users._id]
            } : c))
        } catch (error) {
            setError("Unable to Like Comment")
            setOpenSnackbar(true)
        }
    }

    // Reply for comment handler
    const handleAddReply = async () => {
        try {

        } catch (error) {
            setError("Unable to Add Reply to comment")
            setOpenSnackbar(true)
        }
    }

    const handleLikeReply = async () => {
        try {

        } catch (error) {
            setError("Unable to Like Reply")
            setOpenSnackbar(true)
        }
    }

    const handleDeleteReply = async () => {
        try {

        } catch (error) {
            setError("Unable to Delete Reply")
            setOpenSnackbar(true)
        }
    }

    // Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const fetchComments = useCallback(async () => {
        if (!postId) return

        try {
            const response = await axios.get(`http://localhost:2000/comment/${postId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
            })

            setComments(response.data.comments)
        } catch (error) {
            console.error("unable to fetch comments", error)
        }
    }, [postId])

    useEffect(() => { fetchComments() }, [fetchComments])

    const { theme } = useThemeContext()
    return (
        <Box sx={{ flexGrow: 1, py: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '95%', borderRadius: '8px', background: theme.cardBg, border: theme.cardBorder, }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TypeComment dp={dp} users={users} profiles={profiles} theme={theme}
                                    commentText={commentText} setCommentText={setCommentText} loading={loading}
                                    handlePost={handleAddComment} />
                            </Grid>
                            <Grid size={12}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ lg: 8, md: 8, sm: 6, xs: 6 }}>
                                            <Typography variant='span' sx={{ fontSize: { lg: 17, md: 17, sm: 13, xs: 12 }, color: theme.primaryText }}>
                                                {comments.length} Comments
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ lg: 4, md: 4, sm: 6, xs: 6 }} sx={{ display: 'flex', justifyContent: { lg: 'flex-end', md: 'flex-end', sm: 'flex-end', xs: 'center' } }}>
                                            <Link component="button" onClick={handleClickPortal} sx={{
                                                textDecoration: 'none', color: theme.primaryAccent, fontSize: { lg: 17, md: 17, sm: 13, xs: 12 },
                                                '&:hover': { color: theme.hoverAccent, textDecoration: 'underline' }
                                            }}><Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {showPortal ? "Show Less" : "Show More"}
                                                    {showPortal ? <ArrowDropUp /> : <ArrowDropDown />}
                                                </Box>
                                            </Link>
                                            {showPortal ? (
                                                <Portal container={() => container.current}>
                                                    {comments.length === 0 ? (
                                                        <NoComments theme={theme} />
                                                    ) : comments.map((comment) => (
                                                        <>
                                                            <Comment key={comment._id} comment={comment} dp={dp} users={users} profiles={profiles} theme={theme}
                                                                handleChange={handleChange} handleClickReplyPortal={handleClickReplyPortal}
                                                                showReplyPortal={showReplyPortal} container={container} checkedReply={checkedReply}
                                                                handleChangeReply={handleChangeReply} replyText={replyText} setReplyText={setReplyText}
                                                                handleLikeComment={handleLikeComment} handleDeleteComment={handleDeleteComment} />
                                                            <Collapse in={checked}>
                                                                <TypeReply dp={dp} users={users} profiles={profiles} theme={theme}
                                                                    replyText={replyText} setReplyText={setReplyText} />
                                                            </Collapse>
                                                        </>
                                                    ))}
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
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} variant='filled' severity={error ? 'error' : 'success'}
                    sx={{
                        backgroundColor: error ? theme.error : theme.success
                    }}>
                    {error || success}
                </Alert>
            </Snackbar>
        </Box>
    )
}