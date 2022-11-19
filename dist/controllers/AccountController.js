"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Account = require('../models/Account'); var _Account2 = _interopRequireDefault(_Account);
var _Transaction = require('../models/Transaction'); var _Transaction2 = _interopRequireDefault(_Transaction);

class AccountController {
  // store
  async store(req, res) {
    try {
      const newAccount = await _Account2.default.create(req.body);

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = newAccount;

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const account = await _Account2.default.findAll(
        {
          attributes: ['id', 'name', 'description', 'account_type_id', 'is_active'],
          order: [['id', 'ASC'], [_Transaction2.default, 'transaction_date', 'DESC']],
          include: {
            model: _Transaction2.default,
            attributes: [
              'id',
              'description',
              'value',
              'transaction_date',
              'transaction_category_id',
            ],
          },
        },
      );
      return res.json(account);
    } catch (e) {
      console.log(e);
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const account = await _Account2.default.findByPk(req.params.id);
      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = account;
      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const account = await _Account2.default.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      const updatedAccount = await account.update(req.body);

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = updatedAccount;

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
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
      const account = await _Account2.default.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = account;

      await account.destroy();

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AccountController();
