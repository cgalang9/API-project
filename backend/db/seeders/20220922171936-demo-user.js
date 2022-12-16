'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Name'
      },
      {
        email: 'user1@user.io',
        username: 'KennyG',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Kenny',
        lastName: 'G'
      },
      {
        email: 'user2@user.io',
        username: 'Wednesday',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Wednesday',
        lastName: 'Adams'
      },
      {
        email: 'imfake@user.io',
        username: 'Ronaldinho',
        hashedPassword: bcrypt.hashSync('password4our'),
        firstName: 'Ronaldinho',
        lastName: 'Gaucho'
      },
      {
        email: 'cubeman@user.io',
        username: 'Harry22',
        hashedPassword: bcrypt.hashSync('password5ive'),
        firstName: 'Harry',
        lastName: 'Potter'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['cubeman@user.io', 'imfake@user.io', 'user2@user.io', 'user1@user.io', 'demo@user.io'] }
    }, {});
  }
};
