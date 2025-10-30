import { Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useThemeContext } from './ThemeContext'
import { DatePickerUi } from './DatePickerUi'
import { Delete, Save } from '@mui/icons-material'
import axios from 'axios'

export const EditExp = ({experience, setExperience, handleCloseModal, skills}) => {
    const {theme} = useThemeContext()

    // Select Experience index
    const [selectedIndex, setSelectedIndex] = useState(null)

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

    const handleChangeSkills = (event) => {
    const {
        target: { value },
    } = event;
    setSkillset(
        typeof value === 'string' ? value.split(',') : value,
    );
    };

    // Select Experience
    const handleSelectExperience = (event) => {
        const index = event.target.value
        setSelectedIndex(index)
        const exp = experience[index]
        if (exp) {
            setTitle(exp.title)
            setEmpType(exp.empType)
            setCompany(exp.company)
            setLocation(exp.location)
            setLocType(exp.locType)
            setIsCurrentRole(exp.isCurrentRole ?? true)
            setStartDate(exp.startDate)
            setEndDate(exp.endDate)
            setSkillset(exp.skills)
        }
    }

    // save button
    const [saveLoading, setSaveLoading] = useState(false)
    const handleSave = async () => {
      if (selectedIndex === null) {
        setError("Select existing experience to update")
        setOpen(true)
        return
      }

      const selectedExp = experience[selectedIndex]

      const exp = {
        title,
        empType: EmpType,
        company,
        isCurrentRole,
        startDate,
        endDate,
        skills: skillset,
        location,
        locType: LocType
      }

      setSaveLoading(true)
      try {
        const response = await axios.put(`http://localhost:2000/profile/update/experience/${selectedExp._id}`,exp,{
          headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
        })

        const updated = [...experience]
        updated[selectedIndex] = response.data.updatedExperience
        setExperience(updated)
      } catch (error) {
        setError('Unable to update selected Experience')
        setOpen(true)
      } finally {
        setSaveLoading(false)
        handleCloseModal()
      }
    }

    const handleDelete = async () => {
      if (selectedIndex !== null) {
        const selectedExp = experience[selectedIndex]
        setLoading(true)

        try {
          await axios.delete(`http://localhost:2000/profile/delete/experience/${selectedExp._id}`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
          })

          const updated = [...experience]
          updated.splice(selectedIndex,1)
          setExperience(updated)
        } catch (error) {
          setError("Error while deleting selected experience")
          setOpen(true)
        } finally {
          setLoading(false)
          handleCloseModal()
        }
      }
    }

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
  
    setOpen(false);
    };

  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
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
            <InputLabel id="demo-simple-select-label">Select Experience</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedIndex !== null ? selectedIndex : ''}
              label="Select Experience"
              onChange={handleSelectExperience}
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
              {experience.map((type,index) => (
                <MenuItem key={index} value={index}>{type.title} at {type.company}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the experience you want to edit or delete</FormHelperText>
          </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Title' placeholder='Ex: Software Engineer, Web Developer, etc.' fullWidth
            helperText='Enter the Job Title from Previous Role' value={title} onChange={e => setTitle(e.target.value)}
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
            <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={EmpType}
              label="Employee Type"
              onChange={handleChange}
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
            helperText='Enter the previous company name' value={company} onChange={e => setCompany(e.target.value)}
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
          <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <Checkbox {...label} checked={isCurrentRole} 
            onChange={(e) => setIsCurrentRole(e.target.checked)}
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
            <Box component='span' sx={{color: theme.secondaryText}}>Currently Working on this Role</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate} theme={theme}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isCurrentRole} theme={theme}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
          <Box>
            <TextField label='Location' placeholder='Ex: Nagercoil, Tamil-Nadu' fullWidth 
            helperText='Previous job Location' value={location} onChange={e => setLocation(e.target.value)}
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
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
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
            <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={LocType}
              label="Employee Type"
              onChange={handleChangelt}
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
              {LOCTYPE.map((type,index) => (
                <MenuItem key={index} value={type.value}>{type.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Previous job location type</FormHelperText>
          </FormControl>
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
          <Divider/><br />
            <Box sx={{display:'flex',justifyContent:{lg:'flex-end',md:'flex-end',sm:'flex-end',xs:'center'},gap:1}}>
              <Button variant='outlined' size='large' onClick={handleDelete}
              startIcon={loading ? <CircularProgress size={24} color="inherit"/> :<Delete/>} 
                sx={{
                    color:theme.error,
                    borderColor:theme.error,
                    '&:hover':{
                      backgroundColor:theme.errorHover,
                      borderColor:theme.errorHover,
                      color:theme.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      {loading ? "Deleting..." : "Delete"}
                    </Box></Button>
                    <Button variant='outlined' size='large' onClick={handleSave}
                    startIcon={saveLoading ? <CircularProgress size={24} color="inherit"/> : <Save/>}
                    sx={{
                        color:theme.primaryAccent,
                        borderColor:theme.primaryAccent,
                        '&:hover':{
                        backgroundColor:theme.hoverAccent,
                        borderColor:theme.hoverAccent,
                        color:theme.primaryBg
                        }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      {saveLoading ? "Saving..." : "save"}
                    </Box></Button>
            </Box>
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
