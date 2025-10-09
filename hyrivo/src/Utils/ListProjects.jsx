import { Box, Chip, Grid, Link, Stack } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'
import { LinkRounded, Star } from '@mui/icons-material'

export const ListProjects = ({ projects }) => {
  const {theme} = useThemeContext()
  return (
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
        {!projects || projects.length === 0 ? (
          <Grid size={12} sx={{textAlign:'center'}}>
            <Box component='span'>No Projects Added</Box>
          </Grid>
        ):(
        <Grid size={12}>
          {projects.map((data,index) => (
            <Box key={index} sx={{m:1,p:1,background:theme.secondaryBg,borderRadius:2}}>
              <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18},color:theme.primaryText}}>{data.name}</Box><br />
              <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>
                Associated with {data.assn} as a {data.org}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>
                {data.startDate ? new Date(data.startDate).toLocaleDateString() : "N/A" } - {data.isinProgress ? "Present" : data.endDate ? new Date(data.endDate).toLocaleDateString() : "Present"}
                </Box><br /><br />
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18},color:theme.primaryText}}>About Project</Box><br />
              <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText, whiteSpace: 'pre-line', wordBreak:'break-word'}}>
                {data.description}</Box><br /><br />
                <Box component='span' sx={{display:'flex',gap:2,fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>
                <LinkRounded/> - <Link sx={{textDecoration:'none',color:theme.primaryAccent,
                      '&:hover':{color:theme.hoverAccent}
                    }}>{data.link}</Link>
                </Box><br />
              <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.primaryAccent}}><Star/></Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>-</Box><br />
                  {data.skills && data.skills.length > 0 && (
                    <Stack direction='row'
                      sx={{display:'flex', flexWrap:'wrap',
                      gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                        {data.skills.map((skill, index) => (
                          <Chip key={index} label={skill} 
                          sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
                        ))}
                    </Stack>
                  )}
              </Box><br />
            </Box>
          ))}
        </Grid>
        )}
      </Grid>
    </Box>
  )
}
