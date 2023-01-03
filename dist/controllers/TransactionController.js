"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Transaction = require('../models/Transaction'); var _Transaction2 = _interopRequireDefault(_Transaction);
var _TransactionCategory = require('../models/TransactionCategory'); var _TransactionCategory2 = _interopRequireDefault(_TransactionCategory);
var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);
// import Account from '../models/Account';

class TransactionController {
  // store
  async store(req, res) {
    try {
      const newTransaction = await _Transaction2.default.create({
        value: req.body.value,
        description: req.body.description,
        transaction_date: req.body.transaction_date,
        transaction_category_id: req.body.transaction_category_id,
        account_id: req.body.account_id,
        is_active: req.body.is_active,
        user_id: req.userId,
      });

      const {
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
        user_id: userID,
      } = newTransaction;

      return res.json({
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
        user_id: userID,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const transaction = await _Transaction2.default.findAll({
        attributes: [
          'id',
          'value',
          'description',
          'transaction_date',
          'is_active',
          'user_id',
        ],
        order: [['transaction_date', 'DESC']],
        include:
        [
          {
            model: _TransactionCategory2.default,
            attributes: [
              'id',
              'name',
              'description',
              'category_type_id',
            ],
          },
          {
            model: _Account2.default,
            attributes: [
              'id',
              'name',
              'description',
            ],
          },
        ],
      });
      return res.json(transaction);
    } catch (e) {
      console.log(e);
      return res.json('no one record found.');
    }
  }

  // show
  async show(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);
      const {
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      } = transaction;
      return res.json({
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);

      if (!transaction) {
        return res.status(400).json({
          errors: ['Transaction  not found.'],
        });
      }

      const updatedTransaction = await transaction.update(req.body);

      const {
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      } = updatedTransaction;

      return res.json({
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);

      if (!transaction) {
        return res.status(400).json({
          errors: ['Transaction  not found.'],
        });
      }

      const {
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      } = transaction;

      await transaction.destroy();

      return res.json({
        id,
        value,
        description,
        transaction_date: transactionDate,
        transaction_category_id: transactionCategoryID,
        account_id: accountID,
        is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TransactionController();
