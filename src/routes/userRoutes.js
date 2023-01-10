import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', userController.store);
// Find all - não necessário
router.get('/', userController.index);
// Update
router.put('/', loginRequired, userController.update);
// Delete
router.delete('/', loginRequired, userController.delete);
// Find one - não necessário por enquanto
router.get('/id/', loginRequired, userController.show);

export default router;
