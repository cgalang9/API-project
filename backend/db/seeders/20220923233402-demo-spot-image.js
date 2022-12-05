'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/1055068/pexels-photo-1055068.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/580897/pexels-photo-580897.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
     spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
