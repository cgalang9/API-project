'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 Main Street",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 100.7645358,
      lng: -50.4730327,
      name: "App Academy 2.0",
      description: "Place I made up right now",
      price: 123,
    },
    {
      ownerId: 2,
      address: "100 Red Keep",
      city: "Kings Landing",
      state: "Not California",
      country: "Westeros",
      lat: -6.5817233,
      lng: -77.5074512,
      name: "The Red Keep",
      description: "Place of political intrigue",
      price: 1500,
    },
    {
      ownerId: 3,
      address: "51 West St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 42.9820787,
      lng: 105.9937421,
      name: "Not App Academy",
      description: "Place where web developers are created",
      price: 300,
    },
    {
      ownerId: 4,
      address: "312 Queens Road",
      city: "Louisville",
      state: "Kentucky",
      country: "United States of America",
      lat:  -17.5555555,
      lng: 37.9736999,
      name: "KFC kitchen",
      description: "Birthplace of fried chicken",
      price: 200,
    },
    {
      ownerId: 5,
      address: "123 Disney Lane",
      city: "London",
      state: "London",
      country: "United Kingdom",
      lat: -20.9081509,
      lng: 153.5224999,
      name: "Buckingham Palace",
      description: "All hail the queen",
      price: 1000,
    },
    {
      ownerId: 1,
      address: "500 Eagle Rd",
      city: "New York City",
      state: "New York",
      country: "United States of America",
      lat: 38.6269322,
      lng: 51.5326111,
      name: "Apartment in NYC",
      description: "Newly renovated apartment",
      price: 350,
    },
    {
      ownerId: 1,
      address: "35 W 32nd St",
      city: "New York City",
      state: "New York",
      country: "United States of America",
      lat: -17.72844,
      lng: -50.00492,
      name: "Somewhere",
      description: "Somewhere in NYC",
      price: 275,
    },
    {
      ownerId: 3,
      address: "92 Green Rd",
      city: "Sacramento",
      state: "California",
      country: "United States of America",
      lat: 18.9717888,
      lng: -148.0955000,
      name: "House for Rent",
      description: "3 bedrooms, 2 bathrooms",
      price: 310,
    },

   ])
  },

  async down (queryInterface, Sequelize) {
     const Op = Sequelize.Op;
     options.tableName = 'Spots';
     await queryInterface.bulkDelete(options, {
      country: { [Op.in]: ["United States of America", "United Kingdom", "Westeros"] }
     }, {});
  }
};
