import { Router } from 'express';
import transactionController from '../controllers/TransactionController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', loginRequired, transactionController.store);
// Find all
router.get('/', loginRequired, transactionController.index);
// Update
router.put('/:id', loginRequired, transactionController.update);
// Delete
router.delete('/:id', loginRequired, transactionController.delete);
// Find one
router.get('/:id', loginRequired, transactionController.show);

export default router;
