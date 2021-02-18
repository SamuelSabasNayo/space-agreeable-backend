/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import models from '../database/models';
import requestHelper from '../utils/requestHelper';

const { request } = models,
  { findAllRequestsByUserId } = requestHelper;

export default class requestService {
  static async findAllRequests() {
    const existingRequest = await request.findAll({});
    if (existingRequest) return existingRequest;
  }

  static async findRequestById(id) {
    const existingRequest = await request.findOne({ where: { id } });
    if (existingRequest) return existingRequest;
  }

  static async findRequestByManagerId(idUser) {
    const existingRequest = await findAllRequestsByUserId(idUser);
    if (existingRequest) return existingRequest;
  }

  static async findRequestByRoomId(idRoom) {
    const existingRequest = await request.findOne({ where: { idRoom } });
    if (existingRequest) return existingRequest;
  }

  static async mapUserRequestIds(idUser) {
    const existingRequests = await findAllRequestsByUserId(idUser),
      userRequestIds = existingRequests.map((item) => item.id);
    if (userRequestIds) return userRequestIds;
  }

  static async mapRoomIds(idUser) {
    const existingRequests = await findAllRequestsByUserId(idUser),
      roomIds = existingRequests.map((item) => item.idRoom);

    if (roomIds) return roomIds;
  }

  static async requestLength(array) {
    const value = array.length;
    return value;
  }
}
