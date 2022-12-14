"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import Home from '../models/Home';

class HomeController {
  async index(req, res) {
    res.json('Start');
  }
}

exports. default = new HomeController();
