const express = require('express');
require('dotenv').config();
const router = require('./routes/router')

const app = express();
const port = process.env.PORT

app.use(router)

app.listen(port, () => {
    console.log('App started successfully')
})