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
        url: "https://a0.muscache.com/im/pictures/monet/Select-6335352/original/59cf6bfe-7233-40b6-9dd3-5fe8d7f6f570",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Select-6335352/original/a36952a9-53ee-4208-bb06-244081068e85",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Select-6335352/original/e01dfa9e-ea87-41ae-a44f-2c6aa4b4daf8",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Select-6335352/original/7a38f8bd-5479-45c6-9006-ab12499390ae",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Select-6335352/original/a69ed0b5-7ea8-487e-8a75-8ab6f76ec549",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/0941e35f-847b-4809-bb31-f8518b483f84.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/995ec9bf-86a0-47a6-b952-7e2df6714cc6.jpg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-30847041/original/541db311-dfb6-4e7c-bc8e-eab543345716.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/12d52d63-98d7-4573-97f3-ccf9cf318a87.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/cabc73f3-0fc9-4e7b-a0d8-1e5d9a8eb956.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/b5ea70dd-d7e9-45e7-9aea-bb0d4735790b.jpg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/835a2b8d-1af5-4847-8129-c410d04f8ea7.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/7e6df494-ff3b-46e2-962a-75d32b0503af.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/241201e0-6c99-4985-8ccc-83fa464f4e42.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/d8b1fb41-7399-4620-a946-b78b6d996f2c.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/156bb229-802f-4f65-990d-689db2e9c09c.jpg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/c35f2d4d-7078-42b9-8381-eebbfe7373cc.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/055703e3-831d-49b9-8940-3f3a4e67349e.jpg?",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/6143ee7c-6d9b-466d-b11e-88c71fa9c058.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/abb29870-b10e-4a3b-b633-6feb8d3349c5.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/a021f818-6a3f-4bd8-9f98-2d295e43bf78.jpg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679668778377143330/original/c7558a6e-ae69-4958-8780-af4b721ad2b1.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679668778377143330/original/e15c3ecc-e70f-4fa5-b0fa-eacc05303a54.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679668778377143330/original/10ab8149-ee02-41c6-b8b4-a1f7c3b55c2e.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679668778377143330/original/9a0b3bc8-0710-4119-b9f7-c95a47da34ca.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-782496083938409566/original/1eed67d4-b576-4e6f-8249-0f1d72084ad8.jpeg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-782496083938409566/original/b50ff484-33ad-454c-8ea2-2ca6890f3874.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679668778377143330/original/1cf5c8c0-8847-485b-8681-c465eb3271b3.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-782496083938409566/original/6f75999f-b83b-4490-8245-b3eda6a40599.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-782496083938409566/original/69366943-2f23-4c85-9c41-7f69cd8b5548.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657369677248770398/original/536400b7-7193-42cf-bbae-7c901e3f10f2.jpeg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657369677248770398/original/a0e86f7e-99a1-4d38-b825-d35de36855f2.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/77058894-e68b-42dd-ae39-5b73e4945545.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657369677248770398/original/b57574cc-997f-485f-bcca-2285935db27d.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657369677248770398/original/1a54fcd5-b5be-4154-9552-38a9051e07f7.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53240250/original/33c409be-3bc2-4e50-ae99-ae9db3f2f716.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53240250/original/de0357ff-559f-47d2-b29b-acc86fa936bc.jpeg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53240250/original/3ca09ac9-0518-492c-bc51-e7e96aae2759.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53240250/original/065f7655-5fd9-4509-9484-b00fa86aa611.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53240250/original/63b03ff7-725e-4dc5-96db-1ec02f5a208e.jpeg",
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
