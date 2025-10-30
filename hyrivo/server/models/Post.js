const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postText: { type: String, required: true },
    media: String,
    postedAt: { type: Date, default: Date.now(), required: true },
    likes: Number,
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        likes: Number
    }]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)