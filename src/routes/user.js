import express from 'express';
import multer from 'multer';
import profileRouters from './profile';
const router = express.Router();

import {signup, signin, getAllUsers, getUserById, updateUserById, deleteUserById, logout, verifyUser} from '../controllers/user';

import SchemaValidator from '../middlewares/SchemaValidator';

const validateRequest = SchemaValidator(true);


import checkAuthentication from '../middlewares/check-auth';

import superAdminCheck from '../middlewares/superAdmin.check';

const { superAdminAuth } = superAdminCheck;


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './src/uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

/**
 * @swagger
 * /user/signup:
 *     post:
 *      summary: User can signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - firstname
 *          - lastname
 *          - email
 *          - password
 *        properties:
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          telephone:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          roleId:
 *            type: string
 *          gender:
 *            type: string
 *          origin:
 *            type: string
 *          profession:
 *            type: string
 *          age:
 *            type: integer
 *          identification_type:
 *            type: string
 *          identification_number:
 *            type: string
 *          user_image:
 *            type: string
 *            format: binary
 */
router.post('/signup', upload.single('user_image'), validateRequest, signup);

/**
 * @swagger
 * /user/signin:
 *    post:
 *      summary: User can signin
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *      responses:
 *        "201":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      users:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 */
router.post('/signin', validateRequest, signin);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: returns all users
 *     tags: [Users]
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *       500:
 *         description: SERVER ERROR
 */
router.get('/', checkAuthentication, getAllUsers);

/**
 * @swagger
 * /user/{_id}:
 *   get:
 *     summary: Returns a user based on ID
 *     tags: [Users]
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Particular User Object's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A user
 *       500:
 *         description: Server Error
 */
router.get('/:id', checkAuthentication, getUserById);

/**
 * @swagger
 *
 * /user/{id}:
 *    put:
 *      summary: User update based on ID
 *      tags: [Users]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - firstname
 *          - lastname
 *          - email
 *          - password
 *        properties:
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string

 */
router.put('/:id', checkAuthentication, updateUserById);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deletes a user based on ID
 *     tags: [Users]
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', superAdminAuth, deleteUserById);

/**
 * @swagger
 * /user/verification/{token}:
 *   get:
 *     summary: Verify the user email using the token
 *     tags: [Users]
 *     description: Verify the user email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: User's Token
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User successfully verified
 *       404:
 *         description: User does not exist
 */
router.get('/verification/:token', verifyUser);


router.post('/logout', logout);



router.use('/profile', profileRouters)
module.exports = router;
