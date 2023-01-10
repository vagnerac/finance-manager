import Sequelize, { Model } from 'sequelize';

export default class AccountType extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: '"name" already exists.',
        },
        validate: {
          len: {
            args: [3, 50],
            msg: '"name" field must have between 3 and 50 characters.',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'account_type',
      sequelize,
    });

    return this;
  }
}
