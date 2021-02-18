import express from 'express';
const router = express.Router();
import {
    sendFacilityFeedback,
    getByFeedbackId,
    getFeedBacksByFacilityId,
    deleteFeedback,
    updateFeedbackStatus
  }  from'../controllers/facilitiesFeedbackController';
import checkAuthentication from '../middlewares/check-auth';
import { _isFacilityValid } from '../middlewares/FaclityValidation';

/**
 * @swagger
 *
 * /facility/{facilityId}/feedback:
 *    post:
 *      parameters:
 *      - in: path
 *        name: facilityId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: facilityId id
 *      summary: add a feedback
 *      tags: [feedback]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/feedback'
 *      responses:
 *        "201":
 *          description: Article schema
 *        "400":
 *          description:  Bad request
 *        "404":
 *          description: Not found
 *        "401":
 *          description: Access denied
 *        "500":
 *          description: Server error
 * components:
 *    schemas:
 *      feedback:
 *        type: object
 *        required:
 *          - feedback_title
 *          - feedback_content
 *        properties:
 *          feedback_title:
 *            type: string
 *          feedback_content:
 *              type: string
 */

router.post('/:facilityId/feedback', checkAuthentication, _isFacilityValid, sendFacilityFeedback);

/**
 * @swagger
 *  /facility/{facilityId}/feedback/{feedbackId}:
 *   get:
 *    parameters:
 *      - in: path
 *        name: feedbackId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: Feedback id
 *      - in: path
 *        name: facilityId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description:  facility id
 *    summary: Getting feedback by feedback Id
 *    tags: [feedback]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      "404":
 *        description: Not found
 *      "200":
 *        description: Success
 */
router.get('/:facilityId/feedback/:feedbackId', _isFacilityValid, getByFeedbackId);

/**
 * @swagger
 *  /facility/{facilityId}/feedback:
 *   get:
 *    parameters:
 *      - in: path
 *        name: facilityId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: Facility id
 *    summary: Getting feedback by facility Id
 *    tags: [feedback]
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
router.get('/:facilityId/feedback', _isFacilityValid, getFeedBacksByFacilityId);

/**
 * @swagger
 *  /facility/{facilityId}/feedback/{feedbackId}:
 *   delete:
 *    parameters:
 *      - in: path
 *        name: feedbackId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: Feedback id
 *      - in: path
 *        name: facilityId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: facility id
 *    summary: Delete feedback
 *    tags: [feedback]
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
router.delete('/:facilityId/feedback/:feedbackId', checkAuthentication, _isFacilityValid, deleteFeedback);

/**
 * @swagger
 *
 * /facility/{facilityId}/feedback/{feedbackId}:
 *    put:
 *      parameters:
 *      - in: path
 *        name: feedbackId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: feedback id
*      - in: path
 *        name: facilityId
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: facility id
 *      summary: Update a feedback status
 *      tags: [feedback]
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *      responses:
 *        "200":
 *          description: Status updated
 *        "400":
 *          description:  Bad request
 *        "404":
 *          description: Not found
 *        "401":
 *          description: Access denied
 *        "500":
 *          description: Server error
 */
router.put('/:facilityId/feedback/:feedbackId',checkAuthentication, _isFacilityValid, updateFeedbackStatus)

module.exports = router;
