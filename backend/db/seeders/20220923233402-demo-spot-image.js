"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/1055068/pexels-photo-1055068.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/580897/pexels-photo-580897.jpeg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/2362002/pexels-photo-2362002.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/1088291/pexels-photo-1088291.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/3049340/pexels-photo-3049340.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/2134224/pexels-photo-2134224.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/13945431/pexels-photo-13945431.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/4078617/pexels-photo-4078617.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/1038259/pexels-photo-1038259.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/7061663/pexels-photo-7061663.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/6032425/pexels-photo-6032425.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/12836634/pexels-photo-12836634.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/12715492/pexels-photo-12715492.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/8574662/pexels-photo-8574662.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/9131040/pexels-photo-9131040.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/8143680/pexels-photo-8143680.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/6438761/pexels-photo-6438761.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/6284232/pexels-photo-6284232.jpeg",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
