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
        preview: true
      },
      {
        spotId: 3,
        url: 'test2.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'test3.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'test4.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'test5.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'Pretest6.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'test7.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'test8.png',
        preview: false
      },
      {
        spotId: 2,
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
