'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('Facilities', [{
        location:'Lagos',
        address:'Wisky ave 216\'st ',
        images:'location.jpg',
        roomNumber:12,
        roomDetails:'{anasa:sdsds, sdsds:sdsdsds}',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
