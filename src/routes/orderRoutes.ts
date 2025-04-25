import { Router } from 'express';
import { getOrdersByUserId } from '../controllers/ordersController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/:id', verifyToken, getOrdersByUserId);

export default router;
