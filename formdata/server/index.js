require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

mongoose.connect(process.env.MONGO)
.then(()=>{console.log('Connected to Database')})
.catch(err=>{console.error('Unable to connect to DB',err.message)})

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({origin:'*'}))

const userRoute = require('./routes/userRoute')
const dataRoute = require('./routes/dataRoute')

app.use('/user',userRoute)
app.use('/data',dataRoute)

app.get('/', (req,res) => {
    res.send("Welcome to my app")
})

const port = process.env.PORT
app.listen(port,()=>{console.log(`Server Running in http://localhost:${port}`)})