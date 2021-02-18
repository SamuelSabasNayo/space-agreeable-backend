import models from '../database/models';

const { Notification } = models;

export default {
  createNotification: async (notification) => {
    try {
      return await Notification.create(notification);
    } catch (error) {
      throw new Error(error);
    }
  }
};
