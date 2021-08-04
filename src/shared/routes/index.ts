import { Router } from 'express';
import productsRoutes from '../../modules/products/routes/products.routes';
import imagesRoutes from '../../modules/images/routes/image.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/images', imagesRoutes);

export default routes;
