"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  // store
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);

      const {
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
      } = novoUser;

      return res.json({
        id, nome, sobrenome, email, data_de_nascimento: dataDeNascimento,
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
      const users = await _User2.default.findAll({ attributes: ['id', 'email', 'nome', 'sobrenome', 'data_de_nascimento'] });
      return res.json(users);
    } catch (e) {
      return res.json('null');
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
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
      const user = await _User2.default.findByPk(req.userId);

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
      const user = await _User2.default.findByPk(req.userId);

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

exports. default = new UserController();
