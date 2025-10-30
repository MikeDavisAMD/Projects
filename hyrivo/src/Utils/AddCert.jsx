import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Portal, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { DatePickerUi } from './DatePickerUi'
import { List, Save } from '@mui/icons-material'
import { ListCert } from './ListCert'
import { useThemeContext } from './ThemeContext'

export const AddCert = ({ certificates, setCertificates, handleCloseModal, skills }) => {
  const { theme } = useThemeContext()
  // Certificate Name
  const [cname, setCName] = useState('')

  // issued organization
  const [issuedBy, setIssuedBy] = useState('')

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

  // Credential ID
  const [credID, setCredID] = useState('')

  // credential URL
  const [credURL, setCredURL] = useState('')

  // save button function
  const handleSave = () => {
    const cert = {
      name: cname,
      issuingOrg: issuedBy,
      hasNoExpiry: isexpiry,
      issueDate: IssueDate,
      expiryDate: ExpiryDate,
      credId: credID,
      credUrl: credURL,
      skills: skillset
    }

    setCertificates([...certificates, cert])
    handleCloseModal()
  }

  // List portal
  const [showPortal, setShowPortal] = useState(false);
  const container = useRef(null);

  const handleClickPortal = () => { setShowPortal(!showPortal); };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <TextField label='Certificate or License Name' placeholder='Full Name of the certification or license as per the issued organization' fullWidth
              helperText='Enter the Full Name of the certification or license as per the issued organization'
              value={cname} onChange={e => setCName(e.target.value)}
              sx={{
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
                '& label.Mui-focused': { //label on clicking
                  color: theme.primaryAccent
                },
                '&:hover label:not(.Mui-focused)': {
                  color: theme.primaryAccent
                },
                "& .MuiFormHelperText-root": {
                  color: theme.secondaryText,
                },
              }} />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Issuing Organization' placeholder='Ex: ABC organization, City, State, Country' fullWidth
              helperText='Enter the name of the Organization that issued certificate or license with location'
              value={issuedBy} onChange={e => setIssuedBy(e.target.value)}
              sx={{
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
                '& label.Mui-focused': { //label on clicking
                  color: theme.primaryAccent
                },
                '&:hover label:not(.Mui-focused)': {
                  color: theme.primaryAccent
                },
                "& .MuiFormHelperText-root": {
                  color: theme.secondaryText,
                },
              }} />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox {...label} checked={isexpiry}
              onChange={(e) => setIsExpiry(e.target.checked)}
              sx={{
                color: theme.primaryText,
                '&.Mui-checked': {
                  color: theme.primaryAccent,
                },
                '&:hover': {
                  color: theme.primaryAccent,
                  bgcolor: 'transparent',
                }
              }} />
            <Box component='span' sx={{ color: theme.secondaryText }}>Has no Expiration</Box>
          </Box>
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
          <DatePickerUi label='Issue Date' value={IssueDate} onChange={setIssueDate} theme={theme} />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
          <DatePickerUi label='Expiry Date' value={ExpiryDate} onChange={setExpiryDate} disabled={isexpiry} theme={theme} />
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Credential ID' placeholder='Ex: ABC123456' fullWidth
              helperText='Enter the Credential ID as in the certificate or license'
              value={credID} onChange={e => setCredID(e.target.value)}
              sx={{
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
                '& label.Mui-focused': { //label on clicking
                  color: theme.primaryAccent
                },
                '&:hover label:not(.Mui-focused)': {
                  color: theme.primaryAccent
                },
                "& .MuiFormHelperText-root": {
                  color: theme.secondaryText,
                },
              }} />
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <TextField label='Credential URL' placeholder='Ex: https//:credentialurl.com' fullWidth
              helperText='Enter the Credential URL as in the certificate or license'
              value={credURL} onChange={e => setCredURL(e.target.value)}
              sx={{
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
                '& label.Mui-focused': { //label on clicking
                  color: theme.primaryAccent
                },
                '&:hover label:not(.Mui-focused)': {
                  color: theme.primaryAccent
                },
                "& .MuiFormHelperText-root": {
                  color: theme.secondaryText,
                },
              }} />
          </Box>
        </Grid>
        <Grid size={12}>
          <FormControl sx={{
            width: '100%',
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
            '& label.Mui-focused': { //label on clicking
              color: theme.primaryAccent
            },
            '&:hover label:not(.Mui-focused)': {
              color: theme.primaryAccent
            },
            '& .MuiSelect-select': {
              color: theme.primaryText,
              background: theme.primaryBg
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
                    }} />
                  <ListItemText primary={name}
                    slotProps={{
                      primary: {
                        sx: { color: theme.primaryText }
                      }
                    }} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Skills that you added only will be listed</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Divider color={theme.secondaryText} /><br />
          <Box sx={{ display: 'flex', justifyContent: { lg: 'flex-end', md: 'flex-end', sm: 'flex-end', xs: 'center' }, gap: 1 }}>
            <Button variant='outlined' size='large' startIcon={<List />} onClick={handleClickPortal}
              sx={{
                color: theme.primaryAccent,
                borderColor: theme.primaryAccent,
                '&:hover': {
                  backgroundColor: theme.hoverAccent,
                  borderColor: theme.hoverAccent,
                  color: theme.primaryBg
                }
              }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                list
              </Box></Button>
            <Button variant='outlined' size='large' startIcon={<Save />} onClick={handleSave}
              sx={{
                color: theme.primaryAccent,
                borderColor: theme.primaryAccent,
                '&:hover': {
                  backgroundColor: theme.hoverAccent,
                  borderColor: theme.hoverAccent,
                  color: theme.primaryBg
                }
              }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                save
              </Box></Button>
          </Box>
          {showPortal ? (
            <Portal container={() => container.current}>
              <br />
              <ListCert certificates={certificates} />
            </Portal>
          ) : null}
          <Box ref={container} />
        </Grid>
      </Grid>
    </Box>
  )
}
