require('dotenv').config();
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
        isCompany: false
    });
    await user.save();
    }

    return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
      // Google profile is in req.user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    }
  );
  

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

router.post('/login',async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await User.findOne({
            $or:[{username: username},{email: username}]
        })
        if(!user) return res.status(400).json({message:'Invalid Username or password'})
        
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

router.get('/:id',async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).json({message:'User not found'})
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