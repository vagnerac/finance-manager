import { Router } from 'express';
import categoryTypeController from '../controllers/CategoryTypeController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
router.post('/', loginRequired, categoryTypeController.store);
// Find all
router.get('/', loginRequired, categoryTypeController.index);
// Update
router.put('/:id', loginRequired, categoryTypeController.update);
// Delete
router.delete('/:id', loginRequired, categoryTypeController.delete);
// Find one
router.get('/:id', loginRequired, categoryTypeController.show);

export default router;
