/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

' use strict ';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    static associate(models) {
      // define association here
      rating.belongsTo(models.Facility, {
        foreignKey: 'facilityId',
        onDelete: 'CASCADE'
      });
      rating.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  rating.init({
    facilityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'rating',
  });
  return rating;
};
