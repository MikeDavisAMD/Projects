require('dotenv').config();
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const log = require('../middleware/log')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Otp = require('../models/Otp');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const useragent = require('useragent');
const axios = require('axios');
const BlacklistsToken = require('../models/BlacklistsToken');
const { Profile } = require('../models/Profile');
const Post = require('../models/Post');

// Nodemailer function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

// device details
const deviceDetails = async (req) => {
    const agent = useragent.parse(req.headers['user-agent'])
    const browser = agent.toAgent()
    const os = agent.os.toString()
    const platform = agent.platform

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    if (ip.includes('::ffff:')) ip = ip.split('::ffff:')[1]

    let city = 'unknown', region = 'unknown', country = 'unknown'
    try {
        const { data } = await axios.get(`http://ipapi.co/${ip}/json/`)
        city = data.city
        region = data.region
        country = data.country_name
    } catch (error) {
        console.warn("Unable to get details")
        console.error(error.message)
    }

    return { browser, os, platform, ip, city, country, region }
}

// Login success
const loginSuccess = async (browser, os, platform, ip, city, country, region, username, email) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: `Logged in from device ${ip}`,
        text: `Hi ${username}!! Logged in to device`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px">
                <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
                    <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771099/favicon_rqa3fx.png" alt="logo" />
                </a>
                <p style="padding-top: 16px; border-top: 1px solid #eaeaea">Hi ${username},</p>
                <p>
                    Your account has been logged in from device with IP Address ${ip}. <br/><br/>
                    <table>
                    <tbody>
                        <tr>
                        <td><b>Browser</b></td>
                        <td>:</td>
                        <td>${browser}</td>
                        </tr>
                        <tr>
                        <td><b>OS</b></td>
                        <td>:</td>
                        <td>${os}</td>
                        </tr>
                        <tr>
                        <td><b>Platform</b></td>
                        <td>:</td>
                        <td>${platform}</td>
                        </tr>
                        <tr>
                        <td><b>City</b></td>
                        <td>:</td>
                        <td>${city}</td>
                        </tr>
                        <tr>
                        <td><b>Country</b></td>
                        <td>:</td>
                        <td>${country}</td>
                        </tr>
                        <tr>
                        <td><b>Region</b></td>
                        <td>:</td>
                        <td>${region}</td>
                        </tr>
                    </tbody>
                    </table>
                    
                </p>
                <p style="padding-top: 16px; border-top: 1px solid #eaeaea">
                    Thank you from team,<br /><img style="height: 42px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" />
                </p>
                </div>`
    }
    await transporter.sendMail(mailOptions)
}

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: 'OTP for your Hyrivo Login',
        text: `Your OTP for Login is ${otp}`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
                <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
                    <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771099/favicon_rqa3fx.png" alt="logo" />
                </a>
                <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
                    To authenticate, please use the following One Time Password (OTP):
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

// Google OAuth authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/user/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: await bcrypt.hash(Math.random().toString(36), 10),
                isCompany: false,
                isVerified: true
            });
            await user.save();
        } else if (!user.isVerified) {
            user.isVerified = true
            await user.save()
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

router.post('/register-temp', log, async (req, res) => {
    const { email, username, password, isCompany } = req.body
    try {
        const exUser = await User.findOne({ $or: [{ username }, { email }] })
        if (exUser) return res.status(422).json({ error: 'User Already Exists' })

        const verifyToken = crypto.randomBytes(32).toString('hex')
        const tokenExpiry = new Date(Date.now() + (60 * 60 * 1000))

        const user = new User({ email, username, password, isCompany, isExistingUser: false, isVerified: false, verifyToken, tokenExpiry })
        await user.save()
        const verifyLink = `http://localhost:2000/user/verify?token=${verifyToken}`

        res.status(200).json({ message: 'verification link send to email', verifyLink })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/register', log, async (req, res) => {
    const { email, username, password, isCompany } = req.body
    try {
        const exUser = await User.findOne({ $or: [{ username }, { email }] })
        if (exUser) return res.status(422).json({ error: 'User Already Exists' })

        const user = new User({ email, username, password, isCompany })
        await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({
            message: 'User Registered Successfully',
            token
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

router.get('/auth/google/callback', log,
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
        // Google profile is in req.user
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        req.userId = req.user._id

        res.redirect(`http://localhost:3000/oauthSuccess?token=${token}`);
    }
);

router.get('/verify', log, async (req, res) => {
    const { token } = req.query

    if (!token) return res.status(400).json({ message: 'invalid or no token found' })

    try {
        const user = await User.findOne({
            verifyToken: token,
            tokenExpiry: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json('Invalid or expired verification link')

        user.isVerified = true
        user.verifyToken = undefined
        user.tokenExpiry = undefined
        await user.save()

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
        res.redirect(`http://localhost:3000/Enable2FA?token=${authToken}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/login', log, async (req, res) => {
    const { username, password, remember } = req.body
    try {
        const user = await User.findOne({ $or: [{ username: username }, { email: username }] })

        if (!user) return res.status(400).json({ message: 'Invalid Username or password' })
        if (!user.isVerified) return res.status(401).json({ message: 'User is not verified' })

        const pw = await user.matchPassword(password)
        if (!pw) return res.status(400).json({ message: 'Invalid username or Password' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: remember ? '30d' : '1d' })

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                isCompany: user.isCompany
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/send-otp', log, auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ message: 'User not found' })

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000)

        await Otp.deleteMany({ userId: user._id })
        await Otp.create({ userId: user._id, otp, otpExpiry })

        await sendOTPEmail(user.email, otp)
        res.status(200).json({ message: 'OTP send Successfully', email: user.email })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/verify-otp', log, auth, async (req, res) => {
    const { otp } = req.body
    try {
        const record = await Otp.findOne({ userId: req.userId }).sort({ createdAt: -1 })

        if (!record) return res.status(404).json({ message: 'No OTP Found' })

        if (record.otpExpiry < Date.now()) {
            await Otp.deleteOne({ _id: record._id })
            return res.status(400).json({ message: 'OTP Expired' })
        }

        if (record.otp !== otp) return res.status(400).json({ message: "Invalid Otp" })
        await Otp.deleteOne({ _id: record._id })

        const user = await User.findById(req.userId)
        const { browser, os, platform, ip, city, country, region } = await deviceDetails(req)
        await loginSuccess(browser, os, platform, ip, city, country, region, user.username, user.email)

        res.status(200).json({ message: 'OTP verified successfully👍' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/enable-auth', log, auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (user.isTwoFaEnabled) return res.json({ alreadyEnabled: true })

        const secret = speakeasy.generateSecret({
            name: `Hyrivo (${user.email})`,
            length: 20
        })

        const users = await User.findByIdAndUpdate(req.userId, { twoFaSecrets: secret.base32 }, { new: true })
        if (!users) return res.status(400).json({ error: 'User not found' })

        users.twoFaSecrets = secret.base32
        await users.save()

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
        const manualCode = secret.base32.match(/.{1,4}/g).join(' ')

        res.status(200).json({ qrcode: qrCodeUrl, secret: secret.base32, manual: manualCode, accountName: `Hyrivo (${user.email})` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/enable-auth/done', log, auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user || !user.twoFaSecrets) {
            res.status(400).json({ message: 'User or Secret not found' })
        }

        user.isTwoFaEnabled = true
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({
            message: '2FA successfully enabled', token,
            user: {
                id: user._id,
                username: user.username,
                isCompany: user.isCompany,
                isTwoFaEnabled: user.isTwoFaEnabled
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/verify-auth', log, auth, async (req, res) => {
    const { otp } = req.body

    const user = await User.findById(req.userId)
    if (!user || !user.twoFaSecrets) return res.status(400).json({ message: '2FA not setup' })

    const verified = speakeasy.totp.verify({
        secret: user.twoFaSecrets,
        encoding: 'base32',
        token: otp,
        window: 1
    })

    const { browser, os, platform, ip, city, country, region } = await deviceDetails(req)
    await loginSuccess(browser, os, platform, ip, city, country, region, user.username, user.email)

    if (!verified) return res.status(400).json({ message: 'Invalid or expired OTP' })

    res.status(200).json({ message: 'Authenticator OTP verified successfully' })
})

router.get('/me', log, auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: 'Details not found' })
        const profile = await Profile.findOne({ userId: req.userId })
        const post = await Post.find({ userId: req.userId }).sort({ postedAt: -1 })
        res.status(200).json({ user: user, profile: profile, post: post })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.get('/all', log, auth, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } }, { password: 0 })
        if (!users) return res.status(400).json({ message: "Error fetching user details" })
        const result = await Promise.all(users.map(async u => {
            let profile = null
            if (u.profileId) {
                profile = await Profile.findById(u.profileId)
            }
            return { user: u, profile }
        }))
        res.status(200).json({ result, count: result.length })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update', log, auth, async (req, res) => {
    const { username, password } = req.body
    try {
        const update = {}
        if (username) update.username = username
        if (password) update.password = await bcrypt.hash(password, 10)
        const user = await User.findByIdAndUpdate(req.userId, { $set: update }, {
            new: true,
            runValidators: true
        })
        if (!user) return res.status(400).json({ message: 'User not found' })
        res.status(200).json({ message: 'Updated Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/org', log, auth, async (req, res) => {
    const { isCompany } = req.body
    const user = await User.findById(req.userId)
    if (!user) return res.status(400).json({ message: "User not found" })
    user.isCompany = isCompany
    await user.save()
    res.json({
        message: "Account type updated successfully",
        user: {
            id: user._id,
            username: user.username,
            isCompany: user.isCompany
        }
    })
})

router.put('/update/username', log, auth, async (req, res) => {
    const { username } = req.body
    try {
        if (!username) return res.status(400).json({ message: "Username not found" })

        const existingUser = await User.findOne({ username })
        if (existingUser && existingUser._id.toString() !== req.userId.toString()) {
            return res.status(400).json({ message: "Username already taken" })
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: { username } },
            { new: true, runValidators: true }
        )

        if (!user) return res.status(400).json({ message: "User not found" })

        res.status(200).json({ message: 'Username updated successfully', username: user.username })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/email', log, auth, async (req, res) => {
    const { email } = req.body
    try {
        if (!email) return res.status(400).json({ message: "Email not found" })

        const users = await User.findById(req.userId)
        if (!users) return res.status(400).json({ message: "User not found or Invalid User ID" })

        if (users.email === email) return res.json({ message: "Email not changed", email: users.email })

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: { email } },
            { new: true, runValidators: true }
        )

        if (!user) return res.status(400).json({ message: "User not found" })

        let response

        if (user.isTwoFaEnabled) {
            const secret = speakeasy.generateSecret({
                name: `Hyrivo (${email})`,
                length: 20
            })

            user.twoFaSecrets = secret.base32

            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
            const manualCode = secret.base32.match(/.{1,4}/g).join('')

            await user.save()

            response = {
                message: "Email updated & 2FA updated for new email successfully",
                email: user.email,
                accountName: `Hyrivo ${email}`,
                qrcode: qrCodeUrl,
                manual: manualCode,
                secret: secret.base32
            }
        } else {
            response = { message: "Email updated successfully", email: user.email }
        }

        await user.save()

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/password', log, auth, async (req, res) => {
    const { newPassword, currentPassword } = req.body
    try {
        if (!newPassword) return res.status(400).json({ message: "No new Password provided" })

        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "No user found" })

        if (currentPassword) {
            const isMatch = await user.matchPassword(currentPassword)
            if (!isMatch) return res.status(400).json({ message: "Current Password is incorrect" })
        }

        user.password = newPassword
        await user.save()

        res.status(200).json({ message: "Password updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/logout', log, auth, async (req, res) => {
    try {
        const authHead = req.headers.authorization
        if (!authHead || !authHead.startsWith("Bearer ")) return res.status(401).json({ message: 'No or invalid Token' })

        const token = authHead.split(" ")[1]
        const decoded = jwt.decode(token)

        if (!decoded || !decoded.exp) return res.status(400).json({ message: 'Invalid Token' })

        await BlacklistsToken.create({
            token,
            expiry: new Date(decoded.exp * 1000)
        })

        return res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/:id', log, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(400).json({ message: 'User not found' })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/change-type', log, auth, async (req, res) => {
    const user = await User.findById(req.userId)
    if (!user) return res.status(400).json({ message: "User not found" })

    user.isCompany = !user.isCompany
    await user.save()

    res.json({
        message: "Account type changed successfully",
        user: {
            id: user._id,
            username: user.username,
            isCompany: user.isCompany
        }
    })
})

router.delete('/:id', log, auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(400).json({ message: 'User not found' })
        res.json({ message: 'User Deleted Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router