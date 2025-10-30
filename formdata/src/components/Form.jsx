import { Autocomplete, Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Link, Radio, RadioGroup, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Form = () => {
    const [country,setCountry] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name')
            setCountry(response.data.map(c=>c.name.common))
        } catch (error) {
            console.error(error.message)
        }
    }

    // Form
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [dob,setDOB] = useState(null)
    const [gender,setGender] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [selCountry,setSelCountry] = useState('')
    const [address,setAddress] = useState('')
    const [skills,setSkills] = useState([])
    const [profile,setProfile] = useState(null)
    const [username,setUsername] = useState('')

    const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem('token')
            if (!token) {
                console.error("No token in Storage");
                return;
            }
            const response = await axios.get('https://projects-tvrs.onrender.com/user/me',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setUsername(response.data.username)
        } catch (error) {
            console.error(error.response?.data?.message)
        }
    }
    useEffect(()=>{
        fetchCountries()
        fetchUser()
    },[])

    const handleChangeSkill = (e) => {
        const skills = e.target.value
        setSkills(
            (prev)=>e.target.checked ? [...prev,skills] : prev.filter((s)=>s!==skills)
        )
    }

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const handleClick = async () => {
        setLoading(true)
        let fileData = null
        // file upload multer
        if (profile) {
            try {
                const formData = new FormData();
                formData.append('file', profile);
                const uploadRes = await axios.post('https://projects-tvrs.onrender.com/data/uploads',formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                })

                fileData = {
                    filename:uploadRes.data.filename,
                    filepath:uploadRes.data.filepath
                }
            } catch (error) {
                setOpen(true)
                setError('Failed to upload image',error)
                setLoading(false)
                return
            }
        }

        await axios.post('https://projects-tvrs.onrender.com/data',{
            username:username,
            fname: fname,
            lname: lname,
            dob: dob ? dob.toDate() : null,
            gender: gender,
            mobile: mobile,
            email: email,
            country: selCountry,
            address: address,
            skills: skills,
            file: fileData
        })
        .then(()=>{
            setFname('')
            setLname('')
            setDOB(null)
            setGender('')
            setMobile('')
            setEmail('')
            setSelCountry('')
            setAddress('')
            setSkills([])
            setProfile(null)
            setSuccess('Your Details has been added successfully')
            setError('')
            setOpen(true)
        })
        .catch((error)=>{
            setOpen(true);
            setSuccess('')
            setError(error.message)
        }).finally(()=>setLoading(false))
    }

  return (
    <Box>
        <Box sx={{alignContent:'center',textAlign:'center',height:'120px'}}>
            <Typography variant='h3' sx={{fontWeight:'bold'}}>
                Welcome, <Link href='/Profile' sx={{textDecoration:'none'}}>{username}</Link>
            </Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',pb:'120px'}}>
            <Card sx={{width:'60%',boxShadow:'5px 5px 10px grey'}}>
                <CardContent>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant='h4' sx={{fontWeight:'bold'}}>Details</Typography>
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center',gap:4}}>
                        <TextField value={fname} onChange={e=>setFname(e.target.value)} label='First Name' sx={{width:'40%'}}/>
                        <TextField value={lname} onChange={e=>setLname(e.target.value)} label='Last Name' sx={{width:'40%'}}/>
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{display:'flex',justifyContent:'center',width:'100%'}} components={['DatePicker']}>
                                <DatePicker value={dob} onChange={(e)=>setDOB(e)} format='DD/MM/YYYY' label="Date of Birth" sx={{width:'85%'}}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box><br />
                    <Box sx={{display:'flex',width:'81.5%',ml:'55px',p:'5px 12px',alignItems:'center',gap:10,border:'1px solid #D5D5D5',borderRadius:'4px'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender:</FormLabel>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={gender}
                                onChange={e=>setGender(e.target.value)}
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <TextField value={mobile} onChange={e=>setMobile(e.target.value)} label='Mobile' type='number' sx={{width:'85%'}}/>
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <TextField value={email} onChange={e=>setEmail(e.target.value)} label='Email' type='email' sx={{width:'85%'}}/>
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Autocomplete
                        disablePortal
                        options={country}
                        value={selCountry}
                        onChange={(_,val)=>setSelCountry(val || '')}
                        sx={{ width: '85%' }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                    </Box><br />
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Address"
                            value={address}
                            onChange={e=>setAddress(e.target.value)}
                            style={{ width: '85%' }}
                        />
                    </Box><br />
                    <Box sx={{display:'flex',width:'82.5%',ml:'52px',p:'5px 12px',alignItems:'center',gap:10,border:'1px solid #D5D5D5',borderRadius:'4px'}}>
                        <Box sx={{pl:'50px'}}>
                            <FormLabel id="demo-radio-buttons-group-label">Skills:</FormLabel>
                        </Box>
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                            <FormGroup> 
                                <FormControlLabel value="HTML" control={<Checkbox onChange={handleChangeSkill}/>} label="HTML" />
                                <FormControlLabel value="CSS" control={<Checkbox onChange={handleChangeSkill}/>} label="CSS" />
                                <FormControlLabel value="JavaScript" control={<Checkbox onChange={handleChangeSkill}/>} label="JavaScript" />
                                <FormControlLabel value="React JS" control={<Checkbox onChange={handleChangeSkill}/>} label="React JS" />
                                <FormControlLabel value="Angular JS" control={<Checkbox onChange={handleChangeSkill}/>} label="Angular JS" />
                                <FormControlLabel value="Python" control={<Checkbox onChange={handleChangeSkill}/>} label="Python" />
                                <FormControlLabel value="Node JS" control={<Checkbox onChange={handleChangeSkill}/>} label="Node JS" />
                                <FormControlLabel value="Express" control={<Checkbox onChange={handleChangeSkill}/>} label="Express" />
                                <FormControlLabel value="PHP" control={<Checkbox onChange={handleChangeSkill}/>} label="PHP" />
                                <FormControlLabel value="SQL" control={<Checkbox onChange={handleChangeSkill}/>} label="SQL" />
                                <FormControlLabel value="Mongo DB" control={<Checkbox onChange={handleChangeSkill}/>} label="Mongo DB" />
                            </FormGroup>
                        </Box>
                    </Box><br />
                    <Box sx={{display:'flex',width:'82.5%',ml:'52px',p:'50px 12px',justifyContent:'center',alignItems:'center',gap:10,border:'1px solid #D5D5D5',borderRadius:'4px'}}>
                        <div className="container">
                        <div className="folder">
                            <div className="top"></div>
                            <div className="bottom"></div>
                        </div>
                        <label className="custom-file-upload">
                            <input className="title" type="file" onChange={e=>setProfile(e.target.files[0])}/>
                            Upload Your passport sized Photo
                        </label>
                        </div>
                    </Box>
                </CardContent>
                <CardActions sx={{display:'flex',justifyContent:'center',pb:'30px'}}>
                    <Button variant='contained' onClick={handleClick} disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit"/> : 'Submit'}
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message={error || success}
                    />
                </CardActions>
            </Card>
        </Box>
    </Box>
  )
}
