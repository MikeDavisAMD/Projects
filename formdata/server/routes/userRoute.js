require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

router.post('/register',async (req,res) => {
    const {username,password,isAdmin} = req.body
    try {
        const existingUser = await User.findOne({username})
        if (existingUser) return res.status(400).json({message:"User already exists"})

        const newUser = new User({username,password,isAdmin})
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/login',async (req,res) => {
    const {username,password} = req.body
    try {
        const isUser = await User.findOne({username})
        if (!isUser) return res.status(400).json({message:"Invalid Username or password"})

        const isPassword = await isUser.matchPassword(password)
        if (!isPassword) return res.status(400).json({message:"Invalid username or Password"})

        const token = jwt.sign({id:isUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.json({
            token,
            user:{
                id:isUser._id,
                username:isUser.username,
                isAdmin:isUser.isAdmin
            }
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/me', auth ,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: 'User not found' });
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
        if (password) {
            const bcrypt = require('bcryptjs')
            update.password = await bcrypt.hash(password, 10)
        }
        const user = await User.findByIdAndUpdate(req.userId,{$set:update},{
            new:true,
            runValidators:true
        })
        if (!user) return res.status(400).json({error:"User not found"})
        res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(400).json({error:"user not found"})
        res.json({message:"Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router