const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage();
const { s3 } = require('../aws/awsconfig')
require('dotenv').config()

const router = express.Router()

const uploadImageToS3 = async (params) => {
    const s3Upload = await s3.upload(params).promise()
}

const fetchImageFromS3 = async (params) => {

    const s3Objs = []

    
    const s3Data = await s3.listObjectsV2(params).promise()
    console.log(s3Data)

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
        Bucket: 'tasleem-s3-bucket',
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
        Bucket: 'tasleem-s3-bucket',
        Key: `images/${file.originalname}`,
        Body: file.buffer
    };

    try{
        const UploadedImages = await uploadImageToS3(params)
        res.status(200).send('Image uploaded successfully!')
    } catch(e) {
        res.send("Error: "+ e)
    }
    
})

router.get('*', (req, res) => {
    res.send("Sorry... Page Not found")
})

module.exports = router