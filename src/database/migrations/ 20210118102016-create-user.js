/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    roleId: {
      type: Sequelize.INTEGER
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING
    },
    origin: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    identification_type: {
      type: Sequelize.STRING
    },
    identification_number: {
      type: Sequelize.STRING
    },
    user_image: {
      type: Sequelize.STRING
    },
    savedData: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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
  await queryInterface.dropTable('Users');
}
