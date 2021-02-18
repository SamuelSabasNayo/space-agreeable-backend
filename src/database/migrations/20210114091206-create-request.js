/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idUser: {
      type: Sequelize.INTEGER
    },
    requesterName: {
      type: Sequelize.STRING
    },
    idRoom: {
      type: Sequelize.INTEGER
    },
    roomType: {
      type: Sequelize.STRING
    },
    hotelId: {
      type: Sequelize.INTEGER
    },
    hotelName: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    dateStart: {
      type: Sequelize.DATE
    },
    dateEnd: {
      type: Sequelize.DATE
    },
    requestStatus: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('requests');
}
