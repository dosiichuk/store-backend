import { Application } from 'express';
import productRoutes from './productRoutes';

const setupRoutes = (app: Application) => {
  app.use('/products', productRoutes);
};

export default setupRoutes;
