const mongoose = require('mongoose')

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
    }
})

module.exports = Images