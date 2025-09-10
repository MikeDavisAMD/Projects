import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { DatePickerUi } from './DatePickerUi'
import { COLORS } from './colors'
import { List, Save } from '@mui/icons-material'
import { ListProjects } from './ListProjects'

export const AddProjects = ({projects, setProjects, handleCloseModal, skills, college, work}) => {

  // Project Name
  const [projectName, setProjectName] = useState('')

  // Description
  const [description, setDescription] = useState('')

  // Skills and organization for project association Selector
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
  const [assn, setAssn] = useState([])

  const handleChangeSkills = (event) => {
    const {
      target: { value },
    } = event;
    setSkillset(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeAssn = (event) => {
    const {
      target: { value },
    } = event;
    setAssn(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // currently Working on this project
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isProgress, setIsProgress] = useState(false)

  // Start and end date date picker
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // List portal
  const [showPortal, setShowPortal] = useState(false);
  const container = useRef(null);

  const handleClickPortal = () => {setShowPortal(!showPortal);};

  // Link
  const [link, setLink] = useState('')

  // Select Instituition for project associated with
  const [org, setOrg] = useState('');

  const handleChangeOrg = (event) => {
    setOrg(event.target.value);
  };

  // save button save
  const handleSave = () => {
    const pro = {
      projectName,
      description,
      skills: skillset,
      isProgress,
      startDate,
      endDate,
      org,
      assn,
      link
    }
    setProjects([...projects,pro])
    handleCloseModal()
  }

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='Name of the Project' placeholder='Ex: ABCD Project' fullWidth
            helperText='Enter the name of the project' value={projectName} 
            onChange={e => setProjectName(e.target.value)}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField variant='outlined' label='Description' rows={6} multiline fullWidth
            helperText="Give us details about the project here." value={description}
            onChange={e => setDescription(e.target.value)}/>
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
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <Checkbox {...label} checked={isProgress} 
            onChange={(e) => setIsProgress(e.target.checked)}
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
            <Box component='span'>Currently Working on this Project</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isProgress}/>
        </Grid>
        <Grid size={12}>
          <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Project Associated with</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={org}
              label="Project Associated with"
              onChange={handleChangeOrg}
            >
              <MenuItem value="Educational Project">Educational Project</MenuItem>
              <MenuItem value="Live Project">Live Project</MenuItem>
              <MenuItem value="Standalone Project">Standalone Project</MenuItem>
            </Select>
            <FormHelperText>Select From where you have done the project</FormHelperText>
          </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          {org === "Standalone Project" ? (
            <Box component='span' sx={{color: COLORS.secondaryText, textAlign:'center',width:'100%'}}>
              This is a Standalone Project
            </Box>
          ):(
            <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">{
              org === "Live Project" ? "Select Associated Organization" : 
              org === "Educational Project" ? "Select Associated Educational Institute" : "Select association"}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={assn}
              onChange={handleChangeAssn}
              input={<OutlinedInput label={
                org === "Live Project" ? "Select Associated Organization" : 
                org === "Educational Project" ? "Select Associated Educational Institute" : "Select association"} />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {org === "Live Project" ? 
                work.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={assn.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                )): org === "Educational Project" ?
                college.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={assn.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                )) : (
                  <MenuItem disabled value="">
                    <ListItemText primary="No option selected"/>
                  </MenuItem>
                )
              }
            </Select>
            <FormHelperText>Select the association of your {org}</FormHelperText>
          </FormControl>
          )}
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Project URL' placeholder='Ex: https://projectname.com' fullWidth
            helperText='Enter the URL of the hosted project' value={link} onChange={e => setLink(e.target.value)}/>
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
                    <Button variant='outlined' size='large' startIcon={<Save/>} onClick={handleSave}
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
                <ListProjects projects={projects}/>
              </Portal>
            ) : null}
            <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
