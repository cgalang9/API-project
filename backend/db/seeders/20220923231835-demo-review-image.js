'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'test.jpg'
      },
      {
        reviewId: 1,
        url: 'test1.jpg'
      },
      {
        reviewId: 2,
        url: 'test2.jpg'
      },
      {
        reviewId: 3,
        url: 'test3.jpg'
      },
      {
        reviewId: 4,
        url: 'test4.jpg'
      },
      {
        reviewId: 5,
        url: 'test5.jpg'
      },
      {
        reviewId: 1,
        url: 'test6.jpg'
      },
      {
        reviewId: 6,
        url: 'test7.jpg'
      },
      {
        reviewId: 2,
        url: 'test8.jpg'
      },
      {
        reviewId: 3,
        url: 'test9.jpg'
      },
      {
        reviewId: 2,
        url: 'test10.jpg'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
     await queryInterface.bulkDelete('ReviewImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
     }, {});
  }
};
