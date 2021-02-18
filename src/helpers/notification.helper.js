/* eslint-disable import/no-cycle */
import { io } from '../app';
import notificationService from '../services/notification';

export default {
  sendNotification: async ({
    userId, requestId, title, message, status, eventType, link
  }) => {
    try {
      const notification = {
        userId, requestId, title, message, status, link
      };
      const createdNotif = await notificationService.createNotification(notification);

      notification.id = createdNotif.id;
      notification.time = Date.now();

      if (eventType === 'PENDING') {
        io.sockets.in(`notification_${userId}`).emit('pending', notification);
      }
      if (eventType === 'APPROVED') {
        io.sockets.in(`notification_${userId}`).emit('approved', notification);
      }
      if (eventType === 'REJECTED') {
        io.sockets.in(`notification_${userId}`).emit('rejected', notification);
      }
      return createdNotif;
    } catch (error) {
      throw new Error(error);
    }
  }
};
