import { Alert, Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Pagination, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AddShoppingCart, Close, Delete, } from '@mui/icons-material'

export const Wishlist = () => {
  const [data,setData] = useState([])
  // snackbar
  const [open,setOpen]=useState(false)
  const openSnackbar = () => {
    setOpen(true)
  }
  const closeSnackbar = () => {
    setOpen(false)
  }
  // add to cart
  const [error,setError] = useState('')
  const [success,setSuccess]=useState('')
  const [cart,setCart]=useState([])
  const addCart = async (itemwithkey) => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      setError('User not logged in');
      openSnackbar();
      return;
    }
    const {firebaseKey,...items} = itemwithkey
    const duplicate = cart.some(w => w.id===items.id)
    if(duplicate){
      setError("Already added to cart")
      openSnackbar()
      return
    }
    const updatedCart = [...cart,items]
    setCart(updatedCart)
    let cartCount = parseInt(sessionStorage.getItem('cart'), 10) || 0;
    sessionStorage.setItem('cart',cartCount+1)
    window.dispatchEvent(new Event('storage'))
    try {
      const response = await axios.get('https://falconcams-default-rtdb.firebaseio.com/users.json');
      const users = response.data;
      const userKey = Object.keys(users).find(key => ((users[key].username || users[key].mobile || users[key].email) === username));
      if (!userKey) {
        setError('User not found in database');
        openSnackbar();
        return;
      }
      await axios.post(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/cart.json`,items)
      setError('')
      setSuccess('Added to cart')
      openSnackbar()
      removeItem(firebaseKey)
    } catch (error) {
      console.error(error.message)
      setError(error.message)
      setSuccess('')
      openSnackbar()
    }
  }
  // pagination navigation
  const [page,setPage] = useState(1)
  const fetchData = async () => {
    const username = sessionStorage.getItem('username')
    if (!username) {
      return;
    }
    try {
      const response = await axios.get('https://falconcams-default-rtdb.firebaseio.com/users.json');
      const users = response.data;
      const userKey = Object.keys(users).find(key => ((users[key].username || users[key].mobile || users[key].email) === username));
      if (!userKey) {
        return;
      }
      const wishlistRes = await axios.get(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/wishlist.json`)
      const data = Object.entries(wishlistRes.data || {}).map(([key,val])=>({
        firebaseKey : key, ...val
      }))
      setData(data)
      sessionStorage.setItem('wishlist',data.length)
      window.dispatchEvent(new Event('storage'))
      console.log(data)
    } catch (error) {
      console.error(error.message)
    }
  }
  const removeItem = async (key) => {
      const username = sessionStorage.getItem('username')
      if (!username) {
        return;
      }
      try {
        const res = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json");
        const users = Object.entries(res.data).map(([key, val]) => ({
          firebaseKey: key,
          ...val
        }));
        const userdata = users.find(user => user.username === username || user.mobile === username || user.email === username);
        const firebaseKey = userdata?.firebaseKey;
        if (!firebaseKey) {
          console.error("User not found!");
          return;
        }
        await axios.delete(`https://falconcams-default-rtdb.firebaseio.com/users/${firebaseKey}/wishlist/${key}.json`);
        await fetchData()
      } catch (error) {
        console.error(error.message)
      }
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
    <Grid container sx={{backgroundColor:'#121B2B',color:'#E0E0E0'}}>
      {currentItems.map((data,index)=>(
        <Grid size={{lg:3,md:3,sm:6,xs:12}} key={data.firebaseKey || index}>
          <Box sx={{padding:'20px',background:'#121B2B',
            height:'380px'}}>
            <Card sx={{ maxWidth: 280,backgroundColor: 'rgba(255, 255, 255, 0.05)',backdropFilter: 'blur(6px)',boxShadow: '0 4px 20px rgba(0, 255, 231, 0.3)' }}>
              <Box sx={{backgroundColor:'white'}}>
              <CardMedia
                sx={{ height: 140,width:'55%',objectFit:'contain',objectPosition:'center',margin:'0px 55px' }}
                image={data.img}
                alt="Wishlisted"
              />
              </Box>
              <CardContent>
                <Box sx={{
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}>
                <Typography gutterBottom variant="h5" component="div" sx={{
                  color:'#E0E0E0',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  animation: data.brand.length + data.model.length > 20 ? 'scrollText 15s linear infinite' : 'none',
                  }}>
                  {data.brand+" "+data.model}
                </Typography>
                </Box>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  textAlign:'center',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                  }}>
                  {data.desc}
                </Typography>
              </CardContent>
              <CardContent sx={{margin:0,padding:0}}>
                <Typography variant="h6" component="div" sx={{textAlign:'center',color:'#E0E0E0',}}>
                  &#8377; {data.price}
                </Typography>
              </CardContent>
              <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <IconButton onClick={()=>addCart(data)}>
                  <AddShoppingCart sx={{color:'#FF4D6D'}}/>
                </IconButton>
                <IconButton onClick={()=>removeItem(data.firebaseKey)}>
                  <Delete sx={{color:'#FF4D6D'}}/>
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
      <Grid size={12}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',height:'50px',alignItems:'center',background:'#121B2B'}}>
            <Pagination count={Math.ceil(data.length/itemsPerPage)}
            sx={{ 
              '& .MuiPaginationItem-root': { color: '#00FFE7' },
              '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#FF4D6D', color: '#E0E0E0' }
            }}
            page={page} onChange={handleChangepage}/>
          </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar}
      action={
        <IconButton size="small" aria-label="close" color='inherit' onClick={closeSnackbar}>
          <Close fontSize='small'/>
        </IconButton>
      }>
        <Alert severity={error ? 'error' : 'success'} onClose={closeSnackbar}>
          {error || success}
        </Alert>
      </Snackbar>
    </Grid>
  )
}