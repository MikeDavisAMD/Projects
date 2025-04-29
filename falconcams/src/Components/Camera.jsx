import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, IconButton, MenuItem, Pagination, Select, TextField, Toolbar, Typography } from '@mui/material'
import { AddCircle, RemoveCircle, } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Camera = () => {
  const [data,setData] = useState([])
  // for quantity
  const [quantity,setQuantity] = useState({})
  const handleQuantityChange = (id, change) => {
    setQuantity(prevQuantities => {
      const currentQuantity = prevQuantities[id] || 1;
      const newQuantity = currentQuantity + change;
      return {
        ...prevQuantities,
        [id]: Math.max(newQuantity, 1), // Prevent quantity from going below 1
      };
    });
  };
  
  // pagination navigation
  const [page,setPage] = useState(1)
  const fetchData = async () => {
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/camera.json")
      const data = Object.entries(response.data).map(([key,val])=>({
        firebaseKey: key,...val
      }))
      setData(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  // search bar
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredItems = data.filter((item) => { 
    const combinedText = `${item.brand} ${item.model} ${item.category}`.toLowerCase();
    const matchesSearch = combinedText.includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filter]);
  // pagination
  const itemsPerPage = 8;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem); // I want 8 items per page
  const handleChangepage = (event,value) => {
    setPage(value)
    console.log(event)
  }
  return (
    <Grid container>
      <Grid size={12}>
        <Box sx={{flexGrow:1}}>
          <AppBar position='static' sx={{background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
            <Toolbar>
              <Box sx={{display:'flex',gap:2,width:{lg:'60%',md:'60%',sm:'60%',xs:'80%'},justifyContent:'end'}}>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  fullWidth
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: 2 , width:{lg:'50%',md:'50%',sm:'50%',xs:'100%'} }}
                />
              </Box>
              <Box>
                <FormControl variant="outlined" sx={{ minWidth: '50%', backgroundColor: 'white', borderRadius: 1 }}>
                    <Select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="DSLR">DSLR</MenuItem>
                      <MenuItem value="Mirrorless">Mirrorless</MenuItem>
                      <MenuItem value="Point & Shoot">Point & Shoot</MenuItem>
                    </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {currentItems.map((data,index)=>(
        <Grid size={{lg:3,md:3,sm:6,xs:12}} key={index}>
          <Box sx={{padding:'20px',background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)',
            height:'440px'}}>
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
                  &#8377; {data.price * (quantity[data.id] || 1)}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{display:'flex',justifyContent:'center',width:'100%'}}>
                  <IconButton color='primary' onClick={()=>handleQuantityChange(data.id,-1)}><RemoveCircle/></IconButton>
                  <Box sx={{padding:'10px'}}>{quantity[data.id] || 1}</Box>
                  <IconButton color='primary' onClick={()=>handleQuantityChange(data.id,1)}><AddCircle/></IconButton>
                </Box>
              </CardActions>
              <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <Button variant='contained' size="small">Cart</Button>
                <Button variant='contained' size="small">Wishlist</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
      <Grid size={12}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',height:'50px',alignItems:'center',background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
            <Pagination count={Math.ceil(filteredItems.length/itemsPerPage)} color="primary" page={page} onChange={handleChangepage}/>
          </Box>
      </Grid>
    </Grid>
  )
}
