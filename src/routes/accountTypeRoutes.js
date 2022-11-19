import { Router } from 'express';
import accountTypeController from '../controllers/AccountTypeController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', loginRequired, accountTypeController.store);
// Find all
router.get('/', loginRequired, accountTypeController.index);
// Update
router.put('/:id', loginRequired, accountTypeController.update);
// Delete
router.delete('/:id', loginRequired, accountTypeController.delete);
// Find one
router.get('/:id', loginRequired, accountTypeController.show);

export default router;
