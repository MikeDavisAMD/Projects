require('dotenv').config();
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Otp = require('../models/Otp');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Nodemailer function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

// mail on successfull registration
const registerSuccess = async (email,username) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: `Welcome to Hyrivo, ${username}`,
        text: `Hi ${username}!! Your Account has been registered successfully`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #E4F7FF">
                <div style="max-width: 600px; margin: auto; padding: 16px">
                    <a style="text-decoration: none; outline: none" href="" target="_blank">
                    <img
                        style="height: 32px; vertical-align: middle"
                        height="32px"
                        src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826110/favicon_fjofxa.png"
                        alt="logo"
                    />
                    </a>
                    <p>Welcome to the <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826048/Hyrivo_copy_x9etkh.png" alt="logo" /> family! We're excited to have you on board.</p>
                    <p>
                    Your account has been successfully created, and you're now ready to explore all the great
                    features we offer.
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
                    <p>Thank you from team,<br /><img style="height: 42px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1752826048/Hyrivo_copy_x9etkh.png" alt="logo" /></p>
                </div>
                </div>`,
    }
    await transporter.sendMail(mailOptions)
}

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
 
router.post('/register-temp',async (req,res) => {
    const {email,username,password,isCompany} = req.body
    try {
        const exUser = await User.findOne({username})
        if(exUser) return res.status(422).json({error:'User Already Exists'})

        const verifyToken = crypto.randomBytes(32).toString('hex')
        const tokenExpiry = new Date(Date.now()+(60*60*1000))

        const user = new User({email,username,password,isCompany,isVerified:false,verifyToken,tokenExpiry})
        await user.save()
        const verifyLink = `http://localhost:2000/user/verify?token=${verifyToken}`

        res.status(200).json({message: 'verification link send to email', verifyLink})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/register',async (req,res) => {
    const {email,username,password,isCompany} = req.body
    try {
        const exUser = await User.findOne({username})
        if(exUser) return res.status(422).json({error:'User Already Exists'})

        const user = new User({email,username,password,isCompany})
        await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({
            message: 'User Registered Successfully',
            token
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }    
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
      // Google profile is in req.user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.redirect(`http://localhost:3000/oauthSuccess?token=${token}`);
    }
  );

  router.get('/verify',async (req,res) => {
    const {token} = req.query

    if(!token) return res.status(400).json({message:'invalid or no token found'})

    try {
        const user = await User.findOne({
            verifyToken: token,
            tokenExpiry: { $gt:Date.now() }
        })

        if(!user) return res.status(400).json('Invalid or expired verification link')

        user.isVerified = true
        user.verifyToken = undefined
        user.tokenExpiry = undefined
        await user.save()

        const authToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'15m'})
        res.redirect(`http://localhost:3000/Enable2FA?token=${authToken}`)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/login',async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await User.findOne({$or:[{username: username},{email: username}]})
        
        if(!user) return res.status(400).json({message:'Invalid Username or password'})
        if(!user.isVerified) return res.status(401).json({message:'User is not verified'})
        
        const pw = await user.matchPassword(password)
        if(!pw) return res.status(400).json({message:'Invalid username or Password'})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                isCompany: user.isCompany
            }
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/send-otp',auth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(404).json({message: 'User not found'})
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000)

        await Otp.deleteMany({userId: user._id})
        await Otp.create({userId: user._id,otp,otpExpiry})

        await sendOTPEmail(user.email,otp)
        res.status(200).json({message: 'OTP send Successfully', email: user.email})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/verify-otp',auth,async (req,res) => {
    const {otp} = req.body
    try {
        const record = await Otp.findOne({ userId: req.userId }).sort({createdAt: -1})

        if(!record) return res.status(404).json({message: 'No OTP Found'})

        if(record.otpExpiry < Date.now()){
            await Otp.deleteOne({_id: record._id})
            return res.status(400).json({message: 'OTP Expired'})
        }

        if(record.otp !== otp) return res.status(400).json({message: "Invalid Otp"})
        await Otp.deleteOne({_id: record._id})
        
        res.status(200).json({message:'OTP verified successfully👍'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/enable-auth',auth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(user.isTwoFaEnabled) return res.json({alreadyEnabled: true})

        const secret = speakeasy.generateSecret({
            name: `Hyrivo (${user.email})`,
            length: 20
        })

        const users = await User.findByIdAndUpdate(req.userId, {twoFaSecrets: secret.base32},{new:true})
        if (!users) return res.status(400).json({ error: 'User not found' }) 

        users.twoFaSecrets = secret.base32
        await users.save()

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
        const manualCode = secret.base32.match(/.{1,4}/g).join(' ')
        res.json({qrcode: qrCodeUrl, secret: secret.base32, manual: manualCode, accountName: `Hyrivo (${user.email})`})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/enable-auth/done',auth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user || !user.twoFaSecrets) {
            res.status(400).json({message: 'User or Secret not found'})
        }

         user.isTwoFaEnabled = true
         await user.save()
         await registerSuccess(user.email,user.username)

        res.status(200).json({message: '2FA successfully enabled'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/verify-auth',auth,async (req,res) => {
    const {otp} = req.body

    const user = await User.findById(req.userId)
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

router.get('/me',auth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message:'user not found'})
        res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/',auth,async (req,res) => {
    try {
        const user = await User.find().select('username')
        res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.put('/update',auth,async (req,res) => {
    const {username,password} = req.body
    try {
        const update = {}
        if (username) update.username = username
        if (password) update.password = await bcrypt.hash(password, 10)
        const user = await User.findByIdAndUpdate(req.userId,{$set: update},{
            new:true,
            runValidators:true
        })
        if(!user) return res.status(400).json({message:'User not found'})
        res.json({message:'Updated Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).json({message:'User not found'})
        res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(400).json({message:'User not found'})
        res.json({message:'User Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router