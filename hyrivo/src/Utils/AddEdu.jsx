import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DEGREE } from './degree';

export const AddEdu = () => {

   // Employee type
  const [Degree, setDegree] = useState('');

  const handleChange = (event) => {
    setDegree(event.target.value);
  };
  
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='University or College or Institute' placeholder='Ex: ABC College, City, State, Country' fullWidth
            helperText='Enter the college/ university/ institute name with location'/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Degree</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Degree}
              label="Degree"
              onChange={handleChange}
            >
              {DEGREE.map((type,index) => (
                <MenuItem key={index} value={type.degree}>{type.degree}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select what Degree you hold</FormHelperText>
          </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
