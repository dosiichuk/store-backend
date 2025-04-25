import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getProductById,
} from '../controllers/productsController';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
