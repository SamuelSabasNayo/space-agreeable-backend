/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate(models) {
      Reaction.belongsTo(models.Facility, {
        foreignKey: 'facilityId',
        onDelete: 'CASCADE',
      });
      Reaction.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Reaction.init({
    facilityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
    unliked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};
