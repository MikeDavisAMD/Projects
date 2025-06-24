const mongoose = require('mongoose');

module.exports = mongoose.model('Data',new mongoose.Schema({
    fname: String,
    lname: String,
    dob: Date,
    gender: String,
    mobile: Number,
    email: String,
    country: String,
    address: String,
    skills: [String],
    file:{
        filename:String,
        filepath:String
    }
}))