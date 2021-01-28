/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import models from '../database/models';

const { request } = models;

export default class requestService {
  static async findRequestById(id) {
    const existingRequest = await request.findOne({ where: { id } });
    if (existingRequest) return existingRequest;
  }

  static async findRequestByRoomId(id) {
    const existingRequest = await request.findOne({ where: { idRoom: id } });
    if (existingRequest) return existingRequest;
  }

  static async findRequestByManagerId(id) {
    const existingRequest = await request.findAll({ where: { idUser: id } });
    if (existingRequest) return existingRequest;
  }

  static async findAllRequests() {
    const existingRequest = await request.findAll({});
    if (existingRequest) return existingRequest;
  }
}
