"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _CategoryType = require('../models/CategoryType'); var _CategoryType2 = _interopRequireDefault(_CategoryType);

class CategoryTypeController {
  // store
  async store(req, res) {
    try {
      const newCategoryType = await _CategoryType2.default.create({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.isActive,
      });

      const categoryType = {
        name: newCategoryType.name,
        description: newCategoryType.description,
        isActive: newCategoryType.is_active,
      };

      return res.json(categoryType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const categoryType = await _CategoryType2.default.findAll({
        attributes: [
          'id',
          'name',
          'description',
          ['is_active', 'isActive'],
        ],
      });

      return res.json(categoryType);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const categoryTypeDB = await _CategoryType2.default.findByPk(req.params.id);

      const categoryType = {
        id: categoryTypeDB.id,
        name: categoryTypeDB.name,
        description: categoryTypeDB.description,
        isActive: categoryTypeDB.is_active,
      };
      return res.json(categoryType);
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const categoryType = await _CategoryType2.default.findByPk(req.params.id);

      if (!categoryType) {
        return res.status(400).json({
          errors: ['CategoryTtype not found.'],
        });
      }

      const CategoryTypeDB = await _CategoryType2.default.update({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.isActive,
      });

      const updatedCategoryType = {
        id: CategoryTypeDB.id,
        name: CategoryTypeDB.name,
        description: CategoryTypeDB.description,
        isActive: CategoryTypeDB.is_active,
      };
      return res.json(updatedCategoryType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const categoryTypeDB = await _CategoryType2.default.findByPk(req.params.id);

      if (!categoryTypeDB) {
        return res.status(400).json({
          errors: ['CategoryTtype not found.'],
        });
      }

      await categoryTypeDB.destroy();

      const categoryType = {
        id: categoryTypeDB.id,
        name: categoryTypeDB.name,
        description: categoryTypeDB.description,
        isActive: categoryTypeDB.is_active,
      };
      return res.json(categoryType);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new CategoryTypeController();
