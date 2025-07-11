const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isCompany: {type:Boolean, required:true},
    remember: {type:Boolean, required:true}
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