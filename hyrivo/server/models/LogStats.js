const mongoose = require('mongoose');

const LogStatsSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    username: {type: String, default: null},
    route: String,
    date: String,
    count: {type: Number, default:1}
})

LogStatsSchema.index({userId: 1, route: 1, date: 1},{unique: true})

module.exports = mongoose.model('LogStats',LogStatsSchema)