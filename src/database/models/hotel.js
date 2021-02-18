/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    static associate(models) {
      // define association here
      hotel.hasMany(models.RoomModel, {
        foreignKey: 'hotelId',
        as: 'rooms'
      });
    }
  }
  hotel.init({
    hotelId: DataTypes.INTEGER,
    hotelname: DataTypes.STRING,
    pricerange: DataTypes.STRING,
    location: DataTypes.STRING,
    ranking: DataTypes.STRING,
    parking: DataTypes.STRING,
    wifi: DataTypes.STRING,
    swimmingpool: DataTypes.STRING,
    breakfast: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    hotelemail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hotel',
  });
  return hotel;
};
