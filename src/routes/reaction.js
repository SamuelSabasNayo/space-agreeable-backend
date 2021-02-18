import { Router } from 'express';
import reactionController from '../controllers/reaction.controller';
import checkAuth from '../middlewares/check-auth';

const reactionRoutes = new Router();

/**
 * @swagger
 *  /facility/like:
 *   post:
 *     summary: User can like on facility
 *     tags: [Reactions]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reaction'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/reaction'
 *     responses:
 *        "201":
 *           $ref: '#/components/responses/success'
 *        "400":
 *           $ref: '#/components/responses/badRequest'
 *        "401":
 *           $ref: '#/components/responses/forbidden'
 *        "500":
 *           $ref: '#/components/responses/serverError'
 * components:
 *    schemas:
 *     reaction:
 *      type: object
 *      required:
 *       - facilityId
 *      properties:
 *        facilityId:
 *         type: number
 *    responses:
 *      forbidden:
 *        description: unauthorized
 *        schema:
 *          type: string
 *      notFound:
 *        description: Facility not found
 *        schema:
 *          type: string
 *      unliked:
 *       description: Facility unliked
 *       schema:
 *         type: string
 *      badRequest:
 *       description: ooops! Field can't be empty
 *       schema:
 *         type: string
 *      serverError:
 *       description: Server error
 *       schema:
 *         type: string
 *      success:
 *       description: facility liked successfully
 *       schema:
 *         type: string
 */
reactionRoutes.post('/like', checkAuth, reactionController.liked);

/**
 * @swagger
 * /facility/unlike:
 *    post:
 *     summary: User can unlike on facility
 *     tags: [Reactions]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reaction'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/reaction'
 *     responses:
 *        "201":
 *           $ref: '#/components/responses/unlike'
 *        "400":
 *           $ref: '#/components/responses/badRequest'
 *        "401":
 *           $ref: '#/components/responses/forbidden'
 *        "500":
 *           $ref: '#/components/responses/serverError'
 */
reactionRoutes.post('/unlike', checkAuth, reactionController.unliked);

export default reactionRoutes;
