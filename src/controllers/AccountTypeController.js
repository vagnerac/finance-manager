import AccountType from '../models/AccountType';

class AccountTypeController {
  // store
  async store(req, res) {
    try {
      const newAccountType = await AccountType.create({
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
      const accountType = await AccountType.findAll({
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
      const accountTypeDB = await AccountType.findByPk(req.params.id);

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
      const accountType = await AccountType.findByPk(req.params.id);

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
      const accountTypeDB = await AccountType.findByPk(req.params.id);

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

export default new AccountTypeController();
