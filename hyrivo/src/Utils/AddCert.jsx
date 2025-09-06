import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Portal, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { DatePickerUi } from './DatePickerUi'
import { COLORS } from './colors'
import { List, Save } from '@mui/icons-material'
import { ListCert } from './ListCert'

export const AddCert = () => {

  // Expiry Date checkbox
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isexpiry, setIsExpiry] = useState(false)

  // Start and end date date picker
  const [IssueDate, setIssueDate] = useState(null)
  const [ExpiryDate, setExpiryDate] = useState(null)

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

  const [skills, setSkills] = useState([])
  const [skillset, setSkillset] = useState([])

  const handleChangeSkills = (event) => {
    const {
      target: { value },
    } = event;
    setSkillset(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  useEffect(() => {
    setSkills(['HTML','CSS','ReactJs','ExpressJs','MongoDB'])
  },[])

  // List portal
  const [showPortal, setShowPortal] = useState(false);
  const container = useRef(null);

  const handleClickPortal = () => {setShowPortal(!showPortal);};
  
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='Certificate or License Name' placeholder='Full Name of the certification or license as per the issued organization' fullWidth
            helperText='Enter the Full Name of the certification or license as per the issued organization'/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Issuing Organization' placeholder='Ex: ABC organization, City, State, Country' fullWidth
            helperText='Enter the name of the Organization that issued certificate or license with location'/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <Checkbox {...label} checked={isexpiry} 
            onChange={(e) => setIsExpiry(e.target.checked)}
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
            <Box component='span'>Has no Expiration</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Issue Date' value={IssueDate} onChange={setIssueDate}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Expiry Date' value={ExpiryDate} onChange={setExpiryDate} disabled={isexpiry}/>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Credential ID' placeholder='Ex: ABC123456' fullWidth
            helperText='Enter the Credential ID as in the certificate or license'/>
          </Box>
        </Grid>
        <Grid size={12}>
        <Box>
            <TextField label='Credential URL' placeholder='Ex: https//:credentialurl.com' fullWidth
            helperText='Enter the Credential URL as in the certificate or license'/>
          </Box>
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
                <ListCert/>
              </Portal>
            ) : null}
            <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
