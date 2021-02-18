/* eslint-disable import/no-cycle */
import { emitEvent } from './events';

const checkRequestAndNotify = (reqStatus, type, userIdK, id, titleMessage, notiMessage) => {
  if (reqStatus === type) {
    const notification = {
      eventType: type,
      userId: userIdK,
      requestId: id,
      title: titleMessage,
      message: notiMessage,
      link: `/requests/${id}`,
      status: 'unread'
    };
    emitEvent.emit('notification', notification);
  }
};

export default checkRequestAndNotify;
