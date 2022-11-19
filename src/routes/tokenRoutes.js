import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

// Create
router.post('/', tokenController.store);

export default router;
