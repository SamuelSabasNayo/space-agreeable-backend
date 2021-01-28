
module.exports = (sequelize, DataTypes) => {
  const RoomModel = sequelize.define('RoomModel',{
   roomType: DataTypes.STRING,
   description: DataTypes.STRING,
   roomLabel: DataTypes.STRING,
   hotelId: DataTypes.INTEGER,
   status: DataTypes.STRING,
   price: DataTypes.STRING,
   roomImage: DataTypes.STRING
  },
  {
   sequelize,
   modelName: 'RoomModel',
   onUpdate: 'CASCADE',
   onDelete: 'CASCADE'
 });

   return RoomModel;
 };
 
