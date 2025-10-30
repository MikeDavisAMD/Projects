import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CircularProgress, Link, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Delete, Edit, ExpandMore, Save } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const List = () => {
  const [data,setData] = useState([])
  const [edit,setEdit] = useState(null)
  const [loading,setLoading] = useState(true)
  const [saveLoad,setSaveLoad] = useState(null)
  const [delLoad,setDelLoad] = useState(null)
  const navigate = useNavigate()

  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [email,setEmail] = useState('')
  const [mobile,setMobile] = useState('')
  const [dob,setDOB] = useState('')
  const [gender,setGender] = useState('')
  const [country,setCountry] = useState('')
  const [address,setAddr] = useState('')
  const [skills,setSkills] = useState([]) 

  const handleEdit = (data) => {
    setEdit(data._id)
    setFname(data.fname)
    setLname(data.lname)
    setEmail(data.email)
    setMobile(data.mobile)
    setDOB(data.dob)
    setGender(data.gender)
    setCountry(data.country)
    setAddr(data.address)
    setSkills(data.skills)
  }
  const handleUpdate = async (id) => {
    setSaveLoad(id)
    try {
      await axios.put(`https://projects-tvrs.onrender.com/data/${id}`,{
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        dob: dob,
        gender: gender,
        country: country,
        address: address,
        skills: skills
      })
      setEdit(null)
      fetchData()
    } catch (error) {
      console.error(error.message)
    } finally {
      setSaveLoad(null)
    }
  } 
  const handleDelete = async (id) => {
    setDelLoad(id)
    try {
      await axios.delete(`https://projects-tvrs.onrender.com/data/${id}`)
      fetchData()
    } catch (error) {
      console.error(error.message)
    } finally {
      setDelLoad(null)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://projects-tvrs.onrender.com/data')
      setData(response.data)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{fetchData()},[])
  return (
    <>
    <Box>
      <Typography variant='h3' sx={{textAlign:'center',fontWeight:'bold'}}>
        Welcome,<span> </span>
        <Link href='/' onClick={handleLogout} sx={{fontStyle:'italic',textDecoration:'none'}}>Admin</Link> <br/> 
        <span style={{fontStyle:'italic'}}>Enrolled Persons List:-</span>
      </Typography>
    </Box><br /><br />
    {loading ? (
      <Box>
        <Box sx={{display:'flex',flexDirection:"column",alignItems:'center'}}>
          <Box sx={{display:'flex',gap:4}}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
          </Box><br />
          <Box sx={{display:'flex',gap:4}}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
          </Box><br />
          <Box sx={{display:'flex',gap:4}}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
          </Box>
        </Box>
      </Box>
    ):(
      data.map((data)=>(
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Card sx={{width:'30%',mb:2}}>
          <Accordion sx={{background:'linear-gradient(#00E6FF,#7700FF)'}}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Box sx={{display:'flex',alignItems:'center',gap:4,pl:4}}>
              <Avatar alt={data.file?.filename || data.fname} src={data.file?.filepath || ''}/>
              <Typography component="span"><b>{edit === data._id? (
                <Box>
                  <TextField variant='standard' size='small' value={fname} onChange={e=>setFname(e.target.value)}/>
                  <TextField variant='standard' size='small' value={lname} onChange={e=>setLname(e.target.value)}/>
                </Box>
              ):`${data.fname} ${data.lname}`}</b></Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody key={data._id}>
                    <TableRow>
                      <TableCell><b>E-Mail</b></TableCell>
                      <TableCell>{edit === data._id ? (
                        <TextField variant='standard' size='small' value={email} onChange={e=>setEmail(e.target.value)}/>
                      ):data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Mobile</b></TableCell>
                      <TableCell>{edit === data._id ? (
                        <TextField variant='standard' size='small' value={mobile} onChange={e=>setMobile(e.target.value)}/>
                      )
                      :data.mobile}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Date of Birth</b></TableCell>
                      <TableCell>{edit === data._id?(
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer sx={{display:'flex',justifyContent:'center',width:'100%'}} components={['DatePicker']}>
                              <DatePicker value={dob ? dayjs(dob) : null} onChange={(e)=>setDOB(e ? e.toISOString() : '')} format='DD/MM/YYYY' label="Date of Birth" sx={{width:'85%'}}/>
                          </DemoContainer>
                      </LocalizationProvider>
                      ):new Date(data.dob).toLocaleDateString('en-US')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Gender</b></TableCell>
                      <TableCell>{edit === data._id? (
                        <TextField variant='standard' size='small' value={gender} onChange={e=>setGender(e.target.value)} />
                      ):data.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Country</b></TableCell>
                      <TableCell>{edit === data._id? (
                        <TextField variant='standard' size='small' value={country} onChange={e=>setCountry(e.target.value)}/>
                      ) :data.country}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Address</b></TableCell>
                      <TableCell>{edit === data._id? (
                        <TextField variant='standard' size='small' value={address} onChange={e=>setAddr(e.target.value)}/>
                      ):data.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Skills</b></TableCell>
                      <TableCell>{edit === data._id?(
                        <TextField 
                        variant='standard' 
                        size='small' 
                        value={skills.join(',')} 
                        onChange={e=>setSkills(e.target.value.split(',').map(data => data.trim()))}/>
                      ):data.skills.map((data,index)=>(
                        <ul key={index}>
                          <li>{data}</li> 
                        </ul>
                      ))}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
            <AccordionActions>
              {edit === data._id ? (
                <Button variant='contained' size='small' startIcon={<Save />} onClick={()=>handleUpdate(data._id)} disabled={saveLoad === data._id}>{saveLoad === data._id ? <CircularProgress size={24} color="inherit" />:'Save'}</Button>
              ) : (
                <Button variant='contained' size='small' startIcon={<Edit />} onClick={()=>handleEdit(data)}>Edit</Button>
              ) }
              <Button variant='contained' size='small' color='error' startIcon={<Delete />} onClick={()=>handleDelete(data._id)} disabled={delLoad === data._id}>{delLoad === data._id ? <CircularProgress size={24} color="inherit" />:'Delete'}</Button>
          </AccordionActions>
          </Accordion>
        </Card>
      </Box>
      ))
    )}
    </>
  )
}
