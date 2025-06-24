const express = require('express');
const router = express.Router();
const Data = require('../models/Data')
const User = require('../models/User')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        const uniqueName = Date.now()+'-'+file.originalname
        cb(null,uniqueName)
    }
})

const upload = multer({ storage: storage })

router.post('/uploads',upload.single('file'),async (req,res) => {
    try {
        const {filename,path:filepath} = req.file
        res.status(201).json({
            filename,
            filepath
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/',async (req,res) => {
    try {
        const {username,fname,...forms} = req.body

        const user = await User.findOne({username})
        if (!user) return res.status(400).json({error:"No user found"})

        const form = new Data({
            fname,
            ...forms,
            userId:user._id
        })
        const save = await form.save()
        if (!user.response) user.response = new Map()
        
        user.response.set(fname,save._id)
        await user.save()

        res.status(201).json({responseId: save._id})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/',async (req,res) => {
    try {
        const data = await Data.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async (req,res) => {
    try {
        const data = await Data.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.put('/:id',async (req,res) => {
    try {
        const data = await Data.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        }) 
        if (!data) return res.status(400).json({error:'data not found'})
        res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const id = req.params.id
        const data = await Data.findByIdAndDelete(id)
        if (!data) return res.status(400).json({error:"Data not found"})
        const user = await User.find({ response: { $exists: true } })
        for (const usr of user) {
        const responseMap = usr.response instanceof Map
            ? usr.response
            : new Map(Object.entries(usr.response))
    
        for (const [key, value] of responseMap.entries()) {
            if (value.toString() === id) {
            responseMap.delete(key)
            usr.response = responseMap
            usr.markModified('response') 
            await usr.save()
            break 
            }
        }
        }
        res.json({message:'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router