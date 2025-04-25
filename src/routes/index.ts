import { Application } from 'express';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import orderRoutes from './orderRoutes';
import authRoutes from './authRoutes';

const setupRoutes = (app: Application) => {
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/auth', authRoutes);
};

export default setupRoutes;
