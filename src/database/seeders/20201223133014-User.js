'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstname: 'Kabano',
      lastname: 'Gilles',
      telephone: '0788934556',
      email: 'gilleskaba@gmail.com',
      password: '1234567$#8',
      role: 'Nomad',
      gender: 'Male',
      origin: '',
      profession: 'Software Engineer',
      age: 25,
      identification_type: 'ID',
      identification_number: '11995403985764576',
      user_image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
