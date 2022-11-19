"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Account extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          unique: {
            msg: '"name" already exists.',
          },
          validate: {
            len: {
              args: [3, 50],
              msg: '"name" field must have between 3 and 255 characters.',
            },
          },
        },
        description: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
        },
        account_type_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          references: {
            model: 'account_type',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        is_active: {
          type: _sequelize2.default.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: 'account',
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction, { foreignKey: 'account_id' });
  }
} exports.default = Account;
