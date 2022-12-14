"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

// import loginRequired from '../middlewares/loginRequired';

const router = new (0, _express.Router)();

// Create
// router.post('/', homeController.store);
// Find all - não necessário
router.get('/', _HomeController2.default.index);
// Update
// router.put('/', loginRequired, homeController.update);
// Delete
// router.delete('/', loginRequired, homeController.delete);
// Find one - não necessário por enquanto
// router.get('/', loginRequired, userController.show);

exports. default = router;
