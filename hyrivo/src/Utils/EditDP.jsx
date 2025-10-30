import { Alert, AppBar, Box, Button, ButtonBase, Card, CardActionArea, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Link, Modal, Slide, Snackbar, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext'
import axios from 'axios'
import { Close, Edit, Save } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ImageEditor } from './ImageEditor'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const uploadImage = (image, theme, handleUploadDP, selectedFilename, selectedFile) => {
    return (
        <>
            <style>{`
            .custum-file-upload {
                height: 200px;
                width: auto;
                display: flex;
                flex-direction: column;
                align-items: space-between;
                gap: 20px;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                border: 2px dashed ${theme.primaryText};
                background-color: ${theme.background};
                padding: 1.5rem;
                border-radius: 10px;
                box-shadow: 0px 48px 35px -48px ${theme.shadow};
            }

            .custum-file-upload .icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .custum-file-upload .icon svg {
                height: 80px;
                fill: ${theme.primaryText};
            }

            .custum-file-upload .text {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .custum-file-upload .text span {
                font-weight: 400;
                color: ${theme.secondaryText};
            }

            .custum-file-upload input {
                display: none;
            }    
        `}</style>
            {selectedFile ?
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box component='img' src={image} alt='Display Pic' sx={{ height: { lg: 400, md: 400, sm: 300, xs: 200 }, width: { lg: 400, md: 400, sm: 300, xs: 200 } }} />
                </Box> :
                <label for="file" class="custum-file-upload">
                    <div class="icon">
                        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                    </div>
                    <div class="text">
                        <span>{selectedFilename.length > 0 ? selectedFilename : 'Click to upload image'}</span>
                    </div>
                    <input id="file" type="file" onChange={handleUploadDP} />
                </label>}
        </>
    )
}

