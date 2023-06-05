const mongoose = require('mongoose')
const User = require('../models/user')

const Images = mongoose.model('Images', {
    filename: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Images