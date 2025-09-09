import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { COLORS } from './colors';
import { DatePickerUi } from './DatePickerUi';
import { List, Save } from '@mui/icons-material';
import { ListExp } from './ListExp';

export const AddExp = ({ experience, setExperience, handleCloseModal, skills }) => {
  // Title
  const [title, setTitle] = useState('')

  // Employee type
  const [EmpType, setEmpType] = useState('');

  const handleChange = (event) => {
    setEmpType(event.target.value);
  };

  const EMPTYPE = [
    {value: '', name: 'Please Select'},
    {value: 'Full-time', name: 'Full-Time'},
    {value: 'Part-Time', name: 'Part-Time'},
    {value: 'Self-Employed', name: 'Self-Employed'},
    {value: 'Free-Lance', name: 'Free-Lance'},
    {value: 'Internship', name: 'Internship'},
    {value: 'Trainee', name: 'Trainee'},
  ]

  // company
  const [company, setCompany] = useState('')

  // Location
  const [location, setLocation] = useState('')

  // Location type
  const [LocType, setLocType] = useState('');

  const handleChangelt = (event) => {
    setLocType(event.target.value);
  };

  const LOCTYPE = [
    {value: '', name: 'Please Select'},
    {value: 'On-Site', name: 'On-site'},
    {value: 'Hybrid', name: 'Hybrid'},
    {value: 'Remote', name: 'Remote'}
  ]

  // currently working on the role checkbox
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isCurrentRole, setIsCurrentRole] = useState(true)

  // Start and end date date picker
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // Skills Selector
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [skillset, setSkillset] = useState([])

  const handleChangeSkills = (event) => {
    const {
      target: { value },
    } = event;
    setSkillset(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // save button
  const handleSave = () => {
    const exp = {
      title,
      EmpType,
      company,
      isCurrentRole,
      startDate,
      endDate,
      skills: skillset,
      location,
      LocType
    }

    setExperience([...experience,exp])
    handleCloseModal()
  }

  // List portal
  const [showPortal, setShowPortal] = useState(false);
  const container = useRef(null);

  const handleClickPortal = () => {setShowPortal(!showPortal);};

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='Title' placeholder='Ex: Software Engineer, Web Developer, etc.' fullWidth
            helperText='Enter the Job Title from Previous Role' value={title} onChange={e => setTitle(e.target.value)}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={EmpType}
              label="Employee Type"
              onChange={handleChange}
            >
              {EMPTYPE.map((type,index) => (
                <MenuItem key={index} value={type.value}>{type.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select what type of employee were you</FormHelperText>
          </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Company or Organization' placeholder='Ex: ABC Technologies' fullWidth
            helperText='Enter the previous company name' value={company} onChange={e => setCompany(e.target.value)}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <Checkbox {...label} checked={isCurrentRole} 
            onChange={(e) => setIsCurrentRole(e.target.checked)}
            sx={{
              color: COLORS.primaryText,
              '&.Mui-checked': {
                color: COLORS.primaryAccent,
              },
              '&:hover': {
                color: COLORS.primaryAccent,   
                bgcolor: 'transparent',        
              }
            }}/>
            <Box component='span'>Currently Working on this Role</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isCurrentRole}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
          <Box>
            <TextField label='Location' placeholder='Ex: Nagercoil, Tamil-Nadu' fullWidth 
            helperText='Previous job Location' value={location} onChange={e => setLocation(e.target.value)}/>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={LocType}
              label="Employee Type"
              onChange={handleChangelt}
            >
              {LOCTYPE.map((type,index) => (
                <MenuItem key={index} value={type.value}>{type.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Previous job location type</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={skillset}
              onChange={handleChangeSkills}
              input={<OutlinedInput label="Skills" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {skills.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={skillset.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Skills that you added only will be listed</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Divider/><br />
            <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'},gap:1}}>
              <Button variant='outlined' size='large' startIcon={<List/>} onClick={handleClickPortal}
                sx={{
                    color:COLORS.primaryAccent,
                    borderColor:COLORS.primaryAccent,
                    '&:hover':{
                      backgroundColor:COLORS.hoverAccent,
                      borderColor:COLORS.hoverAccent,
                      color:COLORS.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      list
                    </Box></Button>
                    <Button variant='outlined' size='large' startIcon={<Save/>}
                    onClick={handleSave}
                sx={{
                    color:COLORS.primaryAccent,
                    borderColor:COLORS.primaryAccent,
                    '&:hover':{
                      backgroundColor:COLORS.hoverAccent,
                      borderColor:COLORS.hoverAccent,
                      color:COLORS.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      save
                    </Box></Button>
            </Box>
            {showPortal ? (
              <Portal container={() => container.current}>
                <br />
                <ListExp experience={experience}/>
              </Portal>
            ) : null}
            <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
