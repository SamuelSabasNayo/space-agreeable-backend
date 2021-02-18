/* eslint-disable import/named */
import { Router } from 'express';
import {
  addRating, getRatings
} from '../controllers/ratingsController';
import { validateRatingData } from '../middlewares/ratingValidation';
import validateUser from '../middlewares/check-auth';

const router = Router();

router.get('/:id/ratings', validateUser, validateRatingData, getRatings);

/**
 * @swagger
 * /facility/{id}/ratings:
 *   get:
 *     summary: get ratings based on facility
 *     tags: [Facility Rating]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description:  facility id
 *     security:
 *      - AdminToken: []
 *     description: array of facility
 *     produces:
 *       - application/json
 *     responses:
 *      "401":
 *        $ref: '#/components/responses/unauthorizedAccess'
 *      "200":
 *        $ref: '#/components/responses/createSuccessful'
 * components:
 *    schemas:
 *    securitySchemes:
 *      AdminToken:
 *        type: apiKey
 *        in: header
 *        name: Authorization
 *    responses:
 *      unauthorizedAccess:
 *        description: Not logged in
 *      createSuccessful:
 *       description: Ok
 *       schema:
 *         type: string
 */

router.post('/:id/rate', validateUser, validateRatingData, addRating);
/**
 * @swagger
 *  /facility/{id}/rate:
 *   post:
 *    summary: User is able to rate accomodation
 *    tags: [Facility Rating]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description:  facility id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/facility'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/facility'
 *    security:
 *      - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "201":
 *        $ref: '#/components/responses/createSuccess'
 * components:
 *    schemas:
 *     facility:
 *      type: object
 *      required:
 *       - rating
 *      properties:
 *        rating:
 *         type: number
 *    securitySchemes:
 *      AdminToken:
 *        type: apiKey
 *        in: header
 *        name: Authorization
 *    responses:
 *      unauthorized:
 *        description: Not logged in
 *        headers:
 *         authorization:
 *           schema:
 *             type: string
 *      createSuccess:
 *       description: facility rated successfully
 *       schema:
 *         type: string
 *
 */

export default router;
