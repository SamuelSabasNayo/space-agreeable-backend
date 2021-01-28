/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import model from '../database/models';
import requestService from '../services/requestService';
import userService from '../services/userService';

const { request, User } = model,
  { findRequestByRoomId, findRequestById, findRequestByManagerId } = requestService,
  { findUserById, findUserByManagerId } = userService;

export default class managerController {
  // get all requests
  static async getAllRequests(req, res) {
    try {
      // query managerId
      const { id } = req.userData,
        // finding all users with a provided managerId
        existingUsers = await findUserByManagerId(id);
      // console.log(existingUsers);
      // mapping users Id with the aforementioned managerId
      const userIds = existingUsers.map((users) => users.id);

      // find all requests corresponding to the aforementioned userIds
      const allRequests = await findRequestByManagerId(userIds);

      if (allRequests.length === 0) return res.status(400).json({ message: res.__('No request found!') });

      return res.status(200).json({ message: res.__('All requests found successfully!'), allRequests });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // get one request
  static async getOneRequest(req, res) {
    try {
      // query managerId
      const { id } = req.userData,
        // finding all users with a provided managerId
        existingUsers = await findUserByManagerId(id);
      // console.log(existingUsers);
      // mapping users Id with the aforementioned managerId
      const userIds = existingUsers.map((item) => item.id);
      // console.log(userIds);
      // find all requests corresponding to the aforementioned userIds
      const allRequests = await findRequestByManagerId(userIds);
      // console.log(allRequests);

      const requestId = req.params.id;
      // const requestId = 6;
      // console.log(requestId);

      // map requestIds of the corresponding requests
      const existingRequestIds = allRequests.map((item) => item.id);
      // console.log(existingRequestIds);
      // const oneRequest = await allRequests.find((item) => item.id === requestId);
      // console.log(oneRequest);
      // find a request using is provided in params
      const overallRequest = await findRequestById(requestId);

      if (!overallRequest) return res.status(400).json({ message: res.__('Request does not exist!') });
      // console.log(existingRequest.id);
      // check if the obtained request match with the corresponding requests
      const oneRequest = await existingRequestIds.find((elem) => elem === overallRequest.id);
      // console.log(oneRequest);
      if (!oneRequest) return res.status(400).json({ message: res.__('Request does not exist.') });
      const displayRequest = overallRequest;
      return res.status(200).json({ message: res.__('Request found successfully!'), displayRequest });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // create a request
  static async addRequest(req, res) {
    try {
      const newIdRoom = req.body.idRoom;

      const allRequests = await findRequestByRoomId(newIdRoom);

      if (allRequests) return res.status(400).json({ message: 'Room is already occupied!' });
      const savedRequest = await request.create(req.body);
      return res.status(201).json({ message: res.__('Request added successfully!'), savedRequest });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error!' });
    }
  }

  // update a request
  static async updateRequest(req, res) {
    try {
      const { id } = req.params;
      const existingRequest = await findRequestById(id);

      if (!existingRequest) return res.status(404).json({ message: res.__('Request does not exist.') });

      await request.update(req.body, { where: { id } });

      const updatedRequest = await request.findOne({ where: { id } });
      return res.status(200).json({ message: res.__('Request updated successfully!'), updatedRequest });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  // assign manager Id
  static async assignManagerId(req, res) {
    try {
      const { _userId, _managerId } = req.body,
        existingUser = await findUserById(_userId);
      if (!existingUser) return res.status(404).json({ message: res.__('User does not exist.') });
      const { roleId } = existingUser;

      if (roleId === 1 || roleId === 2) return res.status(403).json({ message: 'Access denied! to this user!' });
      const existingManager = await findUserById(_managerId);

      if (!existingManager) return res.json({ message: res.__('Manager Id does not exist.') });
      const savedManagerId = existingManager.roleId;

      if (savedManagerId !== 2) return res.status(403).json({ message: 'Wrong Manager Id!' });
      const managerId = _managerId;

      await User.update({ managerId }, { where: { id: _userId } });

      return res.status(201).json({ message: res.__('Manager Id is assigned successfully!') });
    } catch (error) {
      return res.status(500).send({ error: 'Internal Server Error!' });
    }
  }
}
