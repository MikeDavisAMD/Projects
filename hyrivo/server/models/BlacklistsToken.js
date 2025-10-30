const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true},
    expiry: { type: Date, required: true}
})

blacklistTokenSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema)