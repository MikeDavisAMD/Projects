import { Box, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from './colors';

export const AddExp = () => {
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

  // currently working on the role checkbox
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // Start and end date date picker
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='Title' placeholder='Ex: Software Engineer, Web Developer, etc.' fullWidth/>
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
          </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Company or Organization' placeholder='Ex: ABC Technologies' fullWidth/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={2}>
              <Grid size={12}>
                <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                  <Checkbox {...label} defaultChecked 
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
                  
                </Grid>
                <Grid size={{lg:6,md:6,sm:12,xs:12}}>

                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
