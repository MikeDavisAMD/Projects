import { Add, AddCircle, Delete, Remove } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextareaAutosize, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

export const Cart = () => {
  const navigate = useNavigate()
  // Add an address to the json file
  const updateAddr = async (newAddr) => {
    try {
      const res = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
      const users = res.data
      let userKeyToUpdate = null
      for (const key in users) {
        const user = users[key];
        if(user.username===username || user.mobile===username || user.mail===username){
          userKeyToUpdate = key;
          break
        }
      }
      if (userKeyToUpdate) {
        const existingAddress = users[userKeyToUpdate].address || []
        const updatedAddress = Array.isArray(existingAddress) ? [...existingAddress,newAddr] : [existingAddress,newAddr]
        await axios.patch(`https://falconcams-default-rtdb.firebaseio.com/users/${userKeyToUpdate}.json`,{
          address: updatedAddress
        })
        setAddr(updatedAddress)
        setSelectedAddress(newAddr)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  // for address
  const [address,setAddr]=useState('')
  const [loadAddr,setloadaddr]=useState(false)
  const username = localStorage.getItem('username')
  useEffect(()=>{
    const fetchAddress = async () => {
      if(!username) return
      setloadaddr(true)
      try {
        const res = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
        const users = res.data
        for (const key in users){
          if(users[key].username===username || users[key].mobile===username || users[key].mail===username){
            setAddr(Array.isArray(users[key].address) ? users[key].address : [users[key].address || 'No Address found']);
            setSelectedAddress(Array.isArray(users[key].address) ? users[key].address[0] : users[key].address);
            break
          }
        }
      } catch (error) {
        console.error(error.message)
      } finally {
        setloadaddr(false)
      }
    }
    fetchAddress()
  },[username])
  // modal for adding address
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // for change dialog
  function AddressDialog({ open, onClose, address }) {
    const [newAddr,setnewAddress] = useState('')
    const handleSelect = () => {
      if (newAddr.trim()) {
        onClose(newAddr.trim())
        setnewAddress('')
      }
    };
    return (
      <Dialog onClose={() => onClose(null)} open={open}>
        <DialogTitle>Select an address</DialogTitle>
        <List>
          {address && address.length > 0 ? (
            address.map((addr, index) => (
              <ListItem button onClick={() => handleSelect(addr)} key={index}>
                <ListItemText primary={addr} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No Address Available" />
            </ListItem>
          )}
          <ListItemButton onClick={handleOpenModal}>
            <ListItemIcon><AddCircle/></ListItemIcon>
            <ListItemText>Add new Address</ListItemText>
          </ListItemButton>
        </List>
      </Dialog>
    );
  }
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (value) => {
    if (value) {
      updateAddr(value);
    }
    setDialogOpen(false);
  };
  const [value,setValue] = useState([])
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
  const fetchData = async () => {
    try {
      const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/cart.json")
      const data = Object.entries(response.data || {}).map(([key,val])=>({
        firebaseKey : key, ...val
      }))
      setValue(data)
      localStorage.setItem('cart',data.length)
      window.dispatchEvent(new Event('storage'))
      console.log(data)
    } catch (error) {
      console.error(error.message)
    }
    setloadaddr(false)
  }
  const removeItem = (key) => {
    axios.delete(`https://falconcams-default-rtdb.firebaseio.com/cart/${key}.json`)
    .then(()=>{
      fetchData()
    }).catch((err)=>{
      console.error(err.message)
    })
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <Grid container sx={{background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
      <Grid size={12}>
        <Typography variant="h4" sx={{padding:'10px 40px'}}>
          Shopping Cart ({localStorage.getItem('cart')} items)
        </Typography>
      </Grid>
      <Grid size={{lg:8,md:8,sm:7,xs:12}}>
        <Box>
          <Card sx={{margin:'0px 40px',marginBottom:'40px',width:{lg:'90%',md:'90%',sm:'85%',xs:'80%'},overflow:'scroll'}}>
            <table align="center" width='90%'>
              <thead>
                <tr>
                  <th style={{borderBottom:'1px solid black'}}>Item</th>
                  <th style={{borderBottom:'1px solid black'}}>Quantity</th>
                  <th style={{borderBottom:'1px solid black'}}>Price</th>
                  <th style={{borderBottom:'1px solid black'}}>Remove</th>
                </tr>
              </thead>
              <tbody>
              {value.map((data,index)=>(
                <tr key={index}>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Box sx={{display:'flex',gap:2,height:'50px',textAlign:'center'}}>
                      <img src={data.img} alt="" height='50px'/>
                      <Box sx={{padding:'15px 0px'}}>
                        {data.brand+" "+data.model}
                      </Box>
                    </Box>
                  </td>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <Button color="primary" onClick={()=>handleQuantityChange(data.id,1)}><Add/></Button>
                      <Box>{quantity[data.id] || 1}</Box>
                      <Button color="primary" onClick={()=>handleQuantityChange(data.id,-1)}><Remove/></Button>
                    </Box>
                  </td>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Typography variant="h6" component="div" sx={{textAlign:'center'}}>
                      &#8377; {data.price * (quantity[data.id] || 1)}
                    </Typography>
                  </td>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                      <IconButton onClick={()=>{
                        removeItem(data.firebaseKey)
                      }}>
                        <Delete color="primary"/>
                      </IconButton>
                    </Box>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </Card>
        </Box>
      </Grid>
      <Grid size={{lg:4,md:4,sm:5,xs:12}}>
        <Card sx={{marginLeft:{lg:0,md:0,sm:0,xs:'40px'},marginBottom:'40px',width:{lg:'90%',md:"90%",sm:'85%',xs:'80%'},backgroundColor:'#C1EFFF'}}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Delivery Address
            </Typography>
            <Typography variant="body2">
              {loadAddr ? <CircularProgress size={24} /> : selectedAddress || 'No Address Available'}
            </Typography>
            <Link style={{textDecoration:'none'}} onClick={handleOpen}>
              <Typography variant="body2">
                change
              </Typography>
            </Link>
            <AddressDialog open={dialogOpen} onClose={handleClose} address={address}/>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                position:'absolute',
                top:'50%',left:'50%',transform:'translate(-50%, -50%)',
                width:{lg:400,md:400,sm:400,xs:250},
                bgcolor: 'background.paper',
                border: '2px solid #03A3FF',
                borderRadius:'12px',
                boxShadow: 24,p: 4,
              }}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                  <TextareaAutosize 
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Enter new Address"
                  />
                  <Button variant="contained">Add new address</Button>
                </Box>
              </Box>
            </Modal>
          </CardContent>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Price Breakdown
            </Typography>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                GST:
              </Typography>
              <Typography variant="body2">
                18%
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                CGST:
              </Typography>
              <Typography variant="body2">
                9%
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                SGST:
              </Typography>
              <Typography variant="body2">
                9%
              </Typography>
            </Box>
          </CardContent>
          <Divider/>
          <CardContent>
            <Box sx={{display:'flex'}}>
              <Typography width={{lg:'70%',md:'60%',sm:'60%',xs:'55%'}} variant="h5" component="div">
                Total Price:
              </Typography>
              <Typography variant="h5" component="div">
                &#8377; 20,000
              </Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <Button variant="contained" onClick={()=>navigate('/Checkout')}>Proceed to Checkout</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
