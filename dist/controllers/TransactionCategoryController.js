"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _TransactionCategory = require('../models/TransactionCategory'); var _TransactionCategory2 = _interopRequireDefault(_TransactionCategory);
var _CategoryType = require('../models/CategoryType'); var _CategoryType2 = _interopRequireDefault(_CategoryType);

class TransactionCategoryController {
  // store
  async store(req, res) {
    try {
      const categoryTypeID = await _CategoryType2.default.findByPk(req.body.categoryTypeID);

      if (!categoryTypeID) {
        return res.status(400).json({
          errors: ['Category Type not found.'],
        });
      }

      const transactionCategoryDB = await _TransactionCategory2.default.create({
        name: req.body.name,
        description: req.body.description,
        category_type_id: req.body.categoryTypeID,
        is_active: req.body.isActive,
      });
      console.log(transactionCategoryDB);

      const transactionCategory = {
        id: transactionCategoryDB.id,
        name: transactionCategoryDB.name,
        description: transactionCategoryDB.description,
        categoryTypeID: transactionCategoryDB.category_type_id,
        isActive: transactionCategoryDB.is_active,
      };

      return res.json(transactionCategory);
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
      const transactionCategory = await _TransactionCategory2.default.findAll({
        attributes: [
          'id',
          'name',
          'description',
          ['category_type_id', 'categoryTypeID'],
          ['is_active', 'isActive'],
        ],
      });
      return res.json(transactionCategory);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const transactionCategoryDB = await _TransactionCategory2.default.findByPk(
        req.params.id,
      );

      const transactionCategory = {
        id: transactionCategoryDB.id,
        name: transactionCategoryDB.name,
        description: transactionCategoryDB.description,
        categoryTypeID: transactionCategoryDB.category_type_id,
        isActive: transactionCategoryDB.is_active,
      };
      return res.json(transactionCategory);
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      if (req.body.categoryTypeID) {
        const categoryTypeID = await _CategoryType2.default.findByPk(req.body.categoryTypeID);

        if (!categoryTypeID) {
          return res.status(400).json({
            errors: ['Category Type not found.'],
          });
        }
      }

      const transactionCategory = await _TransactionCategory2.default.findByPk(req.params.id);

      if (!transactionCategory) {
        return res.status(400).json({
          errors: ['Transaction Category not found.'],
        });
      }

      const transactionCategoryDB = await transactionCategory.update({
        name: req.body.name,
        description: req.body.description,
        category_type_id: req.body.categoryTypeID,
        is_active: req.body.isActive,
      });

      const updatedTransactionCategory = {
        id: transactionCategoryDB.id,
        name: transactionCategoryDB.name,
        description: transactionCategoryDB.description,
        categoryTypeID: transactionCategoryDB.category_type_id,
        isActive: transactionCategoryDB.is_active,
      };
      return res.json(updatedTransactionCategory);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const transactionCategoryDB = await _TransactionCategory2.default.findByPk(req.params.id);

      if (!transactionCategoryDB) {
        return res.status(400).json({
          errors: ['Transaction Category not found.'],
        });
      }

      await transactionCategoryDB.destroy();

      const transactionCategory = {
        id: transactionCategoryDB.id,
        name: transactionCategoryDB.name,
        description: transactionCategoryDB.description,
        categoryTypeID: transactionCategoryDB.category_type_id,
        isActive: transactionCategoryDB.is_active,
      };

      return res.json(transactionCategory);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new TransactionCategoryController();
