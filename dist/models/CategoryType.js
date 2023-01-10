"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class CategoryType extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      is_active: {
        type: _sequelize2.default.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'category_type',
      sequelize,
    });

    return this;
  }
} exports.default = CategoryType;
