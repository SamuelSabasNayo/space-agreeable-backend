/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    managerId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    origin: DataTypes.STRING,
    age: DataTypes.INTEGER,
    identification_type: DataTypes.STRING,
    identification_number: DataTypes.STRING,
    user_image: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    savedData: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'User'
  });

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.userRoles, {
      as: 'role',
      foreignKey: 'roleId'
    }),
    User.hasMany(models.Reaction, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.rating, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
  };

  return User;
};
