"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _CategoryType = require('../models/CategoryType'); var _CategoryType2 = _interopRequireDefault(_CategoryType);

class CategoryTypeController {
  // store
  async store(req, res) {
    try {
      console.log(req.body);
      const newCategoryType = await _CategoryType2.default.create(req.body);
      console.log(newCategoryType);

      const {
        id, name, description, is_active: isActive,
      } = newCategoryType;

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
      const categoryType = await _CategoryType2.default.findAll({ attributes: ['id', 'name', 'description', 'is_active'] });
      return res.json(categoryType);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const categoryType = await _CategoryType2.default.findByPk(req.params.id);
      const {
        id, name, description, is_active: isActive,
      } = categoryType;
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
      const categoryType = await _CategoryType2.default.findByPk(req.params.id);

      if (!categoryType) {
        return res.status(400).json({
          errors: ['CategoryTtype not found.'],
        });
      }

      const updatedCategoryType = await _CategoryType2.default.update(req.body);

      const {
        id, name, description, is_active: isActive,
      } = updatedCategoryType;

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
      const categoryType = await _CategoryType2.default.findByPk(req.params.id);

      if (!categoryType) {
        return res.status(400).json({
          errors: ['CategoryTtype not found.'],
        });
      }

      const {
        id, name, description, is_active: isActive,
      } = categoryType;

      await _CategoryType2.default.destroy();

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

exports. default = new CategoryTypeController();
