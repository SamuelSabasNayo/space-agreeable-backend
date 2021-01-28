/* eslint-disable import/prefer-default-export */
import models from '../database/models';

const { RoomModel } = models;

export const findRooms = async (idRoom) => {
  const room = await RoomModel.findOne({ where: idRoom });
  if (room) return room;
};
