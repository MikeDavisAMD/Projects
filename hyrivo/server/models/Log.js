const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: String,
    route: String,
    statusCode: Number,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    username: {type: String, default: null},
    ip: String,
    userAgent: String,
    timestamp: {type: Date, default: Date.now,index:true},
    date: String,
    count: {type: Number, default:1}
})

logSchema.index({timestamp: 1},{expireAfterSeconds: 259200}) // logs clears in 3 days
logSchema.index({userId: 1, route: 1, date: 1},{unique: true})

module.exports = mongoose.model('Logs',logSchema)