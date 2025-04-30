import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Wishlist = () => {
  const [data,setData] = useState([])
  // pagination navigation
  const [page,setPage] = useState(1)
  const fetchData = async () => {
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/wishlist.json")
      const data = Object.entries(response.data || {}).map(([key,val])=>({
        firebaseKey: key,...val
      }))
      setData(data)
      localStorage.setItem('wishlist',data.length)
      window.dispatchEvent(new Event('storage'))
      console.log(data)
    } catch (error) {
      console.error(error.response ? error.response.data : error)
    }
  }
  const removeItem = (key) =>{
    axios.delete(`https://falconcams-default-rtdb.firebaseio.com/wishlist/${key}.json`)
    .then(()=>{
      console.log("deleted")
      fetchData()
    })
    .catch(err => console.error(err.message))
  }
  useEffect(()=>{
    fetchData()
  },[])
  // pagination
  const itemsPerPage = 8;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // I want 8 items per page
  const handleChangepage = (event,value) => {
    setPage(value)
    console.log(event)
  }
  return (
    <Grid container>
      {currentItems.map((data,index)=>(
        <Grid size={{lg:3,md:3,sm:6,xs:12}} key={data.firebaseKey || index}>
          <Box sx={{padding:'20px',background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)',
            height:'380px'}}>
            <Card sx={{ maxWidth: 280 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={data.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                  {data.brand+" "+data.model}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary',textAlign:'center'}}>
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardContent sx={{margin:0,padding:0}}>
                <Typography variant="h6" component="div" sx={{textAlign:'center'}}>
                  &#8377; {data.price}
                </Typography>
              </CardContent>
              <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <Button variant='contained' size="small">Cart</Button>
                <Button variant='contained' size='small' onClick={()=>{
                  removeItem(data.firebaseKey)}}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
      <Grid size={12}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',height:'50px',alignItems:'center',background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
            <Pagination count={Math.ceil(data.length/itemsPerPage)} color="primary" page={page} onChange={handleChangepage}/>
          </Box>
      </Grid>
    </Grid>
  )
}