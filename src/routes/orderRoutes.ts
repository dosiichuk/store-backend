import { Router } from 'express';
import {
  getAllOrders,
  getOrdersByUserId,
} from '../controllers/ordersController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/', verifyToken, getAllOrders);
router.get('/:id', verifyToken, getOrdersByUserId);

export default router;
