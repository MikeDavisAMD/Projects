import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { DatePickerUi } from './DatePickerUi'
import { List, Save } from '@mui/icons-material'
import { ListProjects } from './ListProjects'
import { useThemeContext } from './ThemeContext'

export const AddProjects = ({projects, setProjects, handleCloseModal, skills, college, work}) => {
  const {theme} = useThemeContext()
  // Project Name
  const [projectName, setProjectName] = useState('')

  // Description
  const [description, setDescription] = useState('')

  // Skills and organization for project association Selector
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: theme.primaryBg,
        "& .MuiMenuItem-root": {
          color: theme.primaryText,
          "&:hover": {
            backgroundColor: theme.hoverAccent,
            color: theme.primaryAccent,
          },
          "&.Mui-selected": {
            backgroundColor: theme.primaryAccent + "22",
            color: theme.primaryAccent,
          },
        },
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
      name: projectName,
      description,
      skills: skillset,
      isInProgress: isProgress,
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
            onChange={e => setProjectName(e.target.value)}
            sx={{"& .MuiInputBase-input": {
              color: theme.primaryText, // input text color
              "&::placeholder": {
                  color: theme.secondaryText, // placeholder color
                  opacity: 1, // ensures custom color shows
              },
          },
          "& .MuiInputLabel-root": {
              color: theme.secondaryText, // default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: theme.primaryAccent, // focused label color
          },
          "& .MuiOutlinedInput-root": {
              "& fieldset": {
                  borderColor: theme.primaryAccent, // default border
              },
              "&:hover fieldset": {
                  borderColor: theme.hoverAccent, // hover border
              },
              "&.Mui-focused fieldset": {
                  borderColor: theme.primaryAccent, // focus border
              },
          },
          '& label.Mui-focused':{ //label on clicking
            color:theme.primaryAccent
          },
          '&:hover label:not(.Mui-focused)':{
            color:theme.primaryAccent
          },
          "& .MuiFormHelperText-root": {
                color: theme.secondaryText,
              },
        }}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField variant='outlined' label='Description' rows={6} multiline fullWidth
            helperText="Give us details about the project here." value={description}
            onChange={e => setDescription(e.target.value)}
            sx={{"& .MuiInputBase-input": {
              color: theme.primaryText, // input text color
              "&::placeholder": {
                  color: theme.secondaryText, // placeholder color
                  opacity: 1, // ensures custom color shows
              },
          },
          "& .MuiInputLabel-root": {
              color: theme.secondaryText, // default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: theme.primaryAccent, // focused label color
          },
          "& .MuiOutlinedInput-root": {
              "& fieldset": {
                  borderColor: theme.primaryAccent, // default border
              },
              "&:hover fieldset": {
                  borderColor: theme.hoverAccent, // hover border
              },
              "&.Mui-focused fieldset": {
                  borderColor: theme.primaryAccent, // focus border
              },
          },
          '& label.Mui-focused':{ //label on clicking
            color:theme.primaryAccent
          },
          '&:hover label:not(.Mui-focused)':{
            color:theme.primaryAccent
          },
          "& .MuiFormHelperText-root": {
                color: theme.secondaryText,
              },
        }}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <FormControl sx={{ width:'100%',
            "& .MuiInputBase-input": {
                  color: theme.primaryText, // input text color
                  "&::placeholder": {
                      color: theme.secondaryText, // placeholder color
                      opacity: 1, // ensures custom color shows
                  },
              },
              "& .MuiInputLabel-root": {
                  color: theme.secondaryText, // default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.primaryAccent, // focused label color
              },
              "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                      borderColor: theme.primaryAccent, // default border
                  },
                  "&:hover fieldset": {
                      borderColor: theme.hoverAccent, // hover border
                  },
                  "&.Mui-focused fieldset": {
                      borderColor: theme.primaryAccent, // focus border
                  },
              },
              '& label.Mui-focused':{ //label on clicking
                color:theme.primaryAccent
              },
              '&:hover label:not(.Mui-focused)':{
                color:theme.primaryAccent
              },
              '& .MuiSelect-select':{
                color:theme.primaryText,
                background:theme.primaryBg
              },
              "& .MuiMenuItem-root": {
                color: theme.primaryText,
                "&:hover": {
                  backgroundColor: theme.hoverAccent,
                  color: theme.primaryAccent,
                },
                "&.Mui-selected": {
                  backgroundColor: theme.primaryAccent + "22", // translucent highlight
                  color: theme.primaryAccent,
                },
              },
              "& .MuiFormHelperText-root": {
                color: theme.secondaryText,
              },
              "& .MuiSelect-icon": {
                color: theme.primaryText, // arrow color
              },
              "& .MuiSelect-iconOpen": {
                color: theme.hoverAccent,   // when dropdown is open
              },
            }}>
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
                  <Checkbox checked={skillset.includes(name)} 
                  sx={{
                    color: theme.secondaryText,
                    "&.Mui-checked": {
                      color: theme.primaryAccent,
                    },
                  }}/>
                  <ListItemText primary={name} 
                  slotProps={{
                    primary:{
                      sx:{color: theme.primaryText}
                    }
                  }}/>
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
              color: theme.primaryText,
              '&.Mui-checked': {
                color: theme.primaryAccent,
              },
              '&:hover': {
                color: theme.primaryAccent,   
                bgcolor: 'transparent',        
              }
            }}/>
            <Box component='span' sx={{color: theme.secondaryText}}>Currently Working on this Project</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate} theme={theme}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isProgress} theme={theme}/>
        </Grid>
        <Grid size={12}>
          <Box>
          <FormControl fullWidth sx={{"& .MuiInputBase-input": {
                  color: theme.primaryText, // input text color
                  "&::placeholder": {
                      color: theme.secondaryText, // placeholder color
                      opacity: 1, // ensures custom color shows
                  },
              },
              "& .MuiInputLabel-root": {
                  color: theme.secondaryText, // default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.primaryAccent, // focused label color
              },
              "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                      borderColor: theme.primaryAccent, // default border
                  },
                  "&:hover fieldset": {
                      borderColor: theme.hoverAccent, // hover border
                  },
                  "&.Mui-focused fieldset": {
                      borderColor: theme.primaryAccent, // focus border
                  },
              },
              '& label.Mui-focused':{ //label on clicking
                color:theme.primaryAccent
              },
              '&:hover label:not(.Mui-focused)':{
                color:theme.primaryAccent
              },
              '& .MuiSelect-select':{
                color:theme.primaryText,
                background:theme.primaryBg
              },
              "& .MuiMenuItem-root": {
                color: theme.primaryText,
                "&:hover": {
                  backgroundColor: theme.hoverAccent,
                  color: theme.primaryAccent,
                },
                "&.Mui-selected": {
                  backgroundColor: theme.primaryAccent + "22", // translucent highlight
                  color: theme.primaryAccent,
                },
              },
              "& .MuiFormHelperText-root": {
                color: theme.secondaryText,
              },
              "& .MuiSelect-icon": {
                color: theme.primaryText, // arrow color
              },
              "& .MuiSelect-iconOpen": {
                color: theme.hoverAccent,   // when dropdown is open
              },
            }}>
            <InputLabel id="demo-simple-select-label">Project Associated with</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={org}
              label="Project Associated with"
              onChange={handleChangeOrg}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: theme.primaryBg,
                    "& .MuiMenuItem-root": {
                      color: theme.primaryText,
                      "&:hover": {
                        backgroundColor: theme.hoverAccent,
                        color: theme.primaryAccent,
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.primaryAccent + "22",
                        color: theme.primaryAccent,
                      },
                    },
                  },
                },
              }}
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
            <Box component='span' sx={{color: theme.secondaryText, textAlign:'center',width:'100%'}}>
              This is a Standalone Project
            </Box>
          ):(
            <FormControl sx={{ width:'100%',
              "& .MuiInputBase-input": {
              color: theme.primaryText, // input text color
              "&::placeholder": {
                  color: theme.secondaryText, // placeholder color
                  opacity: 1, // ensures custom color shows
              },
          },
          "& .MuiInputLabel-root": {
              color: theme.secondaryText, // default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: theme.primaryAccent, // focused label color
          },
          "& .MuiOutlinedInput-root": {
              "& fieldset": {
                  borderColor: theme.primaryAccent, // default border
              },
              "&:hover fieldset": {
                  borderColor: theme.hoverAccent, // hover border
              },
              "&.Mui-focused fieldset": {
                  borderColor: theme.primaryAccent, // focus border
              },
          },
          '& label.Mui-focused':{ //label on clicking
            color:theme.primaryAccent
          },
          '&:hover label:not(.Mui-focused)':{
            color:theme.primaryAccent
          },
          '& .MuiSelect-select':{
            color:theme.primaryText,
            background:theme.primaryBg
          },
          "& .MuiMenuItem-root": {
            color: theme.primaryText,
            "&:hover": {
              backgroundColor: theme.hoverAccent,
              color: theme.primaryAccent,
            },
            "&.Mui-selected": {
              backgroundColor: theme.primaryAccent + "22", // translucent highlight
              color: theme.primaryAccent,
            },
          },
          "& .MuiFormHelperText-root": {
            color: theme.secondaryText,
          },
          "& .MuiSelect-icon": {
            color: theme.primaryText, // arrow color
          },
          "& .MuiSelect-iconOpen": {
            color: theme.hoverAccent,   // when dropdown is open
          },
        }}>
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
                    <Checkbox checked={assn.includes(name)} 
                    sx={{
                      color: theme.secondaryText,
                      "&.Mui-checked": {
                        color: theme.primaryAccent,
                      },
                    }}/>
                    <ListItemText primary={name} 
                    slotProps={{
                      primary:{
                        sx:{color: theme.primaryText}
                      }
                    }}/>
                  </MenuItem>
                )): org === "Educational Project" ?
                college.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={assn.includes(name)} 
                    sx={{
                      color: theme.secondaryText,
                      "&.Mui-checked": {
                        color: theme.primaryAccent,
                      },
                    }}/>
                    <ListItemText primary={name} 
                    slotProps={{
                      primary:{
                        sx:{color: theme.primaryText}
                      }
                    }}/>
                  </MenuItem>
                )) : (
                  <MenuItem disabled value="">
                    <ListItemText primary="No option selected"
                    slotProps={{
                      primary:{
                        sx:{color: theme.primaryText}
                      }
                    }}/>
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
            helperText='Enter the URL of the hosted project' value={link} onChange={e => setLink(e.target.value)}
            sx={{"& .MuiInputBase-input": {
              color: theme.primaryText, // input text color
              "&::placeholder": {
                  color: theme.secondaryText, // placeholder color
                  opacity: 1, // ensures custom color shows
              },
          },
          "& .MuiInputLabel-root": {
              color: theme.secondaryText, // default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: theme.primaryAccent, // focused label color
          },
          "& .MuiOutlinedInput-root": {
              "& fieldset": {
                  borderColor: theme.primaryAccent, // default border
              },
              "&:hover fieldset": {
                  borderColor: theme.hoverAccent, // hover border
              },
              "&.Mui-focused fieldset": {
                  borderColor: theme.primaryAccent, // focus border
              },
          },
          '& label.Mui-focused':{ //label on clicking
            color:theme.primaryAccent
          },
          '&:hover label:not(.Mui-focused)':{
            color:theme.primaryAccent
          },
          "& .MuiFormHelperText-root": {
                color: theme.secondaryText,
              },
        }}/>
          </Box>
        </Grid>
        <Grid size={12}>
          <Divider color={theme.secondaryText}/><br />
            <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'},gap:1}}>
              <Button variant='outlined' size='large' startIcon={<List/>} onClick={handleClickPortal}
                sx={{
                    color:theme.primaryAccent,
                    borderColor:theme.primaryAccent,
                    '&:hover':{
                      backgroundColor:theme.hoverAccent,
                      borderColor:theme.hoverAccent,
                      color:theme.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      list
                    </Box></Button>
                    <Button variant='outlined' size='large' startIcon={<Save/>} onClick={handleSave}
                sx={{
                    color:theme.primaryAccent,
                    borderColor:theme.primaryAccent,
                    '&:hover':{
                      backgroundColor:theme.hoverAccent,
                      borderColor:theme.hoverAccent,
                      color:theme.primaryBg
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
