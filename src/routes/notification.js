import { Router } from 'express';
import notifications from '../controllers/notification.controller';
import checkAuth from '../middlewares/check-auth';

const notificationRoutes = new Router();

/**
 * @swagger
 * /notifications:
 *  get:
 *    tags: [Notifications]
 *    summary: Get notifications
 *    description: Authenticated user can get all notifications regarding to his/her requests.
 *    responses:
 *      '200':
 *        description: All recieved notifications.
 *      '400':
 *        description: Bad request.
 *      '500':
 *        description: Internal server error.
*/
notificationRoutes.get('/', checkAuth, notifications.getNotifications);

export default notificationRoutes;
