const express = require('express');
const router = express.Router();
const Data = require('../models/Data')
const User = require('../models/User')
const cloudinary = require('../middleware/cloudinary')
const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

router.post('/uploads',upload.single('file'),async (req,res) => {
    try {
        if (!req.file) return res.status(400).json({error:"No file found"})
        const streamifier = require('streamifier')
        const streamUpload = (req) => {
            return new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream({folder:'uploads'},
                    (error,result)=> {
                        if (result) resolve(result)
                        else reject(error)
                    }
                )
                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }
        
        const result = await streamUpload(req)
        return res.status(201).json({
            filename:result.original_filename,
            filepath:result.secure_url
        })
    } catch (error) {
        console.error('cloudinary upload error',error)
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
        const uniqueKey = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        if (!user.response) user.response = new Map()
        
        user.response.set(uniqueKey,save._id)

        user.markModified('response');
        await user.save();

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
            const responseMap = usr.response || {}

            let modified = false;

            for (const [key, value] of responseMap.entries()) {
                if (value.toString() === id) {
                    responseMap.delete(key);
                    modified = true;
                }
            }

            if (modified) {
                usr.markModified('response');
                await usr.save();
            }
        }
        res.json({message:'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router