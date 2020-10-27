import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from '../src/app/controllers/UserController';
import Authenticate from '../src/app/controllers/AuthController';

const router = Router();

router.post('/users', UserController.store);
router.post('/auth', Authenticate.authenticate);
router.get('/users', authMiddleware, UserController.index);

export default router;