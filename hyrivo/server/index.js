require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

mongoose.connect(process.env.MONGODB)
.then(()=>console.log("Connected to Database"))
.catch((error)=>console.error("Unable to connect to Database",error.message))

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())

const userRoute = require('./routes/userRoute')
const forgetPWRoute = require('./routes/forgetPWRoute')

app.use('/pw-reset',forgetPWRoute)
app.use('/user',userRoute)

app.get('/', (req,res)=>{
    res.send("Welcome to Hyrivo")
})

const port = process.env.PORT
app.listen(port,()=>{console.log(`Database running in http://localhost:${port}`)})