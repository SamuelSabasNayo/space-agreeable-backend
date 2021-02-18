/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.request, { foreignKey: 'requestId' });
      Notification.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Notification.init({
    requestId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    link: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unread',
      validate: {
        isIn: { args: [['unread', 'read']], msg: 'Notification status can either be read or unread' }
      }
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
