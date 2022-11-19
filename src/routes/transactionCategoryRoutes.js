import { Router } from 'express';
import transactionCategoryController from '../controllers/TransactionCategoryController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', loginRequired, transactionCategoryController.store);
// Find all
router.get('/', loginRequired, transactionCategoryController.index);
// Update
router.put('/:id', loginRequired, transactionCategoryController.update);
// Delete
router.delete('/:id', loginRequired, transactionCategoryController.delete);
// Find one
router.get('/:id', loginRequired, transactionCategoryController.show);

export default router;
