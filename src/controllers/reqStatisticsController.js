/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import requestHelper from '../utils/requestHelper';
import reqStatistics from '../helpers/reqStatistics';
import requestService from '../services/requestService';
import userService from '../services/userService';

const { findAllRequestsByUserId } = requestHelper,
  { filterRequests } = reqStatistics,
  { findUserByManagerId } = userService,
  { findRequestByManagerId, requestLength } = requestService;

export default class reqStatisticsController {
  static async userGetReqStats(req, res) {
    try {
      const { time } = req.query,
        { id } = req.userData,

        existingRequest = await findAllRequestsByUserId(id);

      const allRequests = await filterRequests(time, existingRequest),

        nberRequests = await requestLength(allRequests);

      res.status(200).json({ message: res.__('All requests found successfully!'), nberRequests, allRequests });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async managerGerGetReqStats(req, res) {
    try {
      const { time } = req.query,
        { id } = req.userData,

        // finding all users with a provided managerId
        existingUsers = await findUserByManagerId(id),

        // mapping users Id with the aforementioned managerId
        userIds = existingUsers.map((users) => users.id),

        existingRequest = await findRequestByManagerId(userIds);

      const allRequests = await filterRequests(time, existingRequest),

        nberRequests = await requestLength(allRequests);

      res.status(200).json({ message: res.__('All requests found successfully!'), nberRequests, allRequests });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
