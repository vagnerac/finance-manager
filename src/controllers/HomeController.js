import User from '../models/User';

class HomeController {
  async index(req, res) {
    const novoUser = await User.create({
      nome: 'Vagner',
      sobrenome: 'Coelho',
      email: 'vagner.amorim@gmail.com',
      telefone: '11992380779',
      data_de_nascimento: '1985-10-24',
    });
    res.json(novoUser);
  }
}

export default new HomeController();
