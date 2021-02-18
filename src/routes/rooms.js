/* eslint-disable object-curly-newline */
import { Router } from 'express';
import protection from '../middlewares/check-auth';
import roomController from '../controllers/room';

const router = Router();
const { createRoom, getRoom, deleteRoom, updateRoom, getHotelRooms } = roomController;

/**
 * @swagger
 *
 * /hotels/rooms:
 *    post:
 *      summary: add a room
 *      tags: [Rooms]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/room'
 *      responses:
 *        "201":
 *          description: Article schema
 * components:
 *    schemas:
 *      room:
 *        type: object
 *        required:
 *          - roomType
 *          - description
 *          - roomLabel
 *          - hotelId
 *          - status
 *          - price
 *        properties:
 *          roomType:
 *            type: string
 *          description:
 *              type: string
 *          roomLabel:
 *              type: string
 *          hotelId:
 *              type: string
 *          status:
 *              type: string
 *          price:
 *              type: string
 *          roomImage:
 *              type: string
 */
router.post('/hotels/rooms', protection, createRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/:
 *   get:
 *     summary: For getting a single room
 *     tags:
 *       - Rooms
 *     description: Returns a single room
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotelId
 *         description: Id of a particular hotel)
 *         in: path
 *         required: true
 *       - name: roomId
 *         description: Id of a particular room of a specified hotel
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: A single room
 *       500:
 *         description: Server Error
 */
router.get('/hotels/:hotelId/rooms/:roomId', getRoom);

/**
 * @swagger
 *
 * /hotels/{hotelId}/rooms/{id}:
 *    put:
 *      summary: Room update based on ID
 *      tags: [Rooms]
 *      parameters:
 *        - name: hotelId
 *          in: path
 *          description: Hotel id
 *          required: true
 *        - name: id
 *          in: path
 *          description: Room ID
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/room'
 *      responses:
 *        "201":
 *          description: A Room schema
 *
 * components:
 *    schemas:
 *      room:
 *        type: object
 *        required:
 *          - roomType
 *          - description
 *          - roomLabel
 *          - hotelId
 *          - status
 *          - price
 *        properties:
 *          roomType:
 *            type: string
 *          description:
 *            type: string
 *          roomLabel:
 *            type: string
 *          hotelId:
 *            type: integer
 *          status:
 *            type: string
 *          price:
 *            type: string
 *          roomImage:
 *            type: string
 *
 *
 */
router.put('/hotels/:hotelId/rooms/:idroom', updateRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}:
 *   delete:
 *     summary: Deletes a room based on ID
 *     tags:
 *       - Rooms
 *     description: Deletes a single Room
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotelId
 *         description: Hotel id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: roomId
 *         description: room's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/hotels/:hotelId/rooms/:roomId', protection, deleteRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms:
 *   get:
 *     summary: For getting all rooms for a particular hotel
 *     tags:
 *       - Rooms
 *     description: Returns all rooms
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotelId
 *         description: Particular Hotel Object's ID (Automatically assigned by database)
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: All rooms returned
 *       500:
 *         description: Server Error
 */
router.get('/hotels/:hotelId/rooms', getHotelRooms);

export default router;
