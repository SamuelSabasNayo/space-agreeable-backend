import { Router } from 'express';
import { authManager } from '../middlewares/authManager';
import { updateRequestValidation } from '../middlewares/requestValidation';
import managerController from '../controllers/managerController';

const router = new Router(),
  {
    getAllRequests,
    getOneRequest,
    addRequest,
    updateRequest,
    assignManagerId
  } = managerController;

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
router.get('/requests', authManager, getAllRequests);

/**
 * @swagger
 * /manager/requests/{id}:
 *  get:
 *    tags: [Manager]
 *    summary: Manager can get one request.
 *    description: Manager can get any request from database.
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
 *        description: Requests are displayed successfuly.
*/
router.get('/requests/:id', authManager, getOneRequest);

/**
 * @swagger
 * /manager/requests:
 *    post:
 *      tags: [Manager]
 *      summary: Manager can add a request.
 *      description: Manager can add a request in database.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/addRequest'
 *      responses:
 *        "200":
 *          description: Request added successfully!
 * components:
 *    schemas:
 *      addRequest:
 *        type: object
 *        required:
 *          - idRoom
 *          - dateStart
 *          - dateEnd
 *        properties:
 *          idRoom:
 *             type: number
 *          dateStart:
 *            type: string
 *          dateEnd:
 *            type: string
 */
router.post('/requests', authManager, addRequest);

/**
 * @swagger
 * /manager/requests/{id}:
 *   put:
 *    tags: [Manager]
 *    summary: Manager can update a request.
 *    description: Manager can update any request from database.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: request id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateRequest'
 *    responses:
 *      '200':
 *        description: Request updated successfully!
 * components:
 *    schemas:
 *      updateRequest:
 *        type: object
 *        required:
 *          - requestStatus
 *        properties:
 *          requestStatus:
 *            type: string
*/
router.put('/requests/:id', authManager, updateRequestValidation, updateRequest);

/**
 * @swagger
 * /manager/assign:
 *    post:
 *      tags: [Manager]
 *      summary: Manager can assign managerId.
 *      description: Manager can assign managerId to the users in database.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/assign'
 *      responses:
 *        "200":
 *          description: Request added successfully!
 * components:
 *    schemas:
 *      assign:
 *        type: object
 *        required:
 *          - _userId
 *          - _managerId
 *        properties:
 *          _userId:
 *             type: number
 *          _managerId:
 *            type: number
 */
router.post('/assign', authManager, assignManagerId);

export default router;
