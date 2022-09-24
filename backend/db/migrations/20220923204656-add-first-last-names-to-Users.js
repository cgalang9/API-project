'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING(30)
    })
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(30)
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addRemove('Users', 'firstName')
    await queryInterface.addRemove('Users', 'lastName')
  }
};
