// import Home from '../models/Home';

class HomeController {
  async index(req, res) {
    res.json('Start');
  }
}

export default new HomeController();
