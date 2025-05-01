import { Add, Delete, Place, Remove } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Dialog, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, TextareaAutosize, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors'; 
import { green } from '@mui/material/colors';

function SimpleDialog(props) {
  const { onClose, selectedValue, open, onAddClick, addresses } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Delivery Address</DialogTitle>
      <List sx={{ pt: 0 }}>
        {addresses.length===0 ? (
          <ListItem>
            <ListItemText primary='No Address found'/>
          </ListItem>
        ):(
          addresses.map((Address) => (
            <ListItem disablePadding key={Address}>
              <ListItemButton onClick={() => handleListItemClick(Address)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <Place/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={Address} />
              </ListItemButton>
            </ListItem>
          ))
        )}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={onAddClick}
          >
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add Address" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
};

export const Cart = () => {
  const navigate = useNavigate()
  // modal for adding address
  const [newAddAddr,setNewAddAddr]=useState('')
  const [addresses,setAddresses]=useState([])
  const handleAddAddress = async () =>{
    if (newAddAddr.trim()) {
      await address(newAddAddr)
      setNewAddAddr('')
      await fetchAddresses()
      handleCloseModal()
      handleClose()
    }
  }
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
  };
  const [value,setValue] = useState([])
  // Opening Dialog
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(addresses[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  // for quantity
  const [quantity,setQuantity] = useState({})
  const handleQuantityChange = (firebaseKey, change) => {
    setQuantity(prevQuantities => {
      const currentQuantity = prevQuantities[firebaseKey] || 1;
      const newQuantity = currentQuantity + change;
      return {
        ...prevQuantities,
        [firebaseKey]: Math.max(newQuantity, 1), // Prevent quantity from going below 1
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
  }
  const removeItem = (key) => {
    axios.delete(`https://falconcams-default-rtdb.firebaseio.com/cart/${key}.json`)
    .then(()=>{
      fetchData()
    }).catch((err)=>{
      console.error(err.message)
    })
  }
  const fetchAddresses = async () => {
    try {
      const username = localStorage.getItem('username')
      const res=await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
      const users = Object.entries(res.data).map(([key,val])=>({
        firebaseKey: key,...val
      }))
      const userdata = users.find(user => user.username===username || user.mobile===username || user.mail===username)
      const userAddresses = userdata?.address || []
      setAddresses(userAddresses)
      setSelectedValue(userAddresses[0] || '')
    } catch (error) {
      console.error(error.message)
    }
  }
  const address = async (newAddress) => {
    try {
      const username = localStorage.getItem('username')
      const res = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
      const users = Object.entries(res.data).map(([key,val])=>({
        firebaseKey: key,...val
      }))
      const userdata = users.find(user => user.username===username || user.mobile===username || user.mail===username)
      const firebaseKey = userdata.firebaseKey
      const currentAddresses = Array.isArray(userdata.address) ? userdata.address : [];
      const updatedAddresses = [...currentAddresses, newAddress];
      return axios.patch(`https://falconcams-default-rtdb.firebaseio.com/users/${firebaseKey}.json`,{
        address: updatedAddresses
      })
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(()=>{
    fetchData();
    fetchAddresses();
  },[])
  // price updation
  const totalPrice = value.reduce((acc,item)=>{
    const qty = quantity[item.firebaseKey] || 1
    return acc + (item.price * qty)
  },0) 
  // button loading navigation
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        navigate('/Checkout')
      }, 2000);
    }
  };
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
                      <Button color="primary" onClick={()=>handleQuantityChange(data.firebaseKey,1)}><Add/></Button>
                      <Box>{quantity[data.firebaseKey] || 1}</Box>
                      <Button color="primary" onClick={()=>handleQuantityChange(data.firebaseKey,-1)}><Remove/></Button>
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
              {addresses.length===0 ? "No address available" : selectedValue}
            </Typography>
            <Link style={{textDecoration:'none'}} onClick={handleClickOpen}>
              <Typography variant="body2">
                change
              </Typography>
            </Link>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              onAddClick={handleOpenModal}
              addresses={addresses}
            />
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
                    value={newAddAddr}
                    onChange={(e)=>setNewAddAddr(e.target.value)}
                  />
                  <Button 
                  variant="contained"
                  onClick={handleAddAddress}
                  >
                    Add new address
                  </Button>
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
                CGST:
              </Typography>
              <Typography variant="body2">
                {totalPrice*(9/100)}
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                SGST:
              </Typography>
              <Typography variant="body2">
                {totalPrice*(9/100)}
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                GST:
              </Typography>
              <Typography variant="body2">
                {totalPrice*(18/100)}
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
                &#8377; {totalPrice + (totalPrice*(18/100))}
              </Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Box sx={{display:'flex',justifyContent:'center',position:'relative'}}>
              <Button variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}>
                Proceed to Checkout
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
