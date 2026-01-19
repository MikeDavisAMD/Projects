const express = require('express');
const router = express.Router()
const log = require('../middleware/log')
const auth = require('../middleware/auth')
const Comment = require('../models/Comment');
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
        const { text, replyUserId } = req.body

        const comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        const newReply = {
            commentId: req.params.commentId,
            userId: req.userId,
            replyUserId,
            text,
            likes: []
        }

        comment.replies.push(newReply)
        await comment.save()

        return res.status(200).json({ message: "Reply added successfully", reply: newReply })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/like/:commentId', log, auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) return res.status(400).json({ message: "Unable to like the comment" })

        const index = comment.likes.indexOf(req.userId)
        index > -1 ? comment.likes.splice(index, 1) : comment.likes.push(req.userId)

        await comment.save()
        return res.status(200).json({ message: "Comment liked successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/reply/like/:commentId/:replyId', log, auth, async (req, res) => {
    try {
        const { commentId, replyId } = req.params

        const comment = await Comment.findById(commentId)
        if (!comment) return res.status(404).json({ message: "Cannot like the reply" })

        const reply = comment.replies.findById(replyId)
        if (!reply) return res.status(404).json({ message: "No reply found" })

        const index = reply.likes.indexOf(req.userId)
        index > -1 ? reply.likes.splice(index, 1) : reply.likes.push(req.userId)

        await comment.save()
        res.status(200).json({ message: "Reply like updated" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:postId', log, auth, async (req, res) => {
    try {
        const { postId } = req.params

        const comments = await Comment.find({ postId })

        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:commentId', log, auth, async (req, res) => {
    try {
        const { commentId } = req.params

        const comment = await Comment.findById(commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        await Post.findByIdAndUpdate(comment.postId, {
            $pull: { comments: comment._id }
        })

        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({ message: "Comment Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/reply/:commentId/:replyId', log, auth, async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router