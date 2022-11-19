import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: '"nome" field must have between 3 and 255 characters.',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: '"sobrenome" field must have between 3 and 255 characters.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists.',
        },
        validate: {
          isEmail: {
            msg: 'Invalid email.',
          },
        },
      },
      telefone: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 11],
            msg: 'Invalid value in the "telefone" field.',
          },
        },
      },
      data_de_nascimento: {
        type: Sequelize.DATEONLY,
        defaultValue: '',
        validate: {
          isDate: {
            msg: 'Invalid value in the "data de nascimento" field.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'Password must have from 8 to 50 characters.',
          },
        },
      },
    }, {
      tableName: 'users',
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwodIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
