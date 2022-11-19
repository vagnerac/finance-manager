"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'transaction',
      'user_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    );
  },

  down(queryInterface) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'transaction',
      'user_id',
    );
  },
};
