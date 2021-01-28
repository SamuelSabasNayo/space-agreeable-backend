/* eslint-disable no-unused-vars */
import { config } from 'dotenv';

config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userRoles', [
      {
        name: 'TRAVEL_ADMIN',
        description: 'This is a travel administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'TRAVEL_TEAM_MEMBER',
        description: 'This is a collegue of the requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'REQUESTER',
        description: 'This is a requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userRoles', null, {});
  }
};
