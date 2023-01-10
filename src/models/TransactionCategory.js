import Sequelize, { Model } from 'sequelize';

export default class TransactionCategory extends Model {
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
        category_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'transaction_type',
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
        tableName: 'transaction_category',
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CategoryType, { foreignKey: 'category_type_id' });
  }

  // static associate(models) {
  //  this.hasOne(models.TransactionType, { foreignKey: 'type_id' });
  // }
}
