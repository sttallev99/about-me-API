const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();

app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected!'))
    .then(() => app.listen(5000, () => console.log('Server is running on port 5000')))

