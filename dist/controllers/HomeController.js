"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class HomeController {
  async index(req, res) {
    const novoUser = await _User2.default.create({
      nome: 'Vagner',
      sobrenome: 'Coelho',
      email: 'vagner.amorim@gmail.com',
      telefone: '11992380779',
      data_de_nascimento: '1985-10-24',
    });
    res.json(novoUser);
  }
}

exports. default = new HomeController();
