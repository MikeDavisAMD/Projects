import { Box, Chip, Grid, Link, Stack } from '@mui/material'
import React from 'react'
import { COLORS } from './colors'

export const ListCert = ({certificates}) => {
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
              <Box key={index} sx={{m:1, p:1, background:COLORS.secondaryBg, borderRadius:2}}>
                <Box component='span' sx={{fontWeight:'bolder',fontSize:{lg:22,md:22,sm:20,xs:18}}}>{data.cname}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>Issued By {data.issuedBy}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>Credential ID - {data.credID}</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:12,xs:13}, color:COLORS.secondaryText}}>Credential URL - 
                  <Link sx={{pl:0.5}}>{data.credURL}</Link></Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>Issued On - {data.IssueDate ? data.IssueDate.toLocaleDateString() : "N/A" }</Box><br />
                <Box component='span' sx={{fontSize: {lg:15,md:15,sm:13,xs:13}, color:COLORS.secondaryText}}>{data.isexpiry ? "" : `Expires On - ${data.ExpiryDate ? data.ExpiryDate.toLocaleDateString() : "N/A"}`}</Box><br />
                {data.skills && data.skills.length > 0 && (
                  <Stack direction='row' flexWrap='wrap' gap={1} justifyContent='center'
                    sx={{display:'grid',gridTemplateColumns:{lg:'repeat(4, 1fr)',md:'repeat(4, 1fr)',sm:'repeat(3, 1fr)',xs:'repeat(2, 1fr)'}, 
                    gap:{lg:2,md:2,sm:2,xs:0.5}, maxHeight:'150px', overflowY:'auto',p:0.5}}>
                      {data.skills.map((skill, index) => (
                        <Chip key={index} label={skill} 
                        sx={{ backgroundColor: COLORS.cardBg, color:COLORS.primaryText, border:`1px solid ${COLORS.cardBorder}` }}/>
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
