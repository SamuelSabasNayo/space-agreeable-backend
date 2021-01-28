'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {

    static associate(models) {
      userRoles.hasMany(models.User, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  userRoles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userRoles',
  });
  return userRoles;
};
