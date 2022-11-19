"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AccountController = require('../controllers/AccountController'); var _AccountController2 = _interopRequireDefault(_AccountController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// Create
router.post('/', _loginRequired2.default, _AccountController2.default.store);
// Find all
router.get('/', _loginRequired2.default, _AccountController2.default.index);
// Update
router.put('/:id', _loginRequired2.default, _AccountController2.default.update);
// Delete
router.delete('/:id', _loginRequired2.default, _AccountController2.default.delete);
// Find one
router.get('/:id', _loginRequired2.default, _AccountController2.default.show);

exports. default = router;
