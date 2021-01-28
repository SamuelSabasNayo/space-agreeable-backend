/* eslint-disable import/named */
import { Router } from 'express';
import {
  getFacilities, addFacility, updateFacility, deleteFacility, getSingleFacility
} from '../controllers/facilityController';
import { _validateFacility, _authorizeUser } from '../middlewares/FaclityValidation';

const router = Router();

router.get('/', getFacilities);

/**
 * @swagger
 * /facility:
 *   get:
 *     summary: get all facilities
 *     tags: [facility]
 *     description: array of facility
 *     produces:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: Server Error
 */

router.post('/', _validateFacility, _authorizeUser, addFacility);
/**
 * @swagger
 *  /facility:
 *   post:
 *    summary: travel admin can create new role
 *    tags: [facility]
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
 *       - address
 *       - location
 *      properties:
 *        location:
 *         type: string
 *        address:
 *         type: string
 *        roomNumber:
 *         type: number
 *        roomDetails:
 *         type: string
 *        images:
 *         type: string
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
 *       description: facility created successfully
 *       schema:
 *         type: string
 *
 */

router.put('/:id', _validateFacility, _authorizeUser, updateFacility);
/**
 * @swagger
 *  /facility/{id}:
 *   put:
 *    summary: travel admin can create new role
 *    tags: [facility]
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
 *       - address
 *       - location
 *      properties:
 *        location:
 *         type: string
 *        address:
 *         type: string
 *        roomNumber:
 *         type: number
 *        roomDetails:
 *         type: string
 *        images:
 *         type: string
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
 *       description: facility created successfully
 *       schema:
 *         type: string
 *
 */

router.delete('/:id', _validateFacility, _authorizeUser, deleteFacility);
/**
 * @swagger
 *  /facility/{id}:
 *   delete:
 *    summary: travel admin can create new role
 *    tags: [facility]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description:  facility id
 *    security:
 *      - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorizedaccess'
 *      "201":
 *        $ref: '#/components/responses/facilitCreationSuccess'
 * components:
 *    schemas:
 *    securitySchemes:
 *      AdminToken:
 *        type: apiKey
 *        in: header
 *        name: Authorization
 *    responses:
 *      unauthorizedaccess:
 *        description: Not logged in
 *        headers:
 *         authorization:
 *           schema:
 *             type: string
 *      facilitCreationSuccess:
 *       description: facility deleted successfully
 *       schema:
 *         type: string
 *
 */

router.get('/:id', getSingleFacility);
/**
 * @swagger
 * /facility/{id}:
 *   get:
 *     summary: get single facilities
 *     tags: [facility]
 *     description: get a facility
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: integer
 *          minimum: 1
 *         description:  facility id
 *
 *     produces:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: Server Error
 */

export default router;
