"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AccountType = require('../models/AccountType'); var _AccountType2 = _interopRequireDefault(_AccountType);

class AccountTypeController {
  // store
  async store(req, res) {
    try {
      const newAccountType = await _AccountType2.default.create(req.body);

      const {
        id, name, description, is_active: isActive,
      } = newAccountType;

      return res.json({
        id, name, description, is_active: isActive,
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
      const accountType = await _AccountType2.default.findAll({ attributes: ['id', 'name', 'description', 'is_active'] });
      return res.json(accountType);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const accountType = await _AccountType2.default.findByPk(req.params.id);
      const {
        id, name, description, is_active: isActive,
      } = accountType;
      return res.json({
        id, name, description, is_active: isActive,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      console.log(req.accountType);
      const accountType = await _AccountType2.default.findByPk(req.params.id);

      if (!accountType) {
        return res.status(400).json({
          errors: ['accountType not found.'],
        });
      }

      const updatedAccountType = await accountType.update(req.body);

      const {
        id, name, description, is_active: isActive,
      } = updatedAccountType;

      return res.json({
        id, name, description, is_active: isActive,
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
      const accountType = await _AccountType2.default.findByPk(req.accountTypeId);

      if (!accountType) {
        return res.status(400).json({
          errors: ['accountType not found.'],
        });
      }

      const {
        id, name, description, is_active: isActive,
      } = accountType;

      await accountType.destroy();

      return res.json({
        id, name, description, is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AccountTypeController();
