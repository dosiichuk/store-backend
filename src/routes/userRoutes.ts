import { Router } from 'express';

import {
  getAllUsers,
  getUserById,
  createUser,
} from '../controllers/usersController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, createUser);

export default router;
