import { Router } from 'express';
import managerController from '../controllers/managerController';
import auth from '../middlewares/check-auth';

const router = Router();

const { getAllRequests, getOneRequest, updateRequest } = managerController;
/**
 * @swagger
 * /manager/requests:
 *  get:
 *    tags: [Manager]
 *    summary: Manager can get all requests.
 *    description: Manager can get all requests from database.
 *    responses:
 *      '200':
 *        description: Requests are displayed successfuly.
*/
router.get('/requests', auth, getAllRequests);

/**
 * @swagger
 * /manager/requests/:id:
 *  get:
 *    tags: [Manager]
 *    summary: Manager can get one request.
 *    description: Manager can get any request from database.
 *    responses:
 *      '200':
 *        description: Requests are displayed successfuly.
*/
router.get('/requests/:id', auth, getOneRequest);

/**
 * @swagger
 *
 * /manager/requests/:id:
 *    put:
 *      tags: [Manager]
 *      summary: Manager can update a request.
 *      description: Manager can approve/update a request.
 *      parameters:
 *        - name: id
 *          in: path
 *          description: request id
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requests'
 *      responses:
 *        "201":
 *          description: Request updated successfully.
 *
 * components:
 *    schemas:
 *      requests:
 *        type: object
 *        required:
 *          - dateStart
 *          - dateEnd
 *          - idRoom
 *        properties:
 *          dateStart:
 *            type: string
 *          dateEnd:
 *            type: string
 *          idRoom:
 *             type: number
 */
router.put('/requests/:id', auth, updateRequest);

export default router;
