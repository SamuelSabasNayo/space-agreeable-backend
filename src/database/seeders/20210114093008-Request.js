/* eslint-disable require-jsdoc */
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('requests', [
    {
      idUser: 5,
      requesterName: 'User1 Nomad',
      idRoom: 100,
      roomType: 'Double',
      hotelId: 1,
      hotelName: 'Marriott',
      location: 'Kigali-Rwanda',
      dateStart: '2021-01-30',
      dateEnd: '2021-02-10',
      requestStatus: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}

export function down(queryInterface, Sequelize) { return queryInterface.bulkDelete('requests', null, {}); }
