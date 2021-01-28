/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('requests', [{
    idUser: 1,
    idRoom: 100,
    dateStart: '2021-01-30',
    dateEnd: '2021-02-10',
    requestStatus: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    idUser: 2,
    dateStart: '2021-01-20',
    dateEnd: '2021-02-01',
    idRoom: 101,
    requestStatus: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('requests', null, {}); }
