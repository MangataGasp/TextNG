const jwt = require("jsonwebtoken")
require('dotenv').config

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({error: "No token provided"})
    }

    const token = authHeader.split(" ")[1] //always give space in-between that (" ") because it'll block whatever its trying to protect
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = user
        next()
    } catch (err) {
      console.error(err);
      res.status(401).json({error: "Invalid token"})  
    }
}

module.exports = authMiddleware