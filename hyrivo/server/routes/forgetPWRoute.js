require('dotenv').config()
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const ResetOtp = require('../models/ResetOtp')
const nodemailer = require('nodemailer');
const log = require('../middleware/log')
const speakeasy = require('speakeasy');

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
        subject: 'OTP for your Hyrivo account password change',
        text:`Your OTP for Login is ${otp}`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
                <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
                    <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771099/favicon_rqa3fx.png" alt="logo" />
                </a>
                <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
                    To change password, please use the following One Time Password (OTP):
                </p>
                <p style="font-size: 22px"><strong>${otp}</strong></p>
                <p>This OTP will be valid for 15 minutes <strong></strong>.</p>
                <p>
                    Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this
                    email.<br /><img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" /> will never contact you about this email or ask for any login codes or
                    links. Beware of phishing scams.
                </p>
                <p>Thanks for visiting <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" />!</p>
                </div>` 
    }
    await transporter.sendMail(mailOptions)
}

const passwordChangeMail = async (email,username) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: `Password Change for ${username}`,
        text: `Hi ${username}!! Your account password has been changed`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #E4F7FF">
                <div style="max-width: 600px; margin: auto; padding: 16px">
                    <a style="text-decoration: none; outline: none" href="" target="_blank">
                    <img
                        style="height: 32px; vertical-align: middle"
                        height="32px"
                        src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771099/favicon_rqa3fx.png"
                        alt="logo"
                    />
                    </a>
                    <p><strong>Hi ${username}!!</strong></p>
                    <p>Password Changed for account <strong>${username}!!</strong></p>
                    <p>
                    If password is not changed by you please rechange the password.
                    </p>
                    <p>
                    <a
                        style="
                        display: inline-block;
                        text-decoration: none;
                        outline: none;
                        color: #fff;
                        background-color: #00BFFF;
                        padding: 8px 16px;
                        border-radius: 30px;
                        "
                        href=""
                        target="_blank"
                    >
                        Open Hyrivo
                    </a>
                    </p>
                    <p>
                    If you have any questions or need help getting started, our support team is just an email away
                    at
                    <a href="mailto:hyrivo73@gmail.com" style="text-decoration: none; outline: none; color: #00BFFF"
                        >hyrivo73@gmail.com</a
                    >. We're here to assist you every step of the way!
                    </p>
                    <p>Thank you from team,<br /><img style="height: 42px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" /></p>
                </div>
                </div>`
    }
    await transporter.sendMail(mailOptions)
}

router.post('/username',log,async (req,res) => {
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
        const {userId} = req.body
        if(!userId) return res.status(400).json({message: 'User ID not found'})

        const user = await User.findById(userId)
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
    const {userId, otp} = req.body
    try {
        const record = await ResetOtp.findOne({ userId }).sort({createdAt: -1})

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

router.post('/verify-auth',log,async (req,res) => {
    const {userId,otp} = req.body

    const user = await User.findById(userId)
    if(!user || !user.twoFaSecrets) return res.status(400).json({ message: '2FA not setup' })

    const verified = speakeasy.totp.verify({
        secret: user.twoFaSecrets,
        encoding: 'base32',
        token: otp,
        window: 1
    })

    if(!verified) return res.status(400).json({message:'Invalid or expired OTP'})
    
    res.status(200).json({ message: 'Authenticator OTP verified successfully'})
})


router.post('/reset-password',log,async (req,res) => {
    const {newPassword,userId} = req.body
    if(!userId) return res.status(400).json({message: 'User ID Missing'})

    try {
        const user = await User.findById(userId)
        if(!user) return res.status(400).json({message: 'User not found'})
        
        user.password = newPassword
        await user.save()
        await passwordChangeMail(user.email,user.username)

        res.status(200).json({message: 'Password updated Successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/get-username',log,async (req,res) => {
    const {userId} = req.query
    if(!userId) return res.status(400).json({message: 'No User ID found'})

    try {
        const user = await User.findById(userId).select('username')
        if(!user) return res.status(404).json({message: 'User not found'})

        res.json({username: user.username})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router