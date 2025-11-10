const express = require('express');
const router = express.Router()
const multer = require('multer');
const cloudinary = require('../middleware/cloudinary')
const log = require('../middleware/log')
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const streamifier = require('streamifier');
const { Profile } = require('../models/Profile');

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
        const { postText, postView, postComment } = req.body
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "Unable to fetch userDetails" })

        if (!postText && !req.file) return res.status(400).json({ message: "Post text or text and media required" })

        let mediaUrl = null
        let mediaType = null

        if (req.file) {
            mediaType = "document"
            if (req.file.mimetype.startsWith("image/")) mediaType = "image"
            else if (req.file.mimetype.startsWith("video/")) mediaType = "video"

            const uploadResponse = await streamUpload(req.file.buffer, `Hyrivo/Posts/${user.username}/${mediaType}`, "auto")

            mediaUrl = uploadResponse.secure_url
        }

        const newPost = new Post({
            userId: req.userId,
            postText,
            media: mediaUrl,
            mediaType,
            postedAt: new Date(),
            postView,
            postComment,
            likes: [],
            comments: [],
            repost: [],
            savedPost: [],
        })

        await newPost.save()

        user.postId.push(newPost._id)
        await user.save()

        return res.status(200).json({ message: "Post created successfully", post: newPost })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("Upload error", error)
    }
})

router.get('/all', log, auth, async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts) return res.status(400).json({ message: "Posts not found" })
        const result = await Promise.all(
            posts.map(async (p) => {
                const user = await User.findById(p.userId)
                const profile = await Profile.findOne({ userId: p.userId })
                return { user, profile, post: p }
            })
        )
        if (!result) return res.status(400).json({ message: "Unable to fetch details" })
        return res.status(200).json({ result })
    } catch (error) {
        console.error("unable to fetch posts", error)
        res.status(500).json({ error: error.message })
    }
})

router.put('/edit', log, auth, async (req, res) => {
    try {
        const { postId, postText, postComment, postView } = req.body
        if (!postId) return res.status(400).json({ message: "Unable to find Post" })
        const post = await Post.findById(postId)
        if (!post) return res.status(400).json({ message: "Unable to find post" })

        if (postText !== undefined) post.postText = postText
        if (postView !== undefined) post.postView = postView
        if (postComment !== undefined) post.postComment = postComment

        await post.save()

        return res.status(200).json({ message: "post edited successfully" })
    } catch (error) {
        console.error("Unable to edit",error)
        res.status(500).json({ error: error.message })
        console.error('Error Editing post', error)
    }
})

router.delete('/delete', log, auth, async (req, res) => {
    try {
        const { postId } = req.body
        if (!postId) return res.status(400).json({ message: "Unable to find Post" })
        const post = await Post.findById(postId)
        if (!post) return res.status(400).json({ message: "Unable to find post" })

        await User.findByIdAndUpdate(post.userId, { $pull: { postId: postId } })
        await Post.findByIdAndDelete(postId)

        return res.status(200).json({ message: "Post Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error('Error Deleting post', error)
    }
})

module.exports = router