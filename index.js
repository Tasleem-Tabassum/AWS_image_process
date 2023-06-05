const express = require('express');
require('dotenv').config();
const cors = require('cors')

const router = require('./routes/router')

const app = express();
const port = 8080
// const port = process.env.PORT || 8080
app.use(cors())

app.use(router)

app.listen(port, () => {
    console.log('App started successfully', port)
})