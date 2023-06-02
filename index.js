const express = require('express');
require('dotenv').config();
const cors = require('cors')

const router = require('./routes/router')

const app = express();
const port = process.env.PORT

app.use(router)
app.use(cors())

app.listen(port, () => {
    console.log('App started successfully')
})