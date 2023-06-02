const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    accessKeyId: 'AKIAV52OWJCD3M72D5NV',
    secretAccessKey: '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',
    region: 'us-east-1'
})

const s3 = new AWS.S3();

module.exports = { s3 }