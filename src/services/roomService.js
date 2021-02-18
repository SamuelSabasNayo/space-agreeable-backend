/* eslint-disable require-jsdoc */
import models from '../database/models';

const { RoomModel } = models;

export default class roomService {
  static async findRooms(id) {
    const existingRoom = await RoomModel.findOne({ where: id });

    if (existingRoom) return existingRoom;
  }
}
