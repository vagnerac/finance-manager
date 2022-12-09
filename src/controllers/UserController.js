import User from '../models/User';

class UserController {
  // store
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const {
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      } = novoUser;

      return res.json({
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message).join(',s'),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'email', 'nome', 'sobrenome', 'data_de_nascimento'] });
      return res.json(users);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const {
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      } = user;
      return res.json({
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      });
    } catch (e) {
      return res.json('null');
    }
  }

  // update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const updatedUser = await user.update(req.body);

      const {
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      } = updatedUser;

      return res.json({
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
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
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const {
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      } = user;

      await user.destroy();

      return res.json({
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
