"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);
var _AccountType = require('../models/AccountType'); var _AccountType2 = _interopRequireDefault(_AccountType);
var _CategoryType = require('../models/CategoryType'); var _CategoryType2 = _interopRequireDefault(_CategoryType);
var _TransactionCategory = require('../models/TransactionCategory'); var _TransactionCategory2 = _interopRequireDefault(_TransactionCategory);
var _Transaction = require('../models/Transaction'); var _Transaction2 = _interopRequireDefault(_Transaction);

const models = [_User2.default, _Account2.default, _AccountType2.default, _CategoryType2.default, _TransactionCategory2.default, _Transaction2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
