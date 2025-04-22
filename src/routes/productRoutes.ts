import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
} from '../controllers/productsController';

const router = Router();

router.get('/', getAllProducts);

export default router;
