import CategoryType from '../models/CategoryType';

class CategoryTypeController {
  // store
  async store(req, res) {
    try {
      const newCategoryType = await CategoryType.create({
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
      const categoryType = await CategoryType.findAll({
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
      const categoryTypeDB = await CategoryType.findByPk(req.params.id);

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
      const categoryType = await CategoryType.findByPk(req.params.id);

      if (!categoryType) {
        return res.status(400).json({
          errors: ['CategoryTtype not found.'],
        });
      }

      const CategoryTypeDB = await CategoryType.update({
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
      const categoryTypeDB = await CategoryType.findByPk(req.params.id);

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

export default new CategoryTypeController();
