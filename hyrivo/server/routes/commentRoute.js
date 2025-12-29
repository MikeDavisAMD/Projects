const express = require('express');
const router = express.Router()
const log = require('../middleware/log')
const auth = require('../middleware/auth')
const Comment = require('../models/Comment');
const { default: mongoose } = require('mongoose');
const Post = require('../models/Post');

router.post('/:postId', log, auth, async (req, res) => {
    try {
        const { text } = req.body
        const { postId } = req.params

        const post = await Post.findById(postId)
        if (!post) return res.status(400).json({ message: "Post not found" })

        const newComment = new Comment({
            postId,
            userId: req.userId,
            text
        })
            await newComment.save()

        post.comments.push(newComment._id)
        await post.save()

        return res.status(200).json({ message: "New Comment Added" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/reply/:commentId', log, auth, async (req, res) => {
    try {
        const { text, parentReplyid = [] } = req.body

        const comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        let currentLevel = comment
        for (const id of parentReplyid) {
            currentLevel = currentLevel.replies.id(id)
            if (!currentLevel) return res.status(400).json({ message: "Reply not found" })
        }

        const newReply = {
            _id: new mongoose.Types.ObjectId(),
            commentId: req.params.commentId,
            userId: req.userId,
            text,
            likes: [],
            replies: []
        }

        currentLevel.replies.push(newReply)
        await comment.save()

        return res.status(200).json({ message: "Reply added successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/like/:commentId', log, auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(400).json({ message: "Unable to like the comment" })

        const index = comment.likes.indexOf(req.userId)
        if (index > -1) {
            comment.likes.splice(index, 1)
        } else {
            comment.likes.push(req.userId)
        }

        await comment.save()
        return res.status(200).json({ message: "Comment liked successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router