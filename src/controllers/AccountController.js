import Account from '../models/Account';
import Transaction from '../models/Transaction';

class AccountController {
  // store
  async store(req, res) {
    try {
      const newAccount = await Account.create(req.body);

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = newAccount;

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
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
      const account = await Account.findAll(
        {
          attributes: ['id', 'name', 'description', 'account_type_id', 'is_active'],
          order: [['id', 'ASC'], [Transaction, 'transaction_date', 'DESC']],
          include: {
            model: Transaction,
            attributes: [
              'id',
              'description',
              'value',
              'transaction_date',
              'transaction_category_id',
            ],
          },
        },
      );
      return res.json(account);
    } catch (e) {
      console.log(e);
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);
      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = account;
      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      const updatedAccount = await account.update(req.body);

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = updatedAccount;

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
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
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['account not found.'],
        });
      }

      const {
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      } = account;

      await account.destroy();

      return res.json({
        id, name, description, account_type_id: accountTypeID, is_active: isActive,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AccountController();
