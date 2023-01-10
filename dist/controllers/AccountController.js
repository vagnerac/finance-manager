"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);
// import Transaction from '../models/Transaction';
var _AccountType = require('../models/AccountType'); var _AccountType2 = _interopRequireDefault(_AccountType);

class AccountController {
  // store
  async store(req, res) {
    try {
      const accountTypeID = await _AccountType2.default.findByPk(req.body.accountTypeID);

      if (!accountTypeID) {
        return res.status(400).json({
          errors: ['Account Type not found.'],
        });
      }

      const accountDB = await _Account2.default.create({
        name: req.body.name,
        description: req.body.description,
        account_type_id: req.body.accountTypeID,
        is_active: req.body.isActive,
      });

      const account = {
        name: accountDB.name,
        description: accountDB.description,
        accountTypeID: accountDB.account_type_id,
        isActive: accountDB.is_active,
      };

      return res.json(account);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      // const account = await Account.findAll(
      //   {
      //     attributes: ['id', 'name', 'description', 'account_type_id', 'is_active'],
      //     order: [['id', 'ASC'], [Transaction, 'transaction_date', 'DESC']],
      //     include: {
      //       model: Transaction,
      //       attributes: [
      //         'id',
      //         'description',
      //         'value',
      //         'transaction_date',
      //         'transaction_category_id',
      //       ],
      //     },
      //   },
      const account = await _Account2.default.findAll({
        attributes: [
          'id',
          'name',
          'description',
          ['account_type_id', 'accountTypeID'],
          ['is_active', 'isActive'],
        ],
      });
      return res.json(account);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const accountDB = await _Account2.default.findByPk(req.params.id);

      const account = {
        id: accountDB.id,
        name: accountDB.name,
        description: accountDB.description,
        accountTypeID: accountDB.account_type_id,
        isActive: accountDB.is_active,
      };

      return res.json(account);
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      if (req.body.accountTypeID) {
        const accountTypeID = await _AccountType2.default.findByPk(req.body.accountTypeID);

        if (!accountTypeID) {
          return res.status(400).json({
            errors: ['Account Type not found.'],
          });
        }
      }

      console.log(req.account);
      const account = await _Account2.default.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      const accountDB = await account.update({
        name: req.body.name,
        description: req.body.description,
        account_type_id: req.body.accountTypeID,
        is_active: req.body.isActive,
      });

      const updatedAccount = {
        id: accountDB.id,
        name: accountDB.name,
        description: accountDB.description,
        accountTypeID: accountDB.account_type_id,
        isActive: accountDB.is_active,
      };

      return res.json(updatedAccount);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const accountDB = await _Account2.default.findByPk(req.params.id);

      if (!accountDB) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      await accountDB.destroy();

      const account = {
        id: accountDB.id,
        name: accountDB.name,
        description: accountDB.description,
        accountTypeID: accountDB.account_type_id,
        isActive: accountDB.is_active,
      };

      return res.json(account);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AccountController();
