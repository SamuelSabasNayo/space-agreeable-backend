/* eslint-disable import/prefer-default-export */
import models from '../database/models';

const { User } = models;

export const findUserByManagerId = async (req, res) => {
  try {
    // query managerId
    const { id } = req.userData,
      // finding all users with a provided managerId
      existingUsers = await User.findAll({ where: { managerId: id } });
    console.log(id);
    console.log(existingUsers);
      
      // mapping users Id with the aforementioned managerId
      const userIds = existingUsers.map((users) => users.id);
      console.log(userIds);
  } catch (error) {
    
  }
  if (!existingUser) return;
  
};
