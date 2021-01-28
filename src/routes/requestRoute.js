const controller = require('../controllers/requestController');
const { Router } = require('express');
import authRequest from "../middlewares/check-auth";


const router = Router();

const createR = controller.createRequest;
const updateR = controller.updateRequest; 
const deleteR = controller.deleteRequest;
const getR = controller.getAllRequests;


/**
 * @swagger
 * /Request:
 *    post:
 *      tags: [REQUESTING ACCOMMODATION]
 *      summary: Authenticated user can request an accommodation in a hotel
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requests'
 *      responses:
 *        "200":
 *          description: A request schema
 *
 * components:
 *    schemas:
 *      requests:
 *        type: object
 *        required:
 *          - dateStart
 *          - dateEnd
 *          - idRoom
 * 
 *        properties:
 *          dateStart:
 *            type: string
 *          dateEnd:
 *            type: string
 *          idRoom:
 *             type: number
 */
router.post('/', authRequest, createR);
// router.post('/', authRequest, createRequest,createR);


/**
 * @swagger
 * /Request:
 *  get:
 *    tags: [REQUESTING ACCOMMODATION]
 *    summary: Authenticated user can retrieve all requests from database
 *    description: Requests are desplayed from DB
 *    responses:
 *      '200':
 *        description: Requests are displayed succesffuly.
 *      
*/
router.get('/', authRequest, getR);

/**
 * @swagger
 * /Request/{id}:
 *   delete:
 *     summary: Deletes a request based on ID
 *     tags: [REQUESTING ACCOMMODATION] 
 *     description: Deletes a single request
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Request's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:idRequest', authRequest, deleteR);


/**
 * @swagger
 *
 * /Request/{id}:
 *    put:
 *      summary: Update a request based on ID
 *      tags: [REQUESTING ACCOMMODATION]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Request ID
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requests'
 *      responses:
 *        "201":
 *          description: A request schema
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
 *       
 *          dateStart:
 *            type: string
 *          dateEnd:
 *            type: string
 *          idRoom:
 *             type: number
 *
 */
router.put('/:idRequest', authRequest,updateR);

module.exports = router;


