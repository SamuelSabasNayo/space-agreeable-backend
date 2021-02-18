/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { Router } from 'express';
import authRequest from '../middlewares/check-auth';
import { createRequestValidation, updateRequestValidation, reqStatisticsValidation } from '../middlewares/requestValidation';
import requestController from '../controllers/requestController';
import reqStatisticsController from '../controllers/reqStatisticsController';

const router = Router();

const { getAllRequests, getOneRequest, createRequest, updateRequest, deleteRequest } = requestController,
  { userGetReqStats } = reqStatisticsController;

/**
 * @swagger
 * /requests:
 *  get:
 *    tags: [Request Accommodation]
 *    summary: Authenticated user can get all requests.
 *    description: Authenticated user can get all requests from database.
 *    responses:
 *      '200':
 *        description: Requests are displayed successfuly.
*/
router.get('/', authRequest, getAllRequests);

/**
 * @swagger
 * /requests/stats:
 *  get:
 *    tags: [Request Accommodation]
 *    summary: Authenticated user can get request statistics in X time.
 *    description: Authenticated user can get request statistics in X time from database.
 *    parameters:
 *      - in: query
 *        name: time
 *        schema:
 *          type: integer
 *        description: days from today
 *    responses:
 *      '200':
 *        description: Requests found successfully.
*/
router.get('/stats', authRequest, reqStatisticsValidation, userGetReqStats);

/**
 * @swagger
 * /requests/{id}:
 *  get:
 *    tags: [Request Accommodation]
 *    summary: Authenticated user can get a request.
 *    description: Request is desplayed from DB.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: request id
 *    responses:
 *      '200':
 *        description: Request is displayed successfuly.
*/
router.get('/:id', authRequest, getOneRequest);

/**
 * @swagger
 * /requests:
 *    post:
 *      tags: [Request Accommodation]
 *      summary: Authenticated user can add arequest in a hotel
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requests'
 *      responses:
 *        "200":
 *          description: Request added successfully!
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
router.post('/', authRequest, createRequestValidation, createRequest);

/**
 * @swagger
 *
 * /requests/{id}:
 *    put:
 *      tags: [Request Accommodation]
 *      summary: User can update a request with status PENDING.
 *      parameters:
 *        - name: id
 *          in: path
 *          description: request ID
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requests'
 *      responses:
 *        "201":
 *          description: Request updated successfully!
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
router.put('/:id', authRequest, updateRequestValidation, updateRequest);

/**
 * @swagger
 * /requests/{id}:
 *   delete:
 *     tags: [Request Accommodation]
 *     summary: Authenticated user can delete request.
 *     description: Authenticated user can delete request from DB.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: request Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Request deleted successfully!
 */
router.delete('/:id', authRequest, deleteRequest);

export default router;
