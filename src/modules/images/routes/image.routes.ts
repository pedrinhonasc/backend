import { Router } from 'express';
import multer from 'multer';
import ImagesController from '../controllers/ImagesController';
import uploadConfig from '../../../config/upload';

const upload = multer(uploadConfig);

const imagesRoutes = Router();
const imagesController = new ImagesController();

imagesRoutes.post('/', imagesController.create);

imagesRoutes.patch(
  '/product-image',
  upload.single('file'),
  async (request, response) => {
    return response.json({ message: 'ok' });
  },
);

export default imagesRoutes;
