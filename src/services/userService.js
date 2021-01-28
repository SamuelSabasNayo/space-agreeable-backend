/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import models from '../database/models';

const { User } = models;

export default class userService {
  static async findUserById(userId) {
    const existingUser = await User.findOne({ where: { id: userId } });
    if (existingUser) return existingUser;
  }

  static async findUserByManagerId(id) {
    const existingUser = await User.findAll({ where: { managerId: id } });
    if (existingUser) return existingUser;
  }
}
