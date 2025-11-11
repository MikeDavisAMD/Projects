const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        replies: []
    }]
}, { timestamps: true })

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [replySchema]
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)