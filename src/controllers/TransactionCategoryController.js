import TransactionCategory from '../models/TransactionCategory';

class TransactionCategoryController {
  // store
  async store(req, res) {
    try {
      const newTransactionCategory = await TransactionCategory.create(req.body);

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
      const transactionCategory = await TransactionCategory.findAll({ attributes: ['id', 'name', 'description', 'category_type_id', 'is_active'] });
      return res.json(transactionCategory);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const transactionCategory = await TransactionCategory.findByPk(req.params.id);
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
      const transactionCategory = await TransactionCategory.findByPk(req.params.id);

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
      const transactionCategory = await TransactionCategory.findByPk(req.params.id);

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

export default new TransactionCategoryController();
