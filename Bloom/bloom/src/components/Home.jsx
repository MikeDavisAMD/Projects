import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Image from '../Assets/Images/image1.jpg'
import facebook from '../Assets/Images/fb.png'
import twitter from '../Assets/Images/twitter.png'
import rss from '../Assets/Images/rss.png'
import gplus from '../Assets/Images/google.png'

export const Home = () => {
  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{display:"flex",flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"},height:{lg:"400px",md:"430px",sm:"610px",xs:"805px"},backgroundColor:"#E6E0E0"}}>
          <Grid item lg={6} md={6} sm={6} xs={12} sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px",paddingTop:"50px"}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
            <Box sx={{fontSize:"20px",marginLeft:"55px",paddingTop:"20px"}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam aspernatur esse nisi impedit eius voluptatibus libero hic deserunt! Harum tenetur, cumque qui commodi assumenda veniam?
              </Typography>
            </Box>
            <Box sx={{fontSize:"20px",marginLeft:"55px",paddingTop:"20px"}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas repellendus earum recusandae maiores ullam, reprehenderit sequi quibusdam velit tenetur nesciunt.
              </Typography>
            </Box>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px",paddingTop:"20px"}}>
              <Button variant='contained' sx={{backgroundColor:"orange"}}>
                Learn more
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"300px"},overflow:"hidden"}}>
            <Box sx={{height:{lg:"200px",md:"150px",sm:"250px",xs:"300px"},marginLeft:"50px",paddingTop:{lg:"80px",md:"80px",sm:"50px",xs:"20px"},paddingRight:"50px"}}>
              <img src={Image} alt="" height="250px" width="100%"/>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{display:{lg:"none",md:"none",sm:"block",xs:"block"}}}>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px",paddingTop:{lg:"50px",md:"50px",sm:"10px",xs:"0px"}}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
            <Box sx={{fontSize:"20px",marginLeft:"55px",marginRight:"55px",paddingTop:"20px"}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam aspernatur esse nisi impedit eius voluptatibus libero hic deserunt! Harum tenetur, cumque qui commodi assumenda veniam?
              </Typography>
            </Box>
            <Box sx={{fontSize:"20px",marginLeft:"55px",marginRight:"55px",paddingTop:"20px"}}>
              <Typography variant='p'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas repellendus earum recusandae maiores ullam, reprehenderit sequi quibusdam velit tenetur nesciunt.
              </Typography>
            </Box>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px",paddingTop:"20px",paddingBottom:"10px"}}>
              <Button variant='contained' sx={{backgroundColor:"orange"}}>
                Learn more
              </Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{height:{lg:"530px",md:"450px",sm:"450px",xs:"1160px"},display:"flex",flexDirection:{lg:"row",md:"row",sm:"row",xs:"column"}}}>
          <Grid item lg={4} md={4} sm={6} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"440px"}}}>
            <Box sx={{marginLeft:"55px"}}>
              <h1>This is a heading</h1>
            </Box>
            <Box sx={{height:{lg:"200px",md:"150px",sm:"150px",xs:"150px"},width:{lg:"200px",md:"200px",sm:"200px",xs:"200px"},marginLeft:"55px",backgroundColor:"black"}}></Box>
            <Box sx={{marginLeft:"55px"}}>
              <h3>Aliquam et iaculis sapien</h3>
            </Box>
            <Box sx={{marginLeft:"55px",marginRight:"55px"}}>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, aspernatur.</p>
            </Box>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px"}}>
              <Button variant='contained' sx={{backgroundColor:"orange"}}>
                Learn more
              </Button>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"360px"}}}>
            <Box sx={{height:{lg:"200px",md:"150px",sm:"150px",xs:"150px"},width:{lg:"200px",md:"200px",sm:"200px",xs:"200px"},marginLeft:"55px",backgroundColor:"black",marginTop:{lg:"87px",md:"87px",sm:"87px",xs:"0px"}}}></Box>
            <Box sx={{marginLeft:"55px"}}>
              <h3>Aliquam et iaculis sapien</h3>
            </Box>
            <Box sx={{marginLeft:"55px",marginRight:"55px"}}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, aspernatur.</p>
            </Box>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px"}}>
              <Button variant='contained' sx={{backgroundColor:"orange"}}>
                Learn more
              </Button>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12} sx={{display:{lg:"block",md:"block",sm:"none",xs:"block"},maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"360px"}}}>
            <Box sx={{height:{lg:"200px",md:"150px",sm:"150px",xs:"150px"},width:{lg:"200px",md:"200px",sm:"200px",xs:"200px"},marginLeft:"55px",marginTop:{lg:"87px",md:"87px",sm:"87px",xs:"0px"},backgroundColor:"black"}}></Box>
            <Box sx={{marginLeft:"55px"}}>
              <h3>Aliquam et iaculis sapien</h3>
            </Box>
            <Box sx={{marginLeft:"55px",marginRight:"55px"}}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, aspernatur.</p>
            </Box>
            <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px"}}>
              <Button variant='contained' sx={{backgroundColor:"orange"}}>
                Learn more
              </Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"400px",xs:"none"},display:{lg:"none",md:"none",sm:"block",xs:"none"}}}>
        <Box sx={{height:"450px",marginLeft:"200px",width:"50%"}}>
          <Box sx={{height:{lg:"200px",md:"150px",sm:"150px",xs:"150px"},width:{lg:"200px",md:"200px",sm:"200px",xs:"200px"},marginLeft:"55px",backgroundColor:"black",marginTop:{lg:"55px",md:"87px",sm:"20px",xs:"0px"}}}></Box>
          <Box sx={{marginLeft:"55px"}}>
            <h3>Aliquam et iaculis sapien</h3>
          </Box>
          <Box sx={{marginLeft:"55px",marginRight:"55px"}}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, aspernatur.</p>
          </Box>
          <Box sx={{fontSize:"30px",fontWeight:"bold",marginLeft:"55px"}}>
            <Button variant='contained' sx={{backgroundColor:"orange"}}>
              Learn more
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{maxHeight:{lg:"300px",md:"300px",sm:"240px",xs:"auto"}}}>
        <Box sx={{display:"flex",flexDirection:{lg:"row",md:"row",sm:"row",xs:"column"},paddingTop:{lg:"25px",md:"25px"},height:{lg:"280px",md:"280px",sm:"280px",xs:"740px"},color:"white",backgroundColor:"#3F3E3E"}}>
            <Grid item lg={4} md={4} sm={6} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"240px"}}}>
              <Box sx={{marginLeft:"55px"}}>
                <Box>
                  <h2>Latest Posts</h2>
                </Box>
                <Box sx={{display:"flex",margin:"20px 0px"}}>
                  <Box sx={{height:"40px",width:"40px",borderRadius:"4px",backgroundColor:"white",color:"black"}}>
                    <h6 style={{margin:"0",paddingLeft:"8px"}}>JULY</h6>
                    <h3 style={{margin:"0",paddingLeft:"8px"}}>27</h3>
                  </Box>
                  <Box sx={{paddingLeft:"20px"}}>
                    <h4 style={{margin:"0"}}>Aliquam et iaculis sapien</h4>
                    <p style={{margin:"0",fontSize:"12px"}}>Vestibulum pulvinar tincident placerat</p>
                  </Box>
                </Box>
                <Box sx={{display:"flex",margin:"20px 0px"}}>
                  <Box sx={{height:"40px",width:"40px",borderRadius:"4px",backgroundColor:"white",color:"black"}}>
                    <h6 style={{margin:"0",paddingLeft:"8px"}}>JULY</h6>
                    <h3 style={{margin:"0",paddingLeft:"8px"}}>27</h3>
                  </Box>
                  <Box sx={{paddingLeft:"20px"}}>
                    <h4 style={{margin:"0"}}>Aliquam et iaculis sapien</h4>
                    <p style={{margin:"0",fontSize:"12px"}}>Vestibulum pulvinar tincident placerat</p>
                  </Box>
                </Box>
                <Box sx={{display:"flex",margin:"20px 0px"}}>
                  <Box sx={{height:"40px",width:"40px",borderRadius:"4px",backgroundColor:"white",color:"black"}}>
                    <h6 style={{margin:"0",paddingLeft:"8px"}}>JULY</h6>
                    <h3 style={{margin:"0",paddingLeft:"8px"}}>27</h3>
                  </Box>
                  <Box sx={{paddingLeft:"20px"}}>
                    <h4 style={{margin:"0"}}>Aliquam et iaculis sapien</h4>
                    <p style={{margin:"0",fontSize:"12px"}}>Vestibulum pulvinar tincident placerat</p>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={6} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"auto",xs:"280px"}}}>
              <Box sx={{margin:"0px 55px"}}>
                <Box>
                  <h2>About Us</h2>
                </Box>
                <Box sx={{fontSize:"12px"}}>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, vitae quaerat hic assumenda ipsa esse iusto deserunt error doloremque, accusantium illum aspernatur laudantium doloribus? Optio, laboriosam! Quam molestiae nesciunt laborum!</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In ea quo, enim cum id repellat.</p>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12} sx={{display:{lg:"block",md:"block",sm:"none",xs:"block"}}}>
              <Box sx={{marginLeft:"55px"}}>
                <Box><h2>Stay Connected</h2></Box>
                <Box>
                  <Box sx={{display:"flex",margin:"10px 0px"}}>
                    <img src={facebook} alt="" height="25px"/>
                    <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Facebook</p>
                  </Box>
                  <Box sx={{display:"flex",margin:"10px 0px"}}>
                    <img src={twitter} alt="" height="25px"/>
                    <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Twitter</p>
                  </Box>
                  <Box sx={{display:"flex",margin:"10px 0px"}}>
                    <img src={rss} alt="" height="25px"/>
                    <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>RSS</p>
                  </Box>
                  <Box sx={{display:"flex",margin:"10px 0px"}}>
                    <img src={gplus} alt="" height="25px"/>
                    <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Google+</p>
                  </Box>
                </Box>
              </Box>
            </Grid>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{maxHeight:{lg:"auto",md:"auto",sm:"240px",xs:"none"},display:{lg:"none",md:"none",sm:"block",xs:"none"},backgroundColor:"#3F3E3E",color:"white"}}>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Box><h2>Stay Connected</h2></Box>
          <Box>
            <Box sx={{display:"flex",margin:"10px 0px"}}>
              <img src={facebook} alt="" height="25px"/>
              <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Facebook</p>
            </Box>
            <Box sx={{display:"flex",margin:"10px 0px"}}>
              <img src={twitter} alt="" height="25px"/>
              <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Twitter</p>
            </Box>
            <Box sx={{display:"flex",margin:"10px 0px"}}>
              <img src={rss} alt="" height="25px"/>
              <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>RSS</p>
            </Box>
            <Box sx={{display:"flex",margin:"10px 0px"}}>
              <img src={gplus} alt="" height="25px"/>
              <p style={{margin:"0",paddingLeft:"20px",fontSize:"18px"}}>Google+</p>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{height:"80px",paddingTop:"20px",textAlign:"center"}}>
          <p>Copyright &#169; 2013. All rights reserved Bloom Web Designing</p>
        </Box>
      </Grid>
    </Grid>
  )
}
