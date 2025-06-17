import { Add, Delete, Place, Remove } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Dialog, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, TextareaAutosize, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
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
    <Dialog onClose={handleClose} open={open}
    slotProps={{
      paper: {
        sx: {
          backgroundColor: '#121B2B',
          color: '#E0E0E0',
          minWidth: 300,
        },
      },
    }}>
      <DialogTitle sx={{ color: '#E0E0E0' }}>Select Delivery Address</DialogTitle>
      <List sx={{ pt: 0,backgroundColor: '#121B2B' }}>
        {addresses.length===0 ? (
          <ListItem>
            <ListItemText primary='No Address found'/>
          </ListItem>
        ):(
          addresses.map((Address) => (
            <ListItem disablePadding key={Address}>
              <ListItemButton onClick={() => handleListItemClick(Address)}
                sx={{
                  color: '#E0E0E0',
                  '&:hover': {
                    backgroundColor: '#C8B8FF',
                    color: '#121B2B',
                  },
                  ...(selectedValue === Address && {
                    backgroundColor: '#C8B8FF',
                    color: '#121B2B',
                  }),
                }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#C8B8FF', color: '#121B2B' }}>
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
            sx={{
              color: '#00FFE7',
              '&:hover': {
                backgroundColor: '#00FFE7',
                color: '#121B2B',
              },
              '&:hover .add-avatar': {
                backgroundColor: '#C8B8FF',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar className="add-avatar" sx={{
                bgcolor: '#00FFE7',
                color: '#121B2B',
                transition: 'background-color 0.3s ease',
              }}>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add Address"/>
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
    const index = addresses.indexOf(value)
    if (index!==-1) {
      sessionStorage.setItem('addressIndex',index)
    }
  };
  // for quantity
  const [quantity,setQuantity] = useState({})
  const handleQuantityChange = (firebaseKey, change) => {
    setQuantity(prevQuantities => {
      const currentQuantity = prevQuantities[firebaseKey] || 1;
      const newQuantity = currentQuantity + change;
      const updatedQuantities = {
        ...prevQuantities,
        [firebaseKey]: Math.max(newQuantity, 1), // Prevent quantity from going below 1
      };
      sessionStorage.setItem('cartQuantities', JSON.stringify(updatedQuantities));
      window.dispatchEvent(new Event('storage'))
      return updatedQuantities
    });
  };
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
      const cartRes = await axios.get(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/cart.json`)
      const data = Object.entries(cartRes.data || {}).map(([key,val])=>({
        firebaseKey : key, ...val
      }))
      setValue(data)
      sessionStorage.setItem('cart',data.length)
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
      await axios.delete(`https://falconcams-default-rtdb.firebaseio.com/users/${firebaseKey}/cart/${key}.json`);
      await fetchData()
    } catch (error) {
      console.error(error.message)
    }
  }
  const fetchAddresses = async () => {
    try {
      const username = sessionStorage.getItem('username')
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
      const username = sessionStorage.getItem('username')
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
    const savedQuantities = sessionStorage.getItem('cartQuantities');
    if (savedQuantities) {
      setQuantity(JSON.parse(savedQuantities));
    }
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
    backgroundColor: '#FF4D6D',
    color: '#121B2B',
    '&:hover': {
      backgroundColor: '#e04360',
    },
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
    <Grid container sx={{backgroundColor: '#121B2B', color: '#E0E0E0'}}>
      <Grid size={12}>
        <Typography variant="h4" sx={{padding:'10px 40px'}}>
          Shopping Cart ({sessionStorage.getItem('cart')} items)
        </Typography>
      </Grid>
      <Grid size={{lg:8,md:8,sm:7,xs:12}}>
        <Box>
          <Card sx={{margin:'0px 40px',marginBottom:'40px',width:{lg:'90%',md:'90%',sm:'85%',xs:'80%'},overflow:'auto',backgroundColor: '#2A2A2A',color: '#E0E0E0',boxShadow: '0 4px 20px rgba(0, 255, 231, 0.1)'}}>
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
                      <Button sx={{ color: '#00FFE7' }} onClick={()=>handleQuantityChange(data.firebaseKey,1)}><Add/></Button>
                      <Box>{quantity[data.firebaseKey] || 1}</Box>
                      <Button sx={{ color: '#00FFE7' }} onClick={()=>handleQuantityChange(data.firebaseKey,-1)}><Remove/></Button>
                    </Box>
                  </td>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Typography variant="h6" component="div" sx={{textAlign:'center'}}>
                      &#8377; {data.price * (quantity[data.firebaseKey] || 1)}
                    </Typography>
                  </td>
                  <td style={{borderBottom:'1px solid black'}}>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                      <IconButton onClick={()=>{
                        removeItem(data.firebaseKey)
                      }}>
                        <Delete sx={{ color: '#00FFE7' }}/>
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
        <Card sx={{marginLeft:{lg:0,md:0,sm:0,xs:'40px'},marginBottom:'40px',width:{lg:'90%',md:"90%",sm:'85%',xs:'80%'},backgroundColor: '#2A2A2A',color: '#FFFFFF'}}>
          <CardContent>
            <Typography gutterBottom sx={{ color: '#A0A0A0', fontSize: 14 }}>
              Delivery Address
            </Typography>
            <Typography variant="body2">
              {addresses.length===0 ? "No address available" : selectedValue}
            </Typography>
            <Link style={{textDecoration:'none',color:'#00FFE7'}} onClick={handleClickOpen}>
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
                bgcolor: '#1C1C2D',
                border: '2px solid #00FFE7',
                borderRadius:'12px',
                boxShadow: 24,p: 4,color: '#E0E0E0'
              }}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                  <TextareaAutosize 
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Enter new Address"
                    value={newAddAddr}
                    onChange={(e)=>setNewAddAddr(e.target.value)}
                    style={{
                      backgroundColor: '#121B2B',
                      color: '#E0E0E0',
                      border: '1.5px solid #00FFE7',
                      borderRadius: '6px',
                      padding: '10px',
                      fontSize: '1rem',
                      fontFamily: 'Roboto, sans-serif',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00FFE7';
                      e.target.style.boxShadow = '0 0 5px #00FFE7';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#00FFE7';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <Button 
                  variant="contained"
                  onClick={handleAddAddress}
                  sx={{backgroundColor:'#FF4D6D', color: '#121B2B',fontWeight:'bold'}}
                  >
                    Add new address
                  </Button>
                </Box>
              </Box>
            </Modal>
          </CardContent>
          <CardContent>
            <Typography gutterBottom sx={{ color: '#A0A0A0', fontSize: 14 }}>
              Price Breakdown
            </Typography>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                CGST (9%):
              </Typography>
              <Typography variant="body2">
                {Math.round(totalPrice*(9/100))}
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                SGST (9%):
              </Typography>
              <Typography variant="body2">
                {Math.round(totalPrice*(9/100))}
              </Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <Typography width='80%' variant="body2">
                GST (CGST+SGST):
              </Typography>
              <Typography variant="body2">
                {Math.round(totalPrice*(18/100))}
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
                &#8377; {Math.round(totalPrice + (totalPrice*(18/100)))}
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
