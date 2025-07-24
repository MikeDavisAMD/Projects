const fs = require('fs');
const path = require('path');
const Log = require('../models/Log')
const LogStats = require('../models/LogStats')
const User = require('../models/User')

const log = (req, res, next) => {
    const today = new Date().toISOString().slice(0,10)

    res.on('finish',async () => {
        let userId = req.userId || null
        let username = null

        try {
            if (!userId && (req.body?.username || req.body?.email || req.query?.email)) {

                const user = await User.findOne({
                    $or: [
                        {username: req.body.username},
                        {email: req.body.email || req.query.email},
                        {email: req.body.username}
                    ]
                }).select('_id username')

                if (user) {
                    userId = user._id
                    username = user.username
                }

            } else if (userId && !username) {
                const user = await User.findById(userId).select('username')
                if (user) {
                    username = user.username
                }
            }

            const logEntry = {
                method: req.method,
                route: req.originalUrl,
                statusCode: res.statusCode,
                userId: req.userId || null,
                username: username,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                date: today
            }

            await Log.create(logEntry)

            const stat = await LogStats.findOneAndUpdate(
                { 
                    route: req.originalUrl,
                    userId: req.userId,
                    date: today
                },
                { $inc: {count: 1} },
                { upsert: true, new: true }
            )

            const displayUser = userId ? `${userId} [${username || 'unknown'}]` : 'ANONYMOUS'
            const summaryLine = `[${today}] ${displayUser} accessed ${req.originalUrl} (${req.method}) ${stat.count} time(s)\n`
            const filePath = path.join(__dirname,'../logs/logs.txt')

            fs.appendFile(filePath, summaryLine, (error)=>{
                if(error) console.error(error.message)
            })
        } catch (error) {
            console.error(error.message)
        }
    })
    next()
}

module.exports = log