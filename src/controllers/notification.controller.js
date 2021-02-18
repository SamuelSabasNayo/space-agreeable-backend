/* eslint-disable no-underscore-dangle */
import models from '../database/models';

const { Notification } = models;

export default {
  getNotifications: async (req, res) => {
    try {
      const { id } = req.userData;
      const savedNotifications = await Notification.findAll({
        where: { userId: id }
      });
      if (!savedNotifications || savedNotifications.length === 0) {
        return res.status(404).json({ message: res.__('No notifications yet') });
      }
      return res.status(200).json({ message: res.__('All received notifications'), savedNotifications });
    } catch (error) {
      return res.status(500).json({ message: res.__('Internal server error!') });
    }
  }
};
