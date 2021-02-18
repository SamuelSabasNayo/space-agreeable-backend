/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('hotels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: false,
      type: Sequelize.INTEGER
    },
    hotelId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    hotelname: {
      type: Sequelize.STRING
    },
    pricerange: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    ranking: {
      type: Sequelize.STRING
    },
    parking: {
      type: Sequelize.STRING
    },
    wifi: {
      type: Sequelize.STRING
    },
    swimmingpool: {
      type: Sequelize.STRING
    },
    breakfast: {
      type: Sequelize.STRING
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    hotelemail: {
      type: Sequelize.STRING
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
// eslint-disable-next-line no-unused-vars
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('hotels');
}
