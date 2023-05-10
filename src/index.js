const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected!'))
    .then(() => app.listen(5000, () => console.log('Server is running on port 5000')))

