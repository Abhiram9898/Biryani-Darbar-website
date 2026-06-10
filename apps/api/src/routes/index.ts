import { Router } from 'express';
import { contentRoutes } from './content.routes.js';
import { productRoutes } from './product.routes.js';

export const routes = Router();
routes.use('/products', productRoutes);
routes.use('/content', contentRoutes);
