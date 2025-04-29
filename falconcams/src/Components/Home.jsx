import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import dslr from '../Assets/Images/Carousel/DSLR.jpg'
import mlesscamera from '../Assets/Images/Carousel/mirrorless.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate()
  const slides=[
    {
      title: 'DSLR cameras',
      img: dslr,
      desc: 'This is a DSLR camera'
    },
    {
      title: 'Mirrorless DSLR cameras',
      img: mlesscamera,
      desc: 'This is a Mirrorless DSLR camera'
    }
  ]
  return (
    <>
    <Grid container>
      <Grid size={12}>
        <Box sx={{height:{lg:'610px',md:'610px',sm:'410px',xs:'610px'}}}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {slides.map((data,index)=>(
              <SwiperSlide key={index}>
                <Box sx={{height:{lg:'610px',md:'410px',sm:'410px',xs:'610px', color:'white'}}}>
                  <img src={data.img} alt="" height='610px' width='100%'/>
                  <Box sx={{position: 'absolute', bottom: 10, left: 10, width: '50%', background: 'rgba(0,0,0,0.5)', padding: '20px',borderRadius:'10px' }}>
                    <Typography variant='h4'>{data.title}</Typography>
                    <Typography variant='p'>{data.desc}</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{height:{lg:'50px'},padding:'10px',background:'radial-gradient(circle,#07CCFD,#07FDFD,#07A3FD)',textAlign:'center',color:'#190098'}}>
          <Typography variant='h4'><b>Our services</b></Typography>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:6,xs:12}}>
        <Box sx={{height:{lg:'340px'},padding:'20px',background:'linear-gradient(to bottom,#190098,cyan)'}}>
            <Card sx={{width:'80%',background: 'rgba(0, 153, 254, 0.51)'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cameras
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small" color="white" onClick={()=>navigate('/Camera')}>
                  Shop now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:6,xs:12}}>
        <Box sx={{height:{lg:'340px'},padding:'20px',background:'linear-gradient(to bottom,#190098,cyan)'}}>
            <Card sx={{width:'80%',background: 'rgba(0, 153, 254, 0.51)'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Camera Parts
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small" color="white" onClick={()=>navigate('/Parts')}>
                  shop now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:12,xs:12}}>
        <Box sx={{height:{lg:'340px'},display:{lg:'block',md:'block',sm:'flex',xs:'block'},justifyContent:'center',padding:'20px',background:'linear-gradient(to bottom,#190098,cyan)'}}>
            <Card sx={{width:{lg:'80%',md:'80%',sm:'38%',xs:'80%'},background: 'rgba(0, 153, 254, 0.51)'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Camera Service
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant='contained' size="small" color="white" onClick={()=>navigate('/Service')}>
                  book now
                </Button>
              </CardActions>
            </Card>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}
