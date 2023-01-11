"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

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

      const newUser = await _User2.default.create(userInput);

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
      const users = await _User2.default.findAll({
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
      const user = await _User2.default.findByPk(req.userId);

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
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found.'],
        });
      }

      const userData = {
        id: req.body.id,
        email: req.body.email,
        nome: req.body.name,
        sobrenome: req.body.lastName,
        data_de_nascimento: req.body.birthDate,
        telefone: req.body.phone,
      };

      const updatedUser = await user.update(userData);

      const updatedUserRest = {
        id: updatedUser.dataValues.id,
        email: updatedUser.dataValues.email,
        name: updatedUser.dataValues.nome,
        lastName: updatedUser.dataValues.sobrenome,
        birthDate: updatedUser.dataValues.data_de_nascimento,
        phone: updatedUser.dataValues.telefone,
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
      const user = await _User2.default.findByPk(req.userId);

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

exports. default = new UserController();
