import { Router } from "express";
import { CreateComment, GetComment,ReplyComment,GetAllComment,DeleteComment } from "../controllers/comment";
import auth from "../middlewares/check-auth";
import { authManager } from '../middlewares/authManager';

const router = Router();

/**
 * @swagger
 * /request/{requestId}/comment:
 *    post:
 *      summary: Write Comments
 *      tags: [Comments]
 *      parameters:
 *        - name: requestId
 *          in: path
 *          type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/comment'
 *      responses:
 *        "201":
 *          description: Comment Created
 *        "500":
 *          description:Error
 *
 * components:
 *    schemas:
 *      comment:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *          comment:
 *            type: string
 */

router.post("/request/:requestId/comment", auth, CreateComment);
/**
 * @swagger
 * /request/{requestId}/comments:
 *    get:
 *      summary: read Comments
 *      tags: [Comments]
 *      parameters:
 *
 *        - name: requestId
 *          in: path
 *          type: string
 *          required: true
 *
 *      responses:
 *        "200":
 *          description: Receive Comments
 *        "500":
 *          description: Error
 */

router.get("/request/:requestId/comments", auth, GetComment);

/**
 * @swagger
 * /request/{requestId}/comment/{commentId}:
 *    delete:
 *      summary: Delete Comment
 *      tags: [Comments]
 *      parameters:
 *        - name: requestId
 *          in: path
 *          type: string
 *          required: true
 *        - name: commentId
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: Delete Comments successfull
 *        "404":
 *          description: No comment with such Id
 */
router.delete("/request/:requestId/comment/:commentId",auth,DeleteComment);
/**
 * @swagger
 * /request/{requestId}/comment/{id}/reply:
 *    post:
 *      summary: Reply Comments
 *      tags: [Comments]
 *      parameters:
 *        - name: requestId
 *          in: path
 *          type: string
 *          required: true
 *        - name: id
 *          in: path
 *          type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/replyContent'
 *      responses:
 *        "201":
 *          description: Comment replied
 *        "500":
 *          description:Error
 *
 * components:
 *    schemas:
 *      replyContent:
 *        type: object
 *        required:
 *          - replyContent
 *        properties:
 *          replyContent:
 *            type: string
 */

router.post("/request/:requestId/comment/:id/reply",auth, authManager, ReplyComment);

/**
 * @swagger
 * /comments:
 *    get:
 *      summary: Get comment as manager
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: Get all Comments successfull
 */
router.get("/comments", authManager, GetAllComment);






export default router;
