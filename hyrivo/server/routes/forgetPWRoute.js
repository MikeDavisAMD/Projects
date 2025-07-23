require('dotenv').config()
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const ResetOtp = require('../models/ResetOtp')
const nodemailer = require('nodemailer');
const log = require('../middleware/log')
const bcrypt = require('bcrypt');

// Nodemailer function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendOTPEmail = async (email,otp) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: 'OTP for your Hyrivo Login',
        text:`Your OTP for Login is ${otp}`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
                <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
                    <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826110/favicon_fjofxa.png" alt="logo" />
                </a>
                <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
                    To authenticate, please use the following One Time Password (OTP):
                </p>
                <p style="font-size: 22px"><strong>${otp}</strong></p>
                <p>This OTP will be valid for 15 minutes <strong></strong>.</p>
                <p>
                    Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this
                    email.<br /><img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826048/Hyrivo_copy_x9etkh.png" alt="logo" /> will never contact you about this email or ask for any login codes or
                    links. Beware of phishing scams.
                </p>
                <p>Thanks for visiting <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826048/Hyrivo_copy_x9etkh.png" alt="logo" />!</p>
                </div>` 
    }
    await transporter.sendMail(mailOptions)
}

router.post('/username',async (req,res) => {
    const {username} = req.body
    try {
        const user = await User.findOne({$or:[{username},{email: username}]})
        if(!user) return res.status(400).json({message:'User not found'})

        res.status(200).json({userId: user._id})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/send-reset-otp',log,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(404).json({message: 'User not found'})
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000)

        await ResetOtp.deleteMany({userId: user._id})
        await ResetOtp.create({userId: user._id,otp,otpExpiry})

        await sendOTPEmail(user.email,otp)
        res.status(200).json({message: 'OTP send Successfully', email: user.email})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/verify-reset-otp',log,async (req,res) => {
    const {otp} = req.body
    try {
        const record = await ResetOtp.findOne({ userId: req.userId }).sort({createdAt: -1})

        if(!record) return res.status(404).json({message: 'No OTP Found'})

        if(record.otpExpiry < Date.now()){
            await ResetOtp.deleteOne({_id: record._id})
            return res.status(400).json({message: 'OTP Expired'})
        }

        if(record.otp !== otp) return res.status(400).json({message: "Invalid Otp"})
        await ResetOtp.deleteOne({_id: record._id})
        
        res.status(200).json({message:'OTP verified successfully👍'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/reset-password',log,async (req,res) => {
    const {newPassword} = req.body
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message: 'User not found'})
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({message: 'Password updated Successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router