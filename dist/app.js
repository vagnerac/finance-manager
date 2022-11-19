"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/first */
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _accountTypeRoutes = require('./routes/accountTypeRoutes'); var _accountTypeRoutes2 = _interopRequireDefault(_accountTypeRoutes);
var _accountRoutes = require('./routes/accountRoutes'); var _accountRoutes2 = _interopRequireDefault(_accountRoutes);
var _transactionCategoryRoutes = require('./routes/transactionCategoryRoutes'); var _transactionCategoryRoutes2 = _interopRequireDefault(_transactionCategoryRoutes);
var _transactionRoutes = require('./routes/transactionRoutes'); var _transactionRoutes2 = _interopRequireDefault(_transactionRoutes);
var _categoryTypeRoutes = require('./routes/categoryTypeRoutes'); var _categoryTypeRoutes2 = _interopRequireDefault(_categoryTypeRoutes);

require('./database');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/user/', _userRoutes2.default);
    this.app.use('/token/', _tokenRoutes2.default);
    this.app.use('/accountType/', _accountTypeRoutes2.default);
    this.app.use('/account/', _accountRoutes2.default);
    this.app.use('/transactionCategory/', _transactionCategoryRoutes2.default);
    this.app.use('/categoryType/', _categoryTypeRoutes2.default);
    this.app.use('/transaction/', _transactionRoutes2.default);
  }
}

exports. default = new App().app;
