module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('hotels', [{
      hotelname: 'Gorillas Hotel',
      pricerange: '$120',
      location: 'Nyamagabe',
      ranking: '3 star',
      parking: 'Yes',
      wifi: 'Yes',
      swimmingpool: 'no',
      breakfast: 'Yes',
      rooms: ['Double rooms', 'Single rooms', 'complex rooms'],
      images: ['www.unsplash.com/umubavu', 'www.gettyimages/umubavuhotel'],
      hotelemail: 'five@yahoo.com',
      updatedAt: '2020-12-21T13:53:26.104Z',
      createdAt: '2020-12-21T13:53:26.104Z'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hotels', null, {});
  }
};
