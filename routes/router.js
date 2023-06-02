const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage();
const { s3 } = require('../aws/awsconfig')
require('dotenv').config()
const Images = require('../models/Images.js')
const mongoose = require('../db/mongoose')

const router = express.Router()

router.use(express.json())

const uploadImageToS3 = async (params) => {
    const s3Upload = await s3.upload(params).promise()
}

const fetchImageFromS3 = async (params) => {

    const s3Objs = []

    
    const s3Data = await s3.listObjectsV2(params).promise()

    s3Data.Contents.map((obj) => {

        s3Objs.push(`https://${params.Bucket}.s3.amazonaws.com/${obj.Key}`);

      });

    return s3Objs
}

const upload = multer({ 
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error('Please upload a JPG or PNG file!'))
        }

        cb(undefined, true)
    }
 })

router.get('', (req, res) => {
    res.send('Not here... check this route for images --> /images/all')
})

router.get('/images/all', async (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: 'images/'
    };

    try{
        const imagesList = await fetchImageFromS3(params)
        res.send(imagesList)
    } catch(e) {
        res.send("Error: "+ e)
    }
})

router.post('/images/upload', upload.single('imageFile'), async (req, res) => {
    const file = req.file

    if (!file) {
        res.status(400).send('No image file found');  
        return; 
      }
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${file.originalname}`,
        Body: file.buffer
    };

    const image = new Images({
        filename: file.originalname,
        file: `https://${params.Bucket}.s3.amazonaws.com/${file.originalname}`,
        category: 'employees'
    })

    try{
        const UploadedImages = await uploadImageToS3(params)

        await image.save()

        res.status(200).send('Image uploaded successfully!')
    } catch(e) {
        res.send("Error: "+ e)
    }
    
})

router.get('*', (req, res) => {
    res.send("Sorry... Page Not found")
})

module.exports = router