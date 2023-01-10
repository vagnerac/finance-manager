"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AccountType = require('../models/AccountType'); var _AccountType2 = _interopRequireDefault(_AccountType);

class AccountTypeController {
  // store
  async store(req, res) {
    try {
      const newAccountType = await _AccountType2.default.create({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.isActive,
      });

      const accountType = {
        name: newAccountType.name,
        description: newAccountType.description,
        isActive: newAccountType.is_active,
      };

      return res.json(accountType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const accountType = await _AccountType2.default.findAll({
        attributes: [
          'id',
          'name',
          'description',
          ['is_active', 'isActive'],
        ],
      });
      return res.json(accountType);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const accountTypeDB = await _AccountType2.default.findByPk(req.params.id);

      const accountType = {
        id: accountTypeDB.id,
        name: accountTypeDB.name,
        description: accountTypeDB.description,
        isActive: accountTypeDB.is_active,
      };

      return res.json(accountType);
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

      const accountTypeDB = await accountType.update({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.isActive,
      });

      const updatedAccountType = {
        id: accountTypeDB.id,
        name: accountTypeDB.name,
        description: accountTypeDB.description,
        isActive: accountTypeDB.is_active,
      };

      return res.json(updatedAccountType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const accountTypeDB = await _AccountType2.default.findByPk(req.params.id);

      if (!accountTypeDB) {
        return res.status(400).json({
          errors: ['accountType not found.'],
        });
      }

      await accountTypeDB.destroy();

      const accountType = {
        id: accountTypeDB.id,
        name: accountTypeDB.name,
        description: accountTypeDB.description,
        isActive: accountTypeDB.is_active,
      };

      return res.json(accountType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AccountTypeController();
