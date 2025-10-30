import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { DEGREE } from './degree';
import { ListEdu } from './ListEdu';
import { List, Save } from '@mui/icons-material';
import { DatePickerUi } from './DatePickerUi';
import { useThemeContext } from './ThemeContext';

export const AddEdu = ({education, setEducation, handleCloseModal}) => {
  const {theme} = useThemeContext()
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

  // List portal
    const [showPortal, setShowPortal] = useState(false);
    const container = useRef(null);
  
    const handleClickPortal = () => {setShowPortal(!showPortal)};

  // save button
    const handleSave = () => {
      const edu = {
        institute: college,
        degree: Degree,
        fieldOfStudy: Field,
        isStudying,
        startDate,
        endDate,
        grade
      }
      setEducation([...education,edu])
      handleCloseModal()
    }
  
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
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
                <ListEdu education={education}/>
              </Portal>
            ) : null}
            <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
