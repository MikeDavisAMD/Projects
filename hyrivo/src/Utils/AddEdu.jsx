import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { DEGREE } from './degree';
import { ListEdu } from './ListEdu';
import { COLORS } from './colors';
import { List, Save } from '@mui/icons-material';
import { DatePickerUi } from './DatePickerUi';

export const AddEdu = () => {

   // Employee type
  const [Degree, setDegree] = useState('');
  const [Field, setField] = useState('')

  const handleChangeDegree = (event) => {
    setDegree(event.target.value);
    setField('')
  };

  const handleChangeField = (event) => {
    setField(event.target.value);
  };

  const selectedDegree = DEGREE.find(d => d.degree === Degree)

  // currently studying
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [isStudying, setIsStudying] = useState(false)

  // Start and end date date picker
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

  // List portal
    const [showPortal, setShowPortal] = useState(false);
    const container = useRef(null);
  
    const handleClickPortal = () => {setShowPortal(!showPortal);};
  
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
              onChange={handleChangeDegree}
            >
              {DEGREE.map((type,index) => (
                <MenuItem key={index} value={type.degree}>{type.degree}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select what Degree you hold</FormHelperText>
          </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          {selectedDegree?.degree === "Short-term certifications" ? (
            <Box>
              <TextField label='Field of certification' placeholder='Ex: Fullstack development, Data Science, Digital marketing, etc.' fullWidth
              helperText='Which field certification is done like IT, AI, Data Science, etc.'/>
            </Box>
          ):(
            <Box>
            <FormControl fullWidth disabled={!Degree || selectedDegree?.field.length === 0}>
              <InputLabel id="demo-simple-select-label">{selectedDegree?.field?.length === 0 ? "No Field" : "Field of study"}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Field}
                label={selectedDegree?.field?.length === 0 ? "No Field" : "Field of study"}
                onChange={handleChangeField}
              >
                {selectedDegree?.field.map((type,index) => (
                  <MenuItem key={index} value={type.value}>{type.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{selectedDegree?.field?.length === 0 ? "No Field for selected degree":"Select your field of study"}</FormHelperText>
            </FormControl>
            </Box>
          )}
        </Grid>
        <Grid size={12}>
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <Checkbox {...label} checked={isStudying} 
            onChange={(e) => setIsStudying(e.target.checked)}
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
            <Box component='span'>Currently Pursuing this degree</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isStudying}/>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Grade' placeholder='Enter the Grade' fullWidth
            helperText='Enter the Grade Out of 10' disabled={isStudying}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField variant='outlined' label='Activities & Societies' rows={6} multiline fullWidth
            helperText="Give us details about club activities or other bodies that you have participated during studies"/>
          </Box>
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
                <ListEdu/>
              </Portal>
            ) : null}
            <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
