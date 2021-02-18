import express from 'express';
import {getUserProfile, udpateProfile}  from '../controllers/profile';
import checkAuthentication from '../middlewares/check-auth';
const router = express.Router();

/**
 * @swagger
 * /user/profile/{userId}:
 *    put:
 *      summary: Updateing user profile
 *      parameters:
 *           - name: userId
 *             in: path
 *             required: true
 *      tags: [Profile]
 *      requestBody:
 *        required: true
 *        content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/profile'
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: Profile updated
 *        "400": 
 *          description: Bad request
 *        "404":
 *          description: Not found
 *        "401":
 *          description: Unauthorized
 *
 * components:
 *    schemas:
 *      profile:
 *        type: object
 *       
 *        properties:
 *          firstname:
 *            type: object
 *            properties:
 *               value: 
 *                  type: string
 *               save: 
 *                  type: boolean
 *          lastname:
 *            type: object
 *            properties:
 *                value: 
 *                   type: string
 *                save:
 *                    type: boolean
 *          gender:
 *            type: object
 *            properties:
 *                value: 
 *                   type: string
 *                   enum: ["Male", "Female"]
 *                save:
 *                    type: boolean
 *          origin:
 *            type: object
 *            properties:
 *                value: 
 *                   type: string
 *                save:
 *                    type: boolean
 *          age:
 *            type: object
 *            properties:
 *                value: 
 *                   type: integer
 *                save:
 *                    type: boolean
 *          identification_type:
 *            type: object
 *            properties:
 *                value: 
 *                   type: string
 *                save:
 *                    type: boolean
 *          identification_number:
 *            type: object
 *            properties:
 *                value: 
 *                   type: string
 *                save:
 *                    type: boolean
 */

router.put('/:userId',checkAuthentication,udpateProfile);

/**
 * @swagger
 *  /user/profile/{userId}:
 *   get:
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: The user id
 *    summary: Getting the user profile
 *    tags: [Profile]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      "401":
 *        description: Unauthorized
 *      "404":
 *        description: Not found
 *      "200":
 *        description: Success
 */
router.get('/:userId', getUserProfile);
module.exports = router;
