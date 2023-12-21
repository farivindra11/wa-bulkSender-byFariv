import express from 'express';
import multer from 'multer';
import imageController from '../controllers/imageController';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/send-image', upload.single('imageUpload'), imageController.uploadImage);

export default router;
