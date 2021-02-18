'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('FacilitiesFeedbacks', [{
       facilityId: 1,
       senderId: 1,
       feedback_title: "Appricating the service",
       feedback_content: "We appricate the worm welcome we recieved during the last summer horidays we had there",
       seen: false,
       createdAt: new Date(),
       updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FacilitiesFeedbacks', null, {});
  }
};
