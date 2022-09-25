'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Gawd'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'User1',
        lastName: 'Last1'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'User2',
        lastName: 'Last2'
      },
      {
        email: 'imfake@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4our'),
        firstName: 'Faker1',
        lastName: 'Fake Last1'
      },
      {
        email: 'cubeman@user.io',
        username: 'Cubester',
        hashedPassword: bcrypt.hashSync('password5ive'),
        firstName: 'Cu',
        lastName: 'Be'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'Cubester'] }
    }, {});
  }
};
