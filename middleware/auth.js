const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('token......' + token + 'decoded........' + decoded)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)

        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        console.log(req.token)
        console.log(req.user)

        next()
    } catch(e) {
        res.send('Unable to authenticate')
    } 
}

module.exports = auth;