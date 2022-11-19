import Sequelize, { Model } from 'sequelize';

export default class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: '"name" field must have between 3 and 255 characters.',
            },
          },
        },
        value: {
          type: Sequelize.FLOAT(undefined, 2),
          defaultValue: 0.00,
        },
        transaction_date: {
          type: Sequelize.DATE,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Invalid value in the "transaction_date" field.',
            },
          },
        },
        transaction_category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'transaction_category',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        account_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'account',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        user_id:
        {
          type: Sequelize.INTEGER,
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
}
