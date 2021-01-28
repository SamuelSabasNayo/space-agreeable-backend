'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
  
    static associate(models) {
   
      //association with room table
      request.belongsTo(models.RoomModel, {
        as: "room",
        foreignKey: "idRoom",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  request.init({
    idUser: DataTypes.INTEGER,
    idRoom: {
      type: DataTypes.INTEGER,
    allowNull: false
  },
    dateStart: {
      type: DataTypes.DATE, 
      allowNull: false
    },
    dateEnd: {
      type: DataTypes.DATE, 
      allowNull: false
    },
    requestStatus: {
      type: DataTypes.STRING,
      defaultValue: "PENDING"
    }
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};