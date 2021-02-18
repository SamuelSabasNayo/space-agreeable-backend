'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilitiesFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FacilitiesFeedback.init({
    facilityId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    feedback_title: DataTypes.STRING,
    feedback_content: DataTypes.TEXT,
    seen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FacilitiesFeedback',
  });
  return FacilitiesFeedback;
};