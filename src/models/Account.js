import Sequelize, { Model } from 'sequelize';

export default class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          defaultValue: '',
        },
        account_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'account_type',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        is_active: {
          type: Sequelize.BOOLEAN,
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
    this.belongsTo(models.AccountType, { foreignKey: 'account_type_id' });
  }
}
