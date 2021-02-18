/* eslint-disable require-jsdoc */
import models from '../database/models';

const { request } = models;

export default class requestService {
  static async findAllRequestsByUserId(idUser) {
    const allRequests = await request.findAll({ where: { idUser } });

    if (allRequests) return allRequests;
  }
}
