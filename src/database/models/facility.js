/* eslint-disable lines-around-directive */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
' use strict ';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      // define association here
      Facility.hasMany(models.Reaction, {
        foreignKey: 'facilityId'
      });
      Facility.hasMany(models.rating, {
        foreignKey: 'facilityId'
      });
    }
  }
  Facility.init({
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    images: DataTypes.STRING,
    roomNumber: DataTypes.INTEGER,
    roomDetails: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Facility',
  });
  return Facility;
};
