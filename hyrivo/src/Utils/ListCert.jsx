import { Box, Chip, Grid, Link, Stack } from '@mui/material'
import React from 'react'
import { useThemeContext } from './ThemeContext'

export const ListCert = ({certificates}) => {
  const {theme} = useThemeContext()
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        {!certificates || certificates.length === 0 ? (
          <Grid size={12} sx={{textAlign: 'center'}}>
            <Box component='span'>No Certificates or license Added</Box>
          </Grid>
        ):(
          <Grid size={12}>
            {certificates.map((data, index) => (
              <Box key={index} sx={{m:1, p:1, background:theme.secondaryBg, borderRadius:2}}>
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18},color:theme.primaryText}}>{data.name}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>Issued By {data.issuingOrg}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>Credential ID - {data.credId}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:theme.secondaryText}}>Credential URL - 
                  <Link sx={{pl:0.5}}>{data.credUrl}</Link></Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>Issued On - {data.issueDate ? new Date(data.issueDate).toLocaleDateString() : "N/A" }</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:theme.secondaryText}}>{data.hasNoExpiry ? "" : `Expires On - ${data.expiryDate ? new Date(data.expiryDate).toLocaleDateString() : "N/A"}`}</Box><br />
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
              </Box>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
