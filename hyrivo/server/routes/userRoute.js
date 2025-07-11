require('dotenv').config();
const express = require('express');
const router = express.Router()
const User = require('../models/User')

router.post('/',async (req,res) => {
    try {
        const data = new User(req.body)
        await data.save()
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }    
})

router.get('/',async (req,res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async (req,res) => {
    try {
        const data = await User.findById(req.params.id)
        if(!data) return res.status(400).json({message:'User not found'})
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.put('/:id',async (req,res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!data) return res.status(400).json({message:'User not found'})
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        if(!data) return res.status(400).json({message:'User not found'})
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router