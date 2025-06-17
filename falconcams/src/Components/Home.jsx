import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import camera from '../Assets/Images/HomeImages/Cameras.jpg'
import parts from '../Assets/Images/HomeImages/Parts.jpg'
import service from '../Assets/Images/HomeImages/Service.jpg'

export const Home = () => {
  const navigate = useNavigate()
  const [loggedIn,setLoggedIn]=useState(false)
    useEffect(() => {
      const isLoggedIn =()=>{
        setLoggedIn(sessionStorage.getItem('loggedIn') === 'true');
      };
      window.addEventListener('storage',isLoggedIn)
      isLoggedIn()
      return () =>{ 
        window.removeEventListener('storage',isLoggedIn) 
      }   
    },[]);
  const [data,setData]=useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/carousel.json")
      setData(Object.entries(response.data).map(([key,val])=>({firebaseKey:key,...val})))
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(()=>{fetchData()},[])
  return (
    <Grid container sx={{ backgroundColor: '#121B2B' }}>
      <Grid size={12}>
        <Box sx={{height:{lg:'610px',md:'610px',sm:'410px',xs:'610px'}}}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={data.length>1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {data.map((data,index)=>(
              <SwiperSlide key={index}>
                <Box sx={{height:{lg:'610px',md:'610px',sm:'410px',xs:'610px', color:'white'}}}>
                  <img src={data.img} alt="Images" height='610px' width='100%'/>
                  <Box sx={{position: 'absolute', bottom: 10, left: 10, width: '50%', background: 'rgba(18, 27, 43, 0.8)', padding: '20px',borderRadius:'10px',color: '#E0E0E0' }}>
                    <Typography variant='h4'>{data.title}</Typography>
                    <Typography variant='body2' sx={{ color: '#A0A0A0'}}>{data.desc}</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{height:{lg:'50px'},padding:'10px',background:'#121B2B',textAlign:'center',color:'#00FFE7'}}>
          <Typography variant='h4'><b>Our services</b></Typography>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:6,xs:12}}>
        <Box sx={{height:{lg:'340px',md:'380px',sm:'360px',xs:'340px'},padding:'20px',background:'linear-gradient(to bottom, #121B2B, #00FFE7)'}}>
            <Card sx={{width:{lg:'80%',md:'80%',sm:'80%',xs:'100%'},background: '#1A2332',color:'#E0E0E0'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={camera}
                  alt="Cameras"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cameras
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#E0E0E0',opacity:0.7 }}>
                  From beginner-friendly point-and-shoots to professional-grade DSLRs and 4K action cams, 
                  our collection has something for every photographer.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small"
                sx={{
                  backgroundColor: '#FF4D6D',
                  color: '#121B2B', 
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e04360'
                  }
                }}
                onClick={()=>navigate('/Camera')}>
                  Shop now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:6,xs:12}}>
        <Box sx={{height:{lg:'340px',md:'380px',sm:'360px',xs:'340px'},padding:'20px',background:'linear-gradient(to bottom, #121B2B, #00FFE7)'}}>
            <Card sx={{width:{lg:'80%',md:'80%',sm:'80%',xs:'100%'},background: '#1A2332',color:'#E0E0E0'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={parts}
                  alt="camera accessories"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Accessories
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#E0E0E0',opacity:0.7 }}>
                  Our premium selection of camera accessories is designed to elevate your photography and filmmaking experience, that makes best shooting experience.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small"
                sx={{
                  backgroundColor: '#FF4D6D',
                  color: '#121B2B', 
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e04360'
                  }
                }}
                onClick={()=>navigate('/Parts')}>
                  shop now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:12,xs:12}}>
        <Box sx={{height:{lg:'340px',md:'380px',sm:'360px',xs:'340px'},display:{lg:'block',md:'block',sm:'flex',xs:'block'},justifyContent:'center',padding:'20px',background:'linear-gradient(to bottom, #121B2B, #00FFE7)'}}>
            <Card sx={{width:{lg:'80%',md:'80%',sm:'38%',xs:'100%'},background: '#1A2332',color:'#E0E0E0'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={service}
                  alt="Camera service"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Camera Service
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#E0E0E0',opacity:0.7 }}>
                  From expert repairs to sensor cleaning and lens calibration, our certified technicians ensure your equipment performs like new.
                  We offer upgrade services also.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small"
                sx={{
                  backgroundColor: '#FF4D6D',
                  color: '#121B2B',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e04360'
                  }
                }}
                onClick={()=>(loggedIn ? navigate('/Service') : navigate('/Login'))}>
                  book now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
