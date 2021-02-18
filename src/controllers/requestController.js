/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
import model from '../database/models';
import hotelService from '../services/hotelService';
import roomService from '../services/roomService';
import requestService from '../services/requestService';
import requestHelper from '../utils/requestHelper';
import checkRequestAndNotify from '../helpers/checkType';

const { request } = model,
  { findHotelByName } = hotelService,
  { findRooms } = roomService,
  { findAllRequestsByUserId } = requestHelper,
  { findRequestById, mapUserRequestIds, mapRoomIds, requestLength } = requestService;

export default class requestController {
// getting all requests
  static async getAllRequests(req, res) {
    const userId = req.userData.id,
      existingRequests = await findAllRequestsByUserId(userId),
      existingRequestLength = await requestLength(existingRequests);

    if (existingRequestLength === 0) return res.status(404).json({ message: res.__('Request does not exist!') });

    res.status(200).json({ message: res.__('Requests found successfully!'), existingRequests });
  }

  // get one request
  static async getOneRequest(req, res) {
    try {
      let _response = '';
      const userId = req.userData.id,
        userRequestIds = await mapUserRequestIds(userId);

      const requestId = req.params.id,
        overallRequest = await findRequestById(requestId);

      if (!overallRequest) _response = res.status(404).json({ message: res.__('Request Id does not exist!') });
      const matchingRequestId = userRequestIds.find((elem) => elem === overallRequest.id);

      if (!matchingRequestId) _response = res.status(404).json({ message: res.__('Request does not exist!') });
      const displayRequest = overallRequest;

      _response = res.status(200).json({ message: res.__('Request found successfully'), displayRequest });

      return _response;
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // creating a request
  static async createRequest(req, res) {
    try {
      const { idRoom, hotelName, dateStart, dateEnd } = req.body,
        { id, firstname, lastname } = req.userData,
        hotel = await findHotelByName(hotelName);

      if (!hotel) res.status(403).json({ message: res.__('Hotel does not exist!') });
      const room = await findRooms(idRoom);

      if (!room) res.status(403).json({ message: res.__('Room id does not exist!') });
      const roomStatus = room.status,
        roomIds = await mapRoomIds(id);

      const oneRequest = await roomIds.find((elem) => elem === idRoom);

      if (oneRequest || roomStatus === 'OCCUPIED') return res.status(400).json({ message: res.__('Room Id is already occupied!') });

      const savedRequest = await request.create({
        idUser: id,
        requesterName: `${firstname} ${lastname}`,
        idRoom,
        roomType: room.roomType,
        hotelId: hotel.id,
        hotelName,
        location: hotel.location,
        dateStart,
        dateEnd
      });
      const userId = id;
      const status = savedRequest.dataValues.requestStatus;
      const reqId = savedRequest.dataValues.id;

      checkRequestAndNotify(status, 'PENDING', userId, reqId, 'Request created', 'Your request has been created');

      res.status(201).json({ message: res.__('Request created successfully!'), savedRequest });
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }

  // updating a request
  static async updateRequest(req, res) {
    try {
      const userId = req.userData.id,
        userRequestIds = await mapUserRequestIds(userId);

      if (!userRequestIds) res.status(404).json({ message: 'No request found!' });
      const requestId = req.params.id,
        overallRequest = await findRequestById(requestId);

      if (!overallRequest) res.status(404).json({ message: res.__('Request Id does not exist!') });
      const matchingRequestId = userRequestIds.find((elem) => elem === overallRequest.id);

      if (!matchingRequestId) res.status(404).json({ message: res.__('Request does not exist!') });
      const { requestStatus } = overallRequest;

      if (requestStatus !== 'PENDING') return res.status(403).json({ message: res.__('Only PENDING request can be edited!') });
      await request.update(req.body, { where: { id: requestId } });

      const updatedRequest = await findRequestById(requestId);

      res.status(200).json({ message: res.__('Requested updated successfully'), updatedRequest });
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }

  // deleting a request
  static async deleteRequest(req, res) {
    try {
      let _response = '';
      const userId = req.userData.id,
        userRequestIds = await mapUserRequestIds(userId);

      const requestId = req.params.id,
        overallRequest = await findRequestById(requestId);

      if (!overallRequest) _response = res.status(404).json({ message: res.__('Request Id does not exist!') });
      const matchingRequestId = userRequestIds.find((elem) => elem === overallRequest.id);

      if (!matchingRequestId) _response = res.status(404).json({ message: res.__('Request does not exist!') });
      await request.destroy({ where: { id: matchingRequestId } });

      _response = res.status(200).json({ message: res.__('Request deleted successfully!') });

      return _response;
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }
}
