/* eslint-disable import/no-cycle */
import { EventEmitter } from 'events';
import notificationHelper from './notification.helper';

export const emitEvent = new EventEmitter();

export default () => {
  emitEvent.on('notification', notificationHelper.sendNotification);
};
