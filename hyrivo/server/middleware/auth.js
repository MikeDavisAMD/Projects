const jwt = require('jsonwebtoken');
const BlacklistsToken = require('../models/BlacklistsToken');

const auth = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query.token) {
        token = req.query.token;
    }
    //split(' ') <-- space between quotes is important or it causes no token found error 
    // and token from query is for enabling 2FA

    if (!token) return res.status(400).json({error:"no token found"})

    const blacklistedToken = await BlacklistsToken.findOne({token})
    if (blacklistedToken) return res.status(400).json({message:"Token has been logged out"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(400).json({error:"invalid token"})
    }
}

module.exports = auth