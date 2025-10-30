import { Alert, AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, IconButton, MenuItem, Modal, Pagination, Select, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import { Close, Favorite } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Parts = () => {
  const [data,setData] = useState([])
  // snackbar
  const [open,setOpen]=useState(false)
  const openSnackbar = () => {
    setOpen(true)
  }
  const closeSnackbar = () => {
    setOpen(false)
  }
  // add to wishlist
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
  const [wishlist,setWishlist]=useState([])
  const addWishlist = async (itemwithkey) => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      setError('User not logged in');
      openSnackbar();
      return;
    }
    const {firebaseKey,...items} = itemwithkey
    const duplicate = wishlist.some(w => w.id===items.id)
    if(duplicate){
      setError("Already added to wishlist")
      openSnackbar()
      return
    }
    const updatedWishlist = [...wishlist,items]
    setWishlist(updatedWishlist)
    let wishlistCount = parseInt(sessionStorage.getItem('wishlist'), 10) || 0;
    sessionStorage.setItem('wishlist',wishlistCount+1)
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
      await axios.post(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/wishlist.json`,items)
      setError('')
      setSuccess('Added to wishlist')
      openSnackbar()
    } catch (error) {
      console.error(error.message)
      setError(error.message)
      setSuccess('')
      openSnackbar()
    }
  }
  // add to cart
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
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/parts.json")
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
  // Modal for image zooming
  const [openModal, setOpenModal] = useState(false);
  const [ModalImg,setModalImg] = useState(null)
  const handleOpenModal = (img) => {
    setModalImg(img)
    setOpenModal(true)
  };
  const handleCloseModal = () => {
    setModalImg(null)
    setOpenModal(false)
  };
  return (
    <Grid container sx={{backgroundColor:'#121B2B',color:'#E0E0E0'}}>
      <Grid size={12}>
        <Box sx={{flexGrow:1}}>
          <AppBar position='static' sx={{background:'#121B2B'}}>
            <Toolbar sx={{ minHeight: 48, px: 1 }}>
              <Box sx={{display:'flex',gap:2,width:{lg:'60%',md:'60%',sm:'60%',xs:'80%'},justifyContent:'end'}}>
                <TextField
                  size='small'
                  variant="outlined"
                  placeholder="Search..."
                  fullWidth
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ 
                    backgroundColor: '#121B2B',
                    borderRadius: 2,
                    color: '#E0E0E0', 
                    '& .MuiInputBase-input': { color: '#E0E0E0' }, 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00FFE7' },
                    width:{lg:'50%',md:'50%',sm:'50%',xs:'100%'}
                  }}
                />
              </Box>
              <Box>
                <FormControl size='small' variant="outlined" 
                  sx={{ 
                    minWidth: '50%', 
                    backgroundColor: '#121B2B', 
                    borderRadius: 1,
                    color: '#E0E0E0',
                    '& .MuiSelect-select': { color: '#E0E0E0' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00FFE7' }
                  }}>
                    <Select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Lens">Camera Lenses</MenuItem>
                      <MenuItem value="Support">Camera Support systems</MenuItem>
                      <MenuItem value="Memory">Memory Cards</MenuItem>
                      <MenuItem value="Power">Batteries and Chargers</MenuItem>
                      <MenuItem value="Filters">Lens Filters</MenuItem>
                      <MenuItem value="Cover">Lens hood and cap</MenuItem>
                      <MenuItem value="Lighting">Lightings</MenuItem>
                      <MenuItem value="Drones">Drone Accesories</MenuItem>
                    </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {currentItems.map((data,index)=>(
        <Grid size={{lg:3,md:3,sm:6,xs:12}} key={index}>
          <Box sx={{padding:'20px',background:'#121B2B',
            height:'380px'}}>
            <Card sx={{ maxWidth: 280,backgroundColor: 'rgba(255, 255, 255, 0.05)',backdropFilter: 'blur(6px)',boxShadow: '0 4px 20px rgba(0, 255, 231, 0.3)' }}>
              <Box sx={{backgroundColor:'white'}}>
              <CardMedia
                sx={{ height: 140,width:'55%',objectFit:'contain',objectPosition:'center',margin:'0px 55px' }}
                image={data.img}
                alt="Accessories"
                onClick={()=>handleOpenModal(data.img)}
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
                <Typography variant="h6" component="div" sx={{textAlign:'center',color:'#E0E0E0'}}>
                  &#8377; {data.price}
                </Typography>
              </CardContent>
              <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <Button variant='contained' size="small"
                sx={{ backgroundColor: '#FF4D6D', color: '#121B2B',fontWeight:'bold', '&:hover': { backgroundColor: '#E0435E' } }}
                onClick={()=>addCart(data)}>
                  Add to Cart
                </Button>
                <IconButton size="small" onClick={()=>addWishlist(data)}>
                  <Favorite sx={{ color: wishlist.some(w => w.id === data.id) ? '#00FFE7' : '#A0A0A0' }}/>
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
      <Grid size={12}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',height:'50px',alignItems:'center',background:'#121B2B'}}>
            <Pagination count={Math.ceil(filteredItems.length/itemsPerPage)}
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="img" src={ModalImg} alt='Camera Accessories' 
          sx={{height:{lg:'400px',md:'300px',sm:'200px',xs:'auto'},width:'100%'}}/>
        </Box>
      </Modal>
    </Grid>
  )
}
