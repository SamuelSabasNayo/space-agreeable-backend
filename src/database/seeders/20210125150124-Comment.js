'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [{

      userId:1,
      requesterName:'Maliza Constantine',
      requestId: 2,
      comment:
        "test seeds.....",
      // reply: ["yes you are  welcome"],
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Comments', null, {});
   
  }
};