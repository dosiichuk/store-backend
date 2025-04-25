import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getProductById,
  getTopFiveProducts,
  getProductsByCategory,
} from '../controllers/productsController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.get('/top-five', getTopFiveProducts);
router.post('/', verifyToken, createProduct);

export default router;
