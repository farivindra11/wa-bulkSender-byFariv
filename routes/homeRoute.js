 import express from 'express';
import { getForm, getHome, sendMessage, uploadImage } from '../controllers/homeController.js'; 

const router = express.Router();

const homeRoute = (upload) => { 
    router.get('/', getHome);
    router.get('/form', getForm);

    // Gunakan middleware upload pada route POST /send
    router.post('/send', upload.single('imageUpload'), sendMessage);
    router.post('/send-image', upload.single('imageUpload'), uploadImage);

    return router;
};

export default homeRoute;
