import { Router } from 'express';
import requestController from '../controllers/requestController';
import protection from '../middlewares/check-auth';

const router = Router();

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
// router.post('/',protection,createR);
router.post('/', requestController.createRequest);


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
// router.get('/',protection,getR);
// router.get('/', protection.authUser, requestController.getAllRequests);
router.get('/', requestController.getAllRequests);

/**
 * @swagger
 * /Request:
 *    delete:
 *      tags: [REQUESTING ACCOMMODATION]
 *      summary: Authenticated user can delete an accommodation request  
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
 *          - idRequest
 * 
 *        properties:
 *          idRequest:
 *             type: number
 */
// router.delete('/:idRequest',protection,deleteR);
router.delete('/:idRequest', requestController.deleteRequest);

/**
 * @swagger
 * /Request:
 *    put:
 *      tags: [REQUESTING ACCOMMODATION]
 *      summary: Authenticated user can update an accommodation request  
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
 *          - idRequest
 *          - dateStart
 *          - dateEnd
 *          - idRoom
 * 
 *        properties:
 *          idRequest:
 *             type: number
 *          dateStart:
 *            type: string
 *          dateEnd:
 *            type: string
 *          idRoom:
 *             type: number
 */
// router.put('/:idRequest',protection,updateR);
// router.put('/:idRequest', protection.authUser, requestController.updateRequest);

export default router;
