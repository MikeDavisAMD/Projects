import { PeopleAlt, PersonAdd } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Grid, Paper } from '@mui/material';
import React, { useState } from 'react'
import { useThemeContext } from '../Utils/ThemeContext';

const CONNECTCARD = ({theme}) => {
  return (
    <>
      <style>{`
        .card {
          width: 290px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 10px;
          background: ${theme.cardBg};
          border-radius: 15px;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: "";
          width: 350px;
          height: 100px;
          position: absolute;
          top: 0;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-bottom: 3px solid ${theme.hoverAccent};
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);;
          transition: all 0.5s ease;
        }

        .card * {
          z-index: 1;
        }

        .image {
          width: 90px;
          height: 90px;
          background-color: #1468BF;
          border-radius: 50%;
          border: 4px solid ${theme.hoverAccent};
          margin-top: 30px;
          transition: all 0.5s ease;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          transition: all 0.5s ease;
        }

        .card-info span {
          font-weight: 600;
          font-size: 24px;
          color: ${theme.primaryText};
          margin-top: 15px;
          line-height: 5px;
        }

        .card-info div {
          font-size: 12px;
          color: ${theme.secondaryText};
        }

        .card-info .industry {
          font-size: 15px;
          color: ${theme.secondaryText};
        }

        .card-info p {
          color: ${theme.secondaryText};
        }

        .button {
          text-decoration: none;
          background-color: ${theme.primaryAccent};
          color: white;
          padding: 5px 20px;
          border-radius: 5px;
          border: 1px solid white;
          transition: all 0.5s ease;
        }

        .card:hover::before {
          width: 290px;
          height: 320px;
          background: ${theme.cardBg};
          border-bottom: none;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          transform: scale(0.95);
        }

        .card:hover .card-info {
          transform: translate(0%,-25%);
        }

        .card:hover .image {
          transform: scale(2) translate(-60%,-40%);
          background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
        }

        .button:hover {
          background-color: ${theme.hoverAccent};
          transform: scale(1.1);
        }
      `}</style>

      <div class="card">
        <div class="image"></div>
        <div class="card-info">
          <span>George Johnson</span>
          <div>Support Specialist</div>
          <p>Description</p>
        </div>
        <a href="#" class="button">Connect</a>
      </div>
    </>
  )
}

export const Connections = () => {
  const {theme} = useThemeContext()
  const [value, setValue] = useState(0)
  return (
    <Box sx={{flexGrow:1,pt:{lg:9, md:8, sm:8, xs:7},pb: '80px',minHeight: '100vh',
    backgroundColor:theme.primaryBg, color: theme.primaryText}}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:2, backgroundColor:theme.primaryBg, color: theme.primaryText }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {setValue(newValue)}}
            sx={{
              backgroundColor:theme.primaryBg,
              '& .Mui-selected': {
                color: theme.primaryAccent,
                '& .MuiSvgIcon-root': {
                  color: theme.primaryAccent, 
                },
              },
              '& .MuiBottomNavigationAction-root': {
                color: theme.secondaryText,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: theme.hoverAccent,
                }
              }
            }}
          >
            <BottomNavigationAction label="Connect" icon={<PersonAdd/>} />
            <BottomNavigationAction label="Connections" icon={<PeopleAlt />} />
          </BottomNavigation>
        </Paper>
      {value === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',p:2,gap:2}}>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
              <CONNECTCARD theme={theme}/>
            </Box>
          </Grid>
        </Grid>
      )}
      {value === 1 && (
        <Grid container spacing={2}>
          <Grid size={4}>
            drawer
          </Grid>
          <Grid size={8}>
            content
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
