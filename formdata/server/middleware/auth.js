const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1] //split(' ') <-- space between quotes is important or it causes no token found error

    if (!token) return res.status(400).json({error:"no token found"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(400).json({error:"invalid token"})
    }
}

module.exports = auth