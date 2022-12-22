"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Main Street",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 100.7645358,
        lng: -50.4730327,
        name: "New Modern House in SF",
        description:
          'This home is a perfect getaway ready to welcome you for some care free time with your family and friends. Newly renovated stylish home w/ tons of natural light. This cozy space has everything you need to be comfortable for your stay. Your private retreat includes wifi, Apple TV, 55" screen TV, fully equipped kitchen & many more amenities. Centrally located, a few blocks away from downtown.',
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
        description:
          "Stay in the captial of Westeros! Incredible views of the city from high atop Kings Landing. Come stay in this historic castle and enjoy the political intrigue. The staff includes a coos, caretakers and guards. Wifi not included",
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
        name: "Cozy Home in San Francisco",
        description:
          "Stride across upper level with 27 ft of windows unobstructed views on heated floors and sit by a fireplace with a sailing sloop model on the mantelpiece. A mid-century-modern vibe is contrasted by vibrant art and images of George Washington and Nefertiti. Peer through this wall of windows with a telescope at a scenic neighborhood or gaze as far you can see the southern landscape. Private entrance, top floor living space with unobstructed views, sunlight, and wall-to-wall windows exclusively yours. Your host keeps separate unit on ground floor not accessible to guests via shared garage/laundry room.",
        price: 300,
      },
      {
        ownerId: 4,
        address: "312 Queens Road",
        city: "Louisville",
        state: "Kentucky",
        country: "United States of America",
        lat: -17.5555555,
        lng: 37.9736999,
        name: "The Perfect Getaway",
        description:
          "Come savor a secluded escape in the green mountains. Park your car and enjoy a short hike up to your private mountainside retreat. This cozy cabin in the forest is the perfect spot to relax, slow down, and unwind. For adventure seekers, it is the ideal home base. Well maintained hiking trails surround the area. We are minutes from the Long Trail, renowned rock climbing, beautiful swimming holes, kayaking, fishing, golfing, mountain biking, skiing and snowboarding.",
        price: 200,
      },
      {
        ownerId: 5,
        address: "123 Disney Lane",
        city: "London",
        state: "England",
        country: "United Kingdom",
        lat: -20.9081509,
        lng: 153.5224999,
        name: "Upscale and spacious home in London",
        description:
          "Experience London from one of London's most exclusive areas. This one-of-a-kind home has it all! Take in breathtaking views of London from the Sky Garden, relax in the beautifully furnished living room, cook in the modern kitchen, and sleep in the ultra-comfortable beds. You'll be in Vauxhall, where you'll find exceptional restaurants just steps from your front door and many major attractions within walking distance.",
        price: 1000,
      },
      {
        ownerId: 1,
        address: "500 Eagle Rd",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 38.6269322,
        lng: 51.5326111,
        name: "Waterfront home",
        description:
          "Best of both worlds location, relaxing and vibrant, perfect for the whole Family! Enjoy your Miami stay to the fullest at this outstanding location, just steps away from the beautiful Miami Beach (approx. 6-minute walk), and the ultra-luxurious Bal Harbor Shops (2-miles). This modern and cozy home is Fully Equipped. So sit back and enjoy your stay!",
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
        name: "Modern Entire House in Queens",
        description:
          "Beautiful Spacious house with 2 car parking that accommodates 4 guests comfortably. Enjoy quiet relaxing stay while being close to Manhattan. If you don't want to feel stuck in a tiny New York City apartment this is your chance to really enjoy your trip in every possible way. Located in Queens, Astoria is considered one of the most diverse neighborhoods in New York. You will find its diversity in the restaurants, shops, and cafes.",
        price: 275,
      },
      {
        ownerId: 3,
        address: "92 Green Rd",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 18.9717888,
        lng: -148.0955,
        name: "Stunning Curtis Park Home 2 Bed With Spacious Yard!",
        description:
          "This amazing space is centrally located in Curtis park, near Dtown/Midtown, UC Davis Med Center, Old Sac &Golden 1 Center! Walk to restaurants, pubs &even a local yoga studio! Don't miss your favorite shows, high speed internet, comfortable beds-featuring, 2 king bed/2 bath including the living room couch that easily makes into queen bed w/ provided bedding! Sleeps 6 guests comfortably. Front porch &back deck for relaxing. Bbq outside, grab a beer by the fire pit & enjoy the ambiance! No parties.",
        price: 310,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = "Spots";
    await queryInterface.bulkDelete(
      options,
      {
        country: {
          [Op.in]: ["United States of America", "United Kingdom", "Westeros"],
        },
      },
      {}
    );
  },
};
