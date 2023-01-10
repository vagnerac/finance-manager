"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Transaction = require('../models/Transaction'); var _Transaction2 = _interopRequireDefault(_Transaction);
var _TransactionCategory = require('../models/TransactionCategory'); var _TransactionCategory2 = _interopRequireDefault(_TransactionCategory);
var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);
// import Account from '../models/Account';

class TransactionController {
  // store
  async store(req, res) {
    try {
      const transactionCategory = await _TransactionCategory2.default.findByPk(
        req.body.transactionCategoryID,
      );

      if (!transactionCategory) {
        return res.status(400).json({
          errors: ['Category not found.'],
        });
      }

      const accountID = await _Account2.default.findByPk(req.body.accountID);

      if (!accountID) {
        return res.status(400).json({
          errors: ['Account not found.'],
        });
      }

      const transaction = {
        value: req.body.value,
        description: req.body.description,
        transaction_date: req.body.transactionDate,
        transaction_category_id: req.body.transactionCategoryID,
        account_id: req.body.accountID,
        is_active: req.body.isActive,
        user_id: req.userID,
      };

      const newTransaction = await _Transaction2.default.create(transaction);

      const outputTransaction = {
        id: newTransaction.id,
        value: newTransaction.value,
        description: newTransaction.description,
        transactionDate: newTransaction.transaction_date,
        transactionCategoryID: newTransaction.transaction_category_id,
        accountID: newTransaction.account_id,
        isActive: newTransaction.is_active,
        userID: newTransaction.user_id,
        updatedAt: newTransaction.updated_at,
        createdAt: newTransaction.created_at,
      };

      return res.json(outputTransaction);
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
          ['transaction_date', 'transactionDate'],
          ['is_active', 'isActive'],
          ['user_id', 'userID'],
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
              ['category_type_id', 'categoryTypeID'],
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
      return res.json('No records found.');
    }
  }

  // show
  async show(req, res) {
    try {
      const transactionDB = await _Transaction2.default.findByPk(req.params.id);

      const transaction = {
        id: transactionDB.id,
        value: transactionDB.value,
        description: transactionDB.value,
        transactionDate: transactionDB.transaction_date,
        transactionCategoryID: transactionDB.transaction_category_id,
        accountID: transactionDB.account_id,
        isActive: transactionDB.is_active,
      };
      return res.json(transaction);
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      if (req.body.transactionCategoryID) {
        const transactionCategory = await _TransactionCategory2.default.findByPk(
          req.body.transactionCategoryID,
        );

        if (!transactionCategory) {
          return res.status(400).json({
            errors: ['Category not found.'],
          });
        }
      }

      if (req.body.accountID) {
        const accountID = await _Account2.default.findByPk(req.body.accountID);

        if (!accountID) {
          return res.status(400).json({
            errors: ['Account not found.'],
          });
        }
      }

      const transactionDB = await _Transaction2.default.findByPk(req.params.id);

      if (!transactionDB) {
        return res.status(400).json({
          errors: ['Transaction  not found.'],
        });
      }

      const transactionData = {
        id: req.body.id,
        value: req.body.value,
        description: req.body.description,
        transaction_date: req.body.transactionDate,
        transaction_category_id: req.body.transactionCategoryID,
        account_id: req.body.accountID,
        is_active: req.body.isActive,
      };

      const updatedTransaction = await transactionDB.update(transactionData);

      const transaction = {
        id: updatedTransaction.id,
        value: updatedTransaction.value,
        description: updatedTransaction.description,
        transactionDate: updatedTransaction.transaction_date,
        transactionCategoryID: updatedTransaction.transaction_category_id,
        accountID: updatedTransaction.account_id,
        isActive: updatedTransaction.is_active,
      };

      return res.json(transaction);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const transactionDB = await _Transaction2.default.findByPk(req.params.id);

      if (!transactionDB) {
        return res.status(400).json({
          errors: ['Transaction not found.'],
        });
      }

      await transactionDB.destroy();

      const transaction = {
        id: transactionDB.id,
        value: transactionDB.value,
        description: transactionDB.value,
        transactionDate: transactionDB.transaction_date,
        transactionCategoryID: transactionDB.transaction_category_id,
        accountID: transactionDB.account_id,
        isActive: transactionDB.is_active,
      };

      return res.json(transaction);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TransactionController();