export const EditDP = () => {
    const { theme } = useThemeContext()
    const [editImage, setEditImage] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { lg: 400, md: 400, sm: 300, xs: 200 },
        bgcolor: theme.primaryBg,
        border: `2px solid ${theme.cardBorder}`,
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    const nav = useNavigate()
    const [isCompany, setIsCompany] = useState('')
    const [currentDp, setCurrentDp] = useState('')
    const [dp, setDp] = useState([])

    // Choose new image modal
    const [openNewImage, setOpenNewImage] = useState(false);
    const handleOpenNewImage = () => setOpenNewImage(true);
    const handleCloseNewImage = () => setOpenNewImage(false);

    // choose existing image modal
    const [openExisting, setOpenExisting] = useState(false);
    const handleOpenExisting = () => setOpenExisting(true);
    const handleCloseExisting = () => setOpenExisting(false);

    // Delete Picture Dialog
    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenDialog = () => { setOpenDialog(true) };
    const handleCloseDialog = () => { setOpenDialog(false) };

    const fetchUser = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (!token) return

        const response = await axios.get("http://localhost:2000/user/me", {
            headers: { Authorization: `Bearer ${token}` }
        })

        setIsCompany(response.data.user.isCompany)
        setCurrentDp(response.data.profile.currentDp)
        setDp(response.data.profile.dp)
    }

    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFilename, setSelectedFilename] = useState('')
    const handleUploadDP = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
        if (!allowedTypes) {
            setError('Only JPG,JPEG,PNG formats are accepted')
            setOpen(true)
            return
        }

        setSelectedFile(file)
        setSelectedFilename(file.name)
    }

    // setting image to edit
    const [image, setImage] = useState('')

    const handleSaveDP = async () => {
        if (!selectedFile) return

        setLoading(true)
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (!token) {
                setError("Unauthorized User")
                setOpen(true)
            }

            const blob = await fetch(image).then(res => res.blob());
            const croppedFile = new File([blob], selectedFilename || 'cropped.jpg', { type: blob.type });

            const formData = new FormData()
            formData.append("file", croppedFile)

            const response = await axios.post('http://localhost:2000/profile/upload/dp', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            setCurrentDp(response.data.currentDp)
            setSelectedFile(null)
            setSelectedFilename('')
            handleCloseNewImage()
            fetchUser()
        } catch (error) {
            setError(error.response?.data?.error || error.message)
            setOpen(true)
        } finally {
            setLoading(false)
        }
    }

    const [selectedExisting, setSelectedExisting] = useState(null)
    const handleUpdateDP = async () => {
        if (!selectedExisting) return

        setLoading(true)
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (!token) {
                setError("Unauthorized User");
                setOpen(true);
                return;
            }

            const response = await axios.put('http://localhost:2000/profile/update/dp',
                { url: selectedExisting },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setCurrentDp(response.data.currentDp)
            handleCloseExisting()
            fetchUser()
        } catch (error) {
            setError(error.response?.data?.error || error.message);
            setOpen(true);
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteDP = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (!token) {
                setError("Unauthorized User");
                setOpen(true);
                return;
            }

            const response = await axios.delete("http://localhost:2000/profile/delete/dp", {
                headers: { Authorization: `Bearer ${token}` }
            })

            setCurrentDp(response.data.currentDp)
            fetchUser()
        } catch (error) {
            setError(error.response?.data?.error || error.message);
            setOpen(true);
        } finally {
            setLoading(false)
            handleCloseDialog()
        }
    }

    useEffect(() => { fetchUser() }, [])

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile)
            setImage(url)

            return () => URL.revokeObjectURL(url)
        }
    }, [selectedFile])

    // Snackbar
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', background: theme.primaryBg, color: theme.primaryText }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <AppBar position='static' sx={{ backgroundColor: theme.background, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.cardBorder}`, color: theme.primaryText }}>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid size={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                            <ButtonBase onClick={() => nav(isCompany ? '/ProfileOrg' : '/Profile')} sx={{
                                                display: 'flex',
                                                flexDirection: 'column', justifyContent: 'flex-end',
                                                alignItems: 'center', pb: 0.5, px: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    color: theme.hoverAccent,
                                                }
                                            }}><Close /></ButtonBase>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100vw', pt: 5, gap: 5 }}>
                        <Box>
                            <Card sx={{ maxWidth: 245 }}>
                                <CardActionArea>
                                    {currentDp && currentDp.startsWith('https://') ? (
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            width="300"
                                            image={currentDp}
                                            alt="Display Picture"
                                        />
                                    ) : (
                                        <Box sx={{
                                            height: '100%', width: '100%', background: `linear-gradient(50deg, ${theme.primaryAccent} 0%, ${theme.hoverAccent} 100%)`,
                                            display: 'flex', alignItems: 'center', justifyItems: 'center'
                                        }}>
                                            <Box>
                                                <b style={{ fontSize: "150px" }}>{currentDp}</b>
                                            </Box>
                                        </Box>
                                    )}
                                </CardActionArea>
                            </Card>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4, pb: 5 }}>
                            <Link onClick={handleOpenNewImage} sx={{
                                textDecoration: 'none', color: theme.primaryAccent,
                                '&:hover': { color: theme.hoverAccent }
                            }}>Upload New Picture</Link>
                            <Link onClick={handleOpenExisting} sx={{
                                textDecoration: 'none', color: theme.primaryAccent,
                                '&:hover': { color: theme.hoverAccent }
                            }}>Choose Existing Picture</Link>
                            <Link onClick={handleOpenDialog} sx={{
                                textDecoration: 'none', color: theme.primaryAccent,
                                '&:hover': { color: theme.hoverAccent }
                            }}>Delete Current Picture</Link>
                        </Box>
                    </Box>
                    <Modal
                        open={openNewImage}
                        onClose={handleCloseNewImage}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box sx={{ flexGrow: 1, background: theme.primaryBg, color: theme.primaryText }}>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <ButtonBase onClick={handleCloseNewImage} sx={{
                                                display: 'flex',
                                                flexDirection: 'column', justifyContent: 'flex-end',
                                                alignItems: 'center', pb: 0.5, px: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    color: theme.hoverAccent,
                                                }
                                            }}><Close /></ButtonBase>
                                        </Box>
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ p: 2 }}>
                                            {editImage ? <ImageEditor image={image} setImage={setImage} theme={theme} setEdit={setEditImage} /> :
                                                uploadImage(image, theme, handleUploadDP, selectedFilename, selectedFile)}
                                        </Box>
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2 }}>
                                            <Button variant='outlined'
                                                startIcon={<Edit />} disabled={!selectedFile || editImage} onClick={() => setEditImage(true)}
                                                sx={{
                                                    color: theme.primaryAccent,
                                                    borderColor: theme.primaryAccent,
                                                    '&:hover': {
                                                        backgroundColor: theme.hoverAccent,
                                                        borderColor: theme.hoverAccent,
                                                        color: theme.primaryBg
                                                    }
                                                }}>edit</Button>
                                            <Button variant='outlined' onClick={handleSaveDP} disabled={editImage}
                                                startIcon={
                                                    loading ? (
                                                        <CircularProgress size={24} color="inherit" />
                                                    ) : (
                                                        <Save />
                                                    )
                                                }
                                                sx={{
                                                    color: theme.primaryAccent,
                                                    borderColor: theme.primaryAccent,
                                                    '&:hover': {
                                                        backgroundColor: theme.hoverAccent,
                                                        borderColor: theme.hoverAccent,
                                                        color: theme.primaryBg
                                                    }
                                                }}>{loading ? 'Saving...' : 'Save'}</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal
                        open={openExisting}
                        onClose={handleCloseExisting}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bolder', color: theme.primaryText }}>
                                Choose One uploaded image to set as display image.
                            </Typography>
                            <Divider sx={{ mt: 2, mb: 2 }} color={theme.secondaryText} />
                            {dp.length > 0 ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                                    {dp.map((dp, i) => (
                                        <Box onClick={() => setSelectedExisting(dp.url)} sx={{
                                            position: 'relative', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                                            border: selectedExisting === dp.url ? `3px solid ${theme.primaryAccent}` : '2px solid transparent',
                                            transition: 'all 0.3s ease', '&:hover': {
                                                border: `2px solid ${theme.hoverAccent}`,
                                                transform: 'scale(1.05)'
                                            }
                                        }}>
                                            <Box component="img" key={i} src={dp.url} alt={dp.name}
                                                height='80px' width="80px" />
                                            {selectedExisting === dp.url && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'rgba(0, 0, 0, 0.4)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="30"
                                                    height="30"
                                                    fill={theme.primaryAccent}
                                                    viewBox="0 0 16 16"
                                                >
                                                        <path d="M13.485 1.929a1 1 0 0 1 1.414 1.414L6.414 11.828a1 1 0 0 1-1.414 0L1.1 7.929a1 1 0 0 1 1.414-1.414l3.071 3.071 7.9-7.657z" />
                                                    </svg></Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography id="modal-modal-description" sx={{ mt: 2, color: theme.secondaryText }}>
                                    No Existing images, choose Upload new image option
                                </Typography>
                            )}
                            <Divider sx={{ mt: 2, mb: 2 }} color={theme.secondaryText} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button onClick={handleCloseExisting} variant='outlined'
                                    sx={{
                                        borderRadius: '20px',
                                        color: theme.primaryAccent,
                                        borderColor: theme.primaryAccent,
                                        '&:hover': {
                                            backgroundColor: theme.hoverAccent,
                                            borderColor: theme.hoverAccent,
                                            color: theme.primaryBg
                                        }
                                    }}>cancel</Button>
                                <Button onClick={handleUpdateDP} disabled={!selectedExisting} variant='outlined'
                                    sx={{
                                        borderRadius: '20px',
                                        color: theme.primaryAccent,
                                        borderColor: theme.primaryAccent,
                                        '&:hover': {
                                            backgroundColor: theme.hoverAccent,
                                            borderColor: theme.hoverAccent,
                                            color: theme.primaryBg
                                        }
                                    }}>Choose</Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Dialog
                        open={openDialog}
                        slots={{
                            transition: Transition,
                        }}
                        keepMounted
                        onClose={handleCloseDialog}
                        aria-describedby="alert-dialog-slide-description"
                        sx={{
                            "& .MuiPaper-root": {
                                background: theme.background,
                            }
                        }}
                    >
                        <DialogTitle sx={{ color: theme.primaryText }}>{"Delete the current display picture?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description" sx={{ color: theme.secondaryText }}>
                                Are you sure you want to delete current display picture, this will delete the picture from
                                database itself, but don't worry you can re-upload the picture afterwards.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} variant='outlined'
                                sx={{
                                    borderRadius: '20px',
                                    color: theme.primaryAccent,
                                    borderColor: theme.primaryAccent,
                                    '&:hover': {
                                        backgroundColor: theme.hoverAccent,
                                        borderColor: theme.hoverAccent,
                                        color: theme.primaryBg
                                    }
                                }}>cancel</Button>
                            <Button onClick={handleDeleteDP} variant='outlined'
                                sx={{
                                    borderRadius: '20px',
                                    color: theme.error,
                                    borderColor: theme.error,
                                    '&:hover': {
                                        backgroundColor: theme.errorHover,
                                        borderColor: theme.errorHover,
                                        color: theme.primaryBg
                                    }
                                }}>{loading ? 'Deleting...' : 'Delete'}</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity='error'
                    sx={{
                        backgroundColor: '#FF4D6D'
                    }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}
