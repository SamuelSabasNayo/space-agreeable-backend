const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    idUser: DataTypes.INTEGER,
    idRoom: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'request',
  });
  return Request;
};
