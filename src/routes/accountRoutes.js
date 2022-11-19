import { Router } from 'express';
import accountController from '../controllers/AccountController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', loginRequired, accountController.store);
// Find all
router.get('/', loginRequired, accountController.index);
// Update
router.put('/:id', loginRequired, accountController.update);
// Delete
router.delete('/:id', loginRequired, accountController.delete);
// Find one
router.get('/:id', loginRequired, accountController.show);

export default router;
