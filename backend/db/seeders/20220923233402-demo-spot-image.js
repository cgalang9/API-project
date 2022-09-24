'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'test.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'test1.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'Prevtest1.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'Prevtest2.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'Prevtest3.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'Prevtest4.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'test5.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'Prevtest6.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'Prevtest7.png',
        preview: true
      },
      {
        spotId: 7,
        url: 'Prevtest8.png',
        preview: true
      },
      {
        spotId: 8,
        url: 'test9.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'PrevTest9.png',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
     await queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
     }, {});
  }
};
