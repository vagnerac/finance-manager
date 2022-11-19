"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Transaction extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: '"name" field must have between 3 and 255 characters.',
            },
          },
        },
        value: {
          type: _sequelize2.default.FLOAT(undefined, 2),
          defaultValue: 0.00,
        },
        transaction_date: {
          type: _sequelize2.default.DATE,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Invalid value in the "transaction_date" field.',
            },
          },
        },
        transaction_category_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          references: {
            model: 'transaction_category',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        account_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          references: {
            model: 'account',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        is_active: {
          type: _sequelize2.default.BOOLEAN,
          defaultValue: false,
        },
        user_id:
        {
          type: _sequelize2.default.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: 'transaction',
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id' });
    this.belongsTo(models.TransactionCategory, { foreignKey: 'transaction_category_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
} exports.default = Transaction;
