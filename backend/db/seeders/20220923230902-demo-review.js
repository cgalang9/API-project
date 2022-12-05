'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: '5 stars, will come back',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Old, run down. Avoid this place.',
        stars: 0
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Nice location, but no amenities',
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Nothing special',
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Not bad, but could be better',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Worse time of my life',
        stars: 2
      },
      {
        spotId: 1,
        userId: 4,
        review: 'It was just ok',
        stars: 3
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Good host, responsive and friendly',
        stars: 4
      },
      {
        spotId: 1,
        userId: 5,
        review: 'Clean and good location',
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Needs work',
        stars: 2
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Very good stay, will come back soon.',
        stars: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
     spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
