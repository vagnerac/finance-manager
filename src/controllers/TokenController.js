import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Invalid credentials.'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['User not identified.'],
        });
      }

      if (!(await user.passwodIsValid(password))) {
        return res.status(401).json({
          errors: ['Invalid password.'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.json({ token, user: { nome: user.nome, id, email } });
    } catch (e) {
      console.log(e);
      return res.json();
    }
  }
}

export default new TokenController();
