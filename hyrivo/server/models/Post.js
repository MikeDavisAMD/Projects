const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postText: { type: String, required: true },
    media: String,
    mediaType: String,
    postedAt: { type: Date, default: Date.now(), required: true },
    postView: { type: String, default: "everyone" },
    postComment: { type: String, default: "everyone" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    repost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    savedPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{type:mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)