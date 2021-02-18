module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RoomModels', [{
      hotelId: 1,
      description: 'Room for VIP',
      roomType: 'first class',
      roomLabel: 'label 001',
      status: 'double',
      price: '200$-300$',
      roomImage: 'https://www.images.com/image.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RoomModels', null, {});
  }
};
