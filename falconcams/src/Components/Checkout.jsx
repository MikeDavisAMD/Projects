import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import successAnimate from '../Assets/Animations/success.gif'
import { useNavigate } from 'react-router-dom';

const steps = ['Contact Information', 'Order summary', 'Payment Methods'];

export const Checkout = () => {
  const navigate = useNavigate()
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
  const ContactCard = () => (<CircularProgress/>)
  const OrderSummaryCard = () => (<CircularProgress/>)
  const PaymentMethodsCard = () => (
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
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
