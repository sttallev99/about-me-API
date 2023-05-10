const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true})
    .then(() => console.log('DB Connected!'))
    .then(() => app.listen(5000, () => console.log('Server is running on port 5000')))

