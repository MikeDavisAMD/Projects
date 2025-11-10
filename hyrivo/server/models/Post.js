const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postText: { type: String, required: true },
    media: String,
    mediaType: String,
    postedAt: { type: Date, default: Date.now(), required: true },
    postView: { type: String, default: "everyone" },
    postComment: { type: String, default: "everyone" },
    likes: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],
    repost: [{
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    }],
    savedPost: [{
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        likes: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        }],
    }]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)