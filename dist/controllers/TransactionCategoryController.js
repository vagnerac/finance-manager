"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _TransactionCategory = require('../models/TransactionCategory'); var _TransactionCategory2 = _interopRequireDefault(_TransactionCategory);

class TransactionCategoryController {
  // store
  async store(req, res) {
    try {
      const newTransactionCategory = await _TransactionCategory2.default.create(req.body);

      const {
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      } = newTransactionCategory;

      return res.json({
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
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
      const transactionCategory = await _TransactionCategory2.default.findAll({ attributes: ['id', 'name', 'description', 'category_type_id', 'is_active'] });
      return res.json(transactionCategory);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const transactionCategory = await _TransactionCategory2.default.findByPk(req.params.id);
      const {
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      } = transactionCategory;
      return res.json({
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const transactionCategory = await _TransactionCategory2.default.findByPk(req.params.id);

      if (!transactionCategory) {
        return res.status(400).json({
          errors: ['Transaction Category not found.'],
        });
      }

      const updatedTransactionCategory = await transactionCategory.update(req.body);

      const {
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      } = updatedTransactionCategory;

      return res.json({
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
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
      const transactionCategory = await _TransactionCategory2.default.findByPk(req.params.id);

      if (!transactionCategory) {
        return res.status(400).json({
          errors: ['Transaction Category not found.'],
        });
      }

      const {
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      } = transactionCategory;

      await transactionCategory.destroy();

      return res.json({
        id, name, description, category_type_id: categoryTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TransactionCategoryController();
