import TransactionCategory from '../models/TransactionCategory';
import CategoryType from '../models/CategoryType';

class TransactionCategoryController {
  // store
  async store(req, res) {
    try {
      const categoryTypeID = await CategoryType.findByPk(req.body.categoryTypeID);

      if (!categoryTypeID) {
        return res.status(400).json({
          errors: ['Category Type not found.'],
        });
      }

      const transactionCategoryDB = await TransactionCategory.create({
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
      const transactionCategory = await TransactionCategory.findAll({
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
      const transactionCategoryDB = await TransactionCategory.findByPk(
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
        const categoryTypeID = await CategoryType.findByPk(req.body.categoryTypeID);

        if (!categoryTypeID) {
          return res.status(400).json({
            errors: ['Category Type not found.'],
          });
        }
      }

      const transactionCategory = await TransactionCategory.findByPk(req.params.id);

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
      const transactionCategoryDB = await TransactionCategory.findByPk(req.params.id);

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

export default new TransactionCategoryController();
