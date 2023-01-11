import User from '../models/User';

class UserController {
  // store
  async store(req, res) {
    try {
      console.log(req.body);
      const userInput = {
        nome: req.body.name,
        sobrenome: req.body.lastName,
        password: req.body.password,
        telefone: req.body.phone,
        data_de_nascimento: req.body.birthDate,
        email: req.body.email,
      };

      const newUser = await User.create(userInput);

      const userRest = {
        id: newUser.dataValues.id,
        email: newUser.dataValues.email,
        name: newUser.dataValues.nome,
        lastName: newUser.dataValues.sobrenome,
        birthDate: newUser.dataValues.data_de_nascimento,
        phone: newUser.dataValues.telefone,
      };

      return res.json(userRest);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          'id',
          'email',
          ['nome', 'name'],
          ['sobrenome', 'lastName'],
          ['data_de_nascimento', 'birthDate'],
          ['telefone', 'phone'],
        ],
      });

      return res.json(users);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const userRest = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.nome,
        lastName: user.dataValues.sobrenome,
        birthDate: user.dataValues.data_de_nascimento,
        phone: user.dataValues.telefone,
      };

      return res.json(userRest);
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

      const updatedUserRest = {
        id: updatedUser.dataValues.id,
        email: updatedUser.dataValues.email,
        name: updatedUser.dataValues.name,
        lastName: updatedUser.dataValues.lastName,
        birthDate: updatedUser.dataValues.birthDate,
        phone: updatedUser.dataValues.phone,
      };

      return res.json(updatedUserRest);
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

      const userRest = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.nome,
        lastName: user.dataValues.sobrenome,
        birthDate: user.dataValues.data_de_nascimento,
        phone: user.dataValues.telefone,
      };

      await user.destroy();

      return res.json(userRest);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
