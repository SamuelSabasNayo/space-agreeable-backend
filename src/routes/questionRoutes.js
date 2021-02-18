import { Router } from 'express';
import { createQuestionValidation } from '../middlewares/questionValidation';
import questionController from '../controllers/questionController';
import auth from '../middlewares/check-auth';

const router = new Router(),
  {
    getAllQuestions,
    getOneQuestion,
    addQuestion,
    deleteQuestion
  } = questionController;

/**
 * @swagger
 * /questions:
 *  get:
 *    tags: [Questions]
 *    summary: Any user can read FAQ.
 *    description: Any user can read FAQ from database.
 *    responses:
 *      '200':
 *        description: Questions are displayed successfuly.
*/
router.get('/', getAllQuestions);

/**
 * @swagger
 * /questions/{id}:
 *  get:
 *    tags: [Questions]
 *    summary: Any user can read FAQ.
 *    description: Any user can read FAQ from database.
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
 *        description: Questions are displayed successfuly.
*/
router.get('/:id', getOneQuestion);

/**
 * @swagger
 * /questions:
 *    post:
 *      tags: [Questions]
 *      summary: Any user can add/contact his/her question.
 *      description: Any user can add/contact his/her question in database.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/addQuestion'
 *      responses:
 *        "200":
 *          description: Request added successfully!
 * components:
 *    schemas:
 *      addQuestion:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - subject
 *          - message
 *        properties:
 *          name:
 *             type: string
 *          email:
 *             type: string
 *          subject:
 *            type: string
 *          message:
 *            type: string
 */
router.post('/', createQuestionValidation, addQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Super Admin can delete request.
 *     description: Super Admin can delete request from DB.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: request Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Request deleted successfully!
 */
router.delete('/:id', auth, deleteQuestion);

export default router;
