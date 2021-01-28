/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
import model from '../database/models';
import { findRooms } from '../services/roomService';
import requestService from '../services/requestService';
import requestHelper from '../utils/requestHelper';

const { request } = model,
  { findAllRequestsByUserId } = requestHelper,
  { findRequestById, findRequestByRoomId, mapUserRequestIds, requestLength } = requestService;

export default class requestController {
// getting all requests
  static async getAllRequests(req, res) {
    let _response = '';
    const userId = req.userData.id,
      existingRequests = await findAllRequestsByUserId(userId),
      existingRequestLength = await requestLength(existingRequests);

    if (existingRequestLength === 0) _response = res.status(404).json({ message: res.__('Request does not exist!') });

    _response = res.status(200).json({ message: res.__('Requests found successfully!'), existingRequests });

    return _response;
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
      let _response = '';
      const newIdRoom = req.body.idRoom,
        allRequests = await findRequestByRoomId(newIdRoom);

      if (allRequests) _response = res.status(403).json({ message: res.__('Room id is already occupied!') });
      const {
          idRoom, dateStart, dateEnd
        } = req.body,
        userId = req.userData.id;

      const existingRoom = await findRooms(idRoom);

      if (!existingRoom) _response = res.status(400).json({ message: res.__('Room id does not exist') });

      const newRequest = {
        idUser: userId,
        idRoom,
        dateStart,
        dateEnd
      };
      const savedRequest = await request.create(newRequest);

      _response = res.status(201).json({ message: res.__('Request created successfully!'), savedRequest });

      return _response;
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }

  // updating a request
  static async updateRequest(req, res) {
    try {
      let _response = '';
      const userId = req.userData.id,
        userRequestIds = await mapUserRequestIds(userId);

      if (!userRequestIds) _response = res.status(404).json({ message: 'No request found!' });
      const requestId = req.params.id,
        overallRequest = await findRequestById(requestId);

      if (!overallRequest) _response = res.status(404).json({ message: res.__('Request Id does not exist!') });
      const matchingRequestId = userRequestIds.find((elem) => elem === overallRequest.id);

      if (!matchingRequestId) _response = res.status(404).json({ message: res.__('Request does not exist!') });
      const { requestStatus } = overallRequest;

      if (requestStatus !== 'PENDING') _response = res.status(403).json({ message: res.__('Only PENDING request can be edited!') });
      await request.update(req.body, { where: { id: requestId } });

      const updatedRequest = await findRequestById(requestId);
      _response = res.status(200).json({ message: res.__('Requested updated successfully'), updatedRequest });

      return _response;
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
