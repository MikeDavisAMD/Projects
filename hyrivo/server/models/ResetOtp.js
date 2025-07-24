const mongoose = require('mongoose');

const resetOtpSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    otp: {type: String, required: true},
    otpExpiry: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now, expires: 900}
})

module.exports = mongoose.model('ResetOtp',resetOtpSchema)