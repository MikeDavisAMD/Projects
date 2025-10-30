const express = require('express');
const router = express.Router()
const multer = require('multer');
const cloudinary = require('../middleware/cloudinary')
const log = require('../middleware/log')
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const streamifier = require('streamifier');

const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } })

function streamUpload(fileBuffer, folder, resource_type) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}

router.post('/create', auth, log, upload.single('media'), async (req, res) => {
    try {
        const { postText } = req.body
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "Unable to fetch userDetails" })


        if (!postText && !req.file) return res.status(400).json({ message: "Post text or text and media required" })

        let mediaUrl = null

        if (req.file) {
            let mediaType = "document"
            if (req.file.mimetype.startsWith("image/")) mediaType = "image"
            else if (req.file.mimetype.startsWith("video/")) mediaType = "video"

            const uploadResponse = await streamUpload(req.file.buffer, `Hyrivo/Posts/${user.username}/${mediaType}`, "auto")

            mediaUrl = uploadResponse.secure_url
        }

        const newPost = new Post({
            userId: req.userId,
            postText,
            media: mediaUrl,
            postedAt: new Date(),
            likes: 0,
            comments: []
        })

        await newPost.save()
        return res.status(200).json({ message: "Post created successfully", post: newPost })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("Upload error", error)
    }
})

module.exports = router