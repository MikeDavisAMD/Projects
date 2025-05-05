import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Step, StepLabel, Stepper, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import successAnimate from '../Assets/Animations/success.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import gpay from '../Assets/Images/Icons/gpay.png'
import phonepe from '../Assets/Images/Icons/phonepe.png'
import amazonpay from '../Assets/Images/Icons/amazonpay.png'
import paytm from '../Assets/Images/Icons/paytm.png'
import bhim from '../Assets/Images/Icons/bhim.png'

// for stepper
const steps = ['Contact Information', 'Order summary', 'Payment Methods'];

// for tabs in upi and card payment
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Checkout = () => {
  const navigate = useNavigate()
  // on refresh go to login
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');  // Redirect to login page
    }
  }, [navigate]);
  // backdrop after order is successful
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const handleOpen = async () => {
    setOpen(true)
    setShowCard(false);
    await delay(100);
    await delay(3000); 
    setShowCard('gif');
    await delay(100);
    await delay(4000); 
    setShowCard(true); 
    await delay(100);
    await delay(3000); 
    navigate('/');
  };
  // thanks for the order
  const [showCard, setShowCard] = useState(false);
  // Stepper for payments
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const ContactCard = () => {
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [mobile,setMob]=useState('')
    const [email,setEmail]=useState('')
    const [address,setAddress]=useState([])
    useEffect(()=>{
      const fetchData = async () => {
        const username = localStorage.getItem('username')
        if (!username) {
          return;
        }
        try {
          const response = await axios.get("https://falconcams-default-rtdb.firebaseio.com/users.json")
          console.log(response.data)
          const users = Object.entries(response.data).map(([key,val])=>({firebaseKey: key,...val}))
          const userData = users.find(user => user.username===username || user.mobile===username || user.email===username)
          if (userData) {
            setFname(userData.fname)
            setLname(userData.lname)
            setAddress(userData.address[localStorage.getItem('addressIndex')])
            setMob(userData.mobile)
            setEmail(userData.email)
          }
        } catch (error) {
          console.error(error.message)
        }
      }
      fetchData()
    },[])
    return (
      <Card sx={{ minWidth: 275, width:'400px',backgroundColor:'#C1EFFF' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Delivering To:
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {fname+" "+lname} <br />
            {address} <br />
            {mobile} <br />
            {email}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  const OrderSummaryCard = () => {
    const [data,setData]=useState([])
    const fetchData = async () => {
      const username = localStorage.getItem('username')
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
        const quantities = JSON.parse(localStorage.getItem('cartQuantities')) || 1;
        const cartRes = await axios.get(`https://falconcams-default-rtdb.firebaseio.com/users/${userKey}/cart.json`)
        const data = Object.entries(cartRes.data || {}).map(([key,val])=>({
          firebaseKey : key, 
          ...val,
          quantity: quantities[key]
        }))
        setData(data)
        console.log(localStorage.getItem('cartQuantities'))
        console.log(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    const [localUpdateTrigger, setLocalUpdateTrigger] = useState(0);

    useEffect(() => {
      const onStorageUpdate = () => setLocalUpdateTrigger(prev => prev + 1);
      window.addEventListener('storage', onStorageUpdate);
      return () => window.removeEventListener('storage', onStorageUpdate);
    }, []);
    useEffect(()=>{fetchData()},[localUpdateTrigger])
    const totalPrice = data.reduce((acc,item)=>{
      const qty = item.quantity || 1
      return acc + (item.price * qty)
    },0) 
    return (
      <Card sx={{margin:'0px 40px',marginBottom:'40px',width:{lg:'90%',md:'90%',sm:'85%',xs:'80%'},overflow:'scroll'}}>
        <table align="center" width='90%'>
          <thead>
            <tr>
              <th style={{borderBottom:'1px solid black'}}>Item</th>
              <th style={{borderBottom:'1px solid black'}}>Quantity</th>
              <th style={{borderBottom:'1px solid black'}}>Price</th>
            </tr>
          </thead>
          <tbody>
          {data.map((data,index)=>(
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
                  <Box>x{data.quantity || 1}</Box>
                </Box>
              </td>
              <td style={{borderBottom:'1px solid black'}}>
                <Typography variant="h6" component="div" sx={{textAlign:'center'}}>
                  &#8377; {data.price * (data.quantity || 1)}
                </Typography>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <br />
        <Divider/>
        <CardContent>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Typography width={{lg:'70%',md:'60%',sm:'60%',xs:'55%'}} variant="h5" component="div">
              Total Price (including GST):
            </Typography>
            <Typography variant="h5" component="div">
              &#8377; {totalPrice + (totalPrice*(18/100))}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }
  const PaymentMethodsCard = () => {
    

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
      <Card sx={{ minWidth: 275, width:'400px',backgroundColor:'#C1EFFF' }}>
      <CardContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">UPI or other online payments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='scrollable' scrollButtons='auto'>
                  <Tab label={
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <img src={gpay} alt="Google Pay" height='50px'/>
                      <span>google pay</span>
                    </Box>
                  } {...a11yProps(0)} />
                  <Tab label={
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img src={phonepe} alt="Google Pay" height='50px'/>
                    <span>PhonePe</span>
                  </Box>
                  } {...a11yProps(1)} />
                  <Tab label={
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img src={amazonpay} alt="Google Pay" height='50px'/>
                    <span>Amazon pay</span>
                  </Box>
                  } {...a11yProps(2)} />
                  <Tab label={
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img src={paytm} alt="Google Pay" height='50px'/>
                    <span>PayTM</span>
                  </Box>
                  } {...a11yProps(3)} />
                  <Tab label={
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img src={bhim} alt="Google Pay" height='50px'/>
                    <span>BHIM</span>
                  </Box>
                  } {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                Item four
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Item five
              </CustomTabPanel>
            </Box>
          </AccordionDetails>
        </Accordion> 
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Credit or Debit card</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Credit Card" {...a11yProps(0)} />
                  <Tab label="Debit Card" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Cash on Delivery</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Pay using cash or UPI at the time of delivery
          </AccordionDetails>
          <AccordionActions>
            <Button onClick={handleOpen}>
              Place the Order
            </Button>
          </AccordionActions>
        </Accordion>  
      </CardContent>
    </Card>
    )
  }
  return (
    <Grid container sx={{background:'linear-gradient(to bottom,#00BCFF,#A5E8FF)'}}>
        <Grid size={12}>
          <Box sx={{width:{lg:'60%',md:'60%',sm:'60%',xs:'100%'},paddingLeft:{lg:'250px',md:'200px',sm:'180px'},paddingTop:'40px',paddingBottom:'20px'}}>
          <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Thank you for your order
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{padding:'20px',display:'flex',justifyContent:'center'}}>
                  {activeStep === 0 && <ContactCard/>}
                  {activeStep === 1 && <OrderSummaryCard/>}
                  {activeStep === 2 && <PaymentMethodsCard/>}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} disabled={activeStep===steps.length-1}>
                    next
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            onClick={handleClose}
          >
            {showCard === true ? (
              <Card sx={{ minWidth: 275, backgroundColor: '#C1EFFF' }}>
                <CardContent>
                  <Typography variant="h6">Order Placed 👍</Typography>
                  <Typography>Order will be shipped shortly</Typography>
                </CardContent>
              </Card>
            ) : showCard === 'gif' ? (
              <img src={successAnimate} alt="Payment success" style={{ width: 200 }}/>
            ) : (
              <CircularProgress color='inherit'/>
            )}
          </Backdrop>
        </Grid>
    </Grid>
  )
}
