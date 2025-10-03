import { Box, Chip, Divider, Grid, Link, Stack } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'

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
                <Divider color={theme.secondaryText}/><br />
                <Box component='span' sx={{fontSize: {lg:17,md:17,sm:14,xs:16}, fontWeight:'bolder',color:theme.primaryText}}>
                <u>Project Description</u></Box><br />
              <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText, whiteSpace: 'pre-line', wordBreak:'break-word'}}>
                {data.description}</Box><br /><br />
                <Divider color={theme.secondaryText}/><br />
              {data.skills && data.skills.length > 0 && (
                <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
                  sx={{display:'grid',gridTemplateColumns:{lg:'repeat(4, 1fr)',md:'repeat(4, 1fr)',sm:'repeat(3, 1fr)',xs:'repeat(2, 1fr)'}, 
                  gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                    {data.skills.map((skill, index) => (
                      <Chip key={index} label={skill} 
                      sx={{ backgroundColor: theme.cardBg, color:theme.primaryText, border:`1px solid ${theme.cardBorder}` }}/>
                    ))}
                </Stack>
              )}
              <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>
              Project Link - <Link sx={{textDecoration:'none',color:theme.primaryAccent,
                    '&:hover':{color:theme.hoverAccent}
                  }}>{data.link}</Link>
              </Box>
            </Box>
          ))}
        </Grid>
        )}
      </Grid>
    </Box>
  )
}
