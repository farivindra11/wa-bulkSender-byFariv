import express from 'express';
import path from 'path';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import multer from 'multer';

import homeRoute from './routes/homeRoute.js'; 


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine and views directory
const currentFileURL = import.meta.url;
const currentDirPath = path.dirname(new URL(currentFileURL).pathname);
const viewsPath = path.join(currentDirPath, 'views');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Middleware to serve static files
app.use(express.static(path.join(currentDirPath, 'public')));

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(currentDirPath, 'uploads')); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Contoh: batas ukuran 5 MB
    },
});

// Routes
app.use('/', homeRoute(upload)); // Pass the multer middleware to the route 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
