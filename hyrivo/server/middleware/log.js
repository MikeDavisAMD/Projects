const fs = require('fs');
const path = require('path');
const Log = require('../models/Log')
const LogStats = require('../models/LogStats')

const log = (req, res, next) => {
    const today = new Date().toISOString().slice(0,10)

    res.on('finish',async () => {
        const logEntry = {
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            userId: req.userId || null,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            date: today
        }

        try {
            await Log.create(logEntry)
        } catch (error) {
            res.status(500).json({error: error.message})
        }

        try {
            const stat = await LogStats.findOneAndUpdate(
                { 
                    route: req.originalUrl,
                    userId: req.userId,
                    date: today
                },
                { $inc: {count: 1} },
                { upsert: true, new: true }
            )

            const summaryLine = `[${today}] ${req.userId || 'Anonymous'} accessed ${req.originalUrl} (${req.method}) ${stat.count} time(s)\n`
            const filePath = path.join(__dirname,'../logs/logs.txt')

            fs.appendFile(filePath, summaryLine, (error)=>{
                if(error) console.error(error.message)
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })
    next()
}

module.exports = log