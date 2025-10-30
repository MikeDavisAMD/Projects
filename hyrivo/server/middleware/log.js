const fs = require('fs');
const path = require('path');
const Log = require('../models/Log')
const User = require('../models/User')

const log = (req, res, next) => {
    const today = new Date().toISOString().slice(0,10)

    res.on('finish',async () => {
        let userId = req.userId || (req.user?._id) || null
        let username = null

        try {
            if (!userId && (req.body?.username || req.body?.email || req.query?.email || req.body?.userId || req.query?.userId)) {

                if (req.body?.userId || req.query?.userId) {
                    const user = await User.findById(req.body.userId || req.query.userId).select('_id username')
                    if (user) {
                        userId = user._id
                        username = user.username
                    }
                } else {
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
                }

            } else if (userId && !username) {
                const user = await User.findById(userId).select('username')
                if (user) {
                    username = user.username
                }
            }

            const logEntry = await Log.findOneAndUpdate(
                {
                    method: req.method,
                    route: req.originalUrl,
                    userId,
                    date: today
                },
                {
                    $inc: {count: 1},
                    $setOnInsert: {
                        statusCode: res.statusCode,
                        username,
                        ip: req.ip,
                        userAgent: req.headers['user-agent'],
                        timestamp: new Date()
                    }
                },
                { upsert: true, new: true}
            )

            const displayUser = userId ? `${userId} [${username || 'unknown'}]` : 'ANONYMOUS'
            const summaryLine = `[${today}] ${displayUser} accessed ${req.originalUrl} (${req.method}) ${logEntry.count} time(s)\n`
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