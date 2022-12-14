import { Router } from 'express';
import homeController from '../controllers/HomeController';

// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Create
// router.post('/', homeController.store);
// Find all - não necessário
router.get('/', homeController.index);
// Update
// router.put('/', loginRequired, homeController.update);
// Delete
// router.delete('/', loginRequired, homeController.delete);
// Find one - não necessário por enquanto
// router.get('/', loginRequired, userController.show);

export default router;
