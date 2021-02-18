module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, {
      foreignKey: 'email',
      as: 'author',
      onDelete: 'CASCADE',
    });
  };
  return Question;
};
