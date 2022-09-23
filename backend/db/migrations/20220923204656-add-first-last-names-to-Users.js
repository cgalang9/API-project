'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING(30),
      allowNull: false
    })
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(30),
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addRemove('Users', 'firstName')
    await queryInterface.addRemove('Users', 'lastName')
  }
};
