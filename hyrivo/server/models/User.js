const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isCompany: {type: Boolean, default: false},
    remember: Boolean,
    isVerified: {type: Boolean, default: false},
    verifyToken: String,
    tokenExpiry: Date,
    createdAt: {type: Date, default: Date.now},
    twoFaSecrets: String,
    isTwoFaEnabled: {type: Boolean, default: false},
    isExistingUser: {type: Boolean, default: false},
    profileId: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

// hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})

// comparing passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User',userSchema)