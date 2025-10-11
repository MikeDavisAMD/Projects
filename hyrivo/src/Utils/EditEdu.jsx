import React, { useState } from 'react'
import { useThemeContext } from './ThemeContext';
import { DEGREE } from './degree';
import { Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { Delete, Save } from '@mui/icons-material';
import { DatePickerUi } from './DatePickerUi';
import axios from 'axios';

export const EditEdu = ({ education, setEducation, handleCloseModal }) => {
    const {theme} = useThemeContext()

    // Select Education index
    const [selectedIndex, setSelectedIndex] = useState(null)

    // college name
    const [college, setCollege] = useState('')

    // Degree and field of study type
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

    // Grade
    const [grade, setGrade] = useState('')

    // Select Experience
    const handleSelectEducation = (event) => {
        const index = event.target.value
        setSelectedIndex(index)
        const edu = education[index]
        if (edu) {
            setCollege(edu.institute)
            setDegree(edu.degree)
            setField(edu.fieldOfStudy)
            setIsStudying(edu.isStudying)
            setStartDate(edu.startDate)
            setEndDate(edu.endDate)
            setGrade(edu.grade)
        }
    }

    // save button
    const handleSave = async () => {
      if (selectedIndex === null) {
        setError("Select existing education to update")
        setOpen(true)
        return
      }

      const selectedEdu = education[selectedIndex]

      const edu = {
        institute: college,
        degree: Degree,
        fieldOfStudy: Field,
        isStudying,
        startDate,
        endDate,
        grade
      }

      setLoading(true)
      try {
        const response = await axios.put(`http://localhost:2000/profile/update/education/${selectedEdu._id}`,edu,{
          headers: {Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
        })

        const updated = [...education]
        updated[selectedIndex] = response.data.updatedEducation
        setEducation(updated)
      } catch (error) {
        setError('Unable to update selected Education')
        setOpen(true)
      } finally {
        setLoading(false)
        handleCloseModal()
      }
    }

    // Delete button
    const handleDelete = async () => {
      if (selectedIndex !== null) {
        const selectedEdu = education[selectedIndex]
        setDLoading(true)

        try {
          await axios.delete(`http://localhost:2000/profile/delete/education/${selectedEdu._id}`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`}
          })

          const updated = [...education]
          updated.splice(selectedIndex,1)
          setEducation(updated)
        } catch (error) {
          setError("Error while deleting selected education")
          setOpen(true)
        } finally {
          setDLoading(false)
          handleCloseModal()
        }
      }
    }

    // Snackbar
    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [dLoading, setDLoading] = useState(false)
    
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
            <InputLabel id="demo-simple-select-label">Select Education</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedIndex !== null ? selectedIndex : ''}
                label="Select Education"
                onChange={handleSelectEducation}
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
                {education.map((type,index) => (
                <MenuItem key={index} value={index}>{type.degree}</MenuItem>
                ))}
            </Select>
            <FormHelperText>Select your education details to edit or delete</FormHelperText>
            </FormControl>
            </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='University or College or Institute' placeholder='Ex: ABC College, City, State, Country' fullWidth
            helperText='Enter the college/ university/ institute name with location' value={college} 
            onChange={e => setCollege(e.target.value)}
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
          <FormControl fullWidth
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
            <InputLabel id="demo-simple-select-label">Degree</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Degree}
              label="Degree"
              onChange={handleChangeDegree}
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
              helperText='Which field certification is done like IT, AI, Data Science, etc.' value={Field} 
              onChange={e => setField(e.target.value)}
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
              ):(
                <Box>
                <FormControl fullWidth disabled={!Degree || selectedDegree?.field.length === 0}
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
              "&.Mui-disabled fieldset": {
                borderColor: theme.primaryAccent, // keep border visible when disabled
              },
              "&.Mui-disabled .MuiSelect-select": {
                color: theme.primaryText,         // keep selected value visible
              },
            }}>
              <InputLabel id="demo-simple-select-label">{selectedDegree?.field?.length === 0 ? "No Field" : "Field of study"}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Field}
                label={selectedDegree?.field?.length === 0 ? "No Field" : "Field of study"}
                onChange={handleChangeField}
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
              color: theme.primaryText,
              '&.Mui-checked': {
                color: theme.primaryAccent,
              },
              '&:hover': {
                color: theme.primaryAccent,   
                bgcolor: 'transparent',        
              }
            }}/>
            <Box component='span' sx={{color:theme.secondaryText}}>Currently Pursuing this degree</Box>
          </Box>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='Start Date' value={startDate} onChange={setStartDate} theme={theme}/>
        </Grid>
        <Grid size={{lg:6,md:6,sm:12,xs:12}}>
            <DatePickerUi label='End Date' value={endDate} onChange={setEndDate} disabled={isStudying} theme={theme}/>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label={isStudying ? 'Studying' : 'Grade'} placeholder='Enter the Grade' fullWidth
            helperText='Enter the Grade Out of 10' disabled={isStudying} value={grade} 
            onChange={e => setGrade(e.target.value)}
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
              <Button variant='outlined' size='large' onClick={handleDelete}
              startIcon={dLoading ? <CircularProgress size={24} color="inherit"/> : <Delete/>} 
                sx={{
                    color:theme.error,
                    borderColor:theme.error,
                    '&:hover':{
                      backgroundColor:theme.errorHover,
                      borderColor:theme.errorHover,
                      color:theme.primaryBg
                    }
                  }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                      {dLoading ? 'deleting...' : 'delete'}
                    </Box></Button>
                    <Button variant='outlined' size='large' onClick={handleSave}
                    startIcon={loading ? <CircularProgress size={24} color="inherit"/> : <Save/>} 
                    sx={{
                        color:theme.primaryAccent,
                        borderColor:theme.primaryAccent,
                        '&:hover':{
                          backgroundColor:theme.hoverAccent,
                          borderColor:theme.hoverAccent,
                          color:theme.primaryBg
                        }
                      }}><Box sx={{display:'flex',alignItems:'center',gap:1}}>
                          {loading ? 'saving...' : 'save'}
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
