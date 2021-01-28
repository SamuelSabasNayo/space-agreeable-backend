import { Router } from 'express';
import rolesController from '../controllers/role.controller';
import { createRoleValidation, roleAssignValidation, roleUpdateValidation } from '../middlewares/roleValidation';
import superAdminCheck from '../middlewares/superAdmin.check';

const { superAdminAuth } = superAdminCheck;

const roleRoutes = new Router();

/**
 * @swagger
 *  /roles/create:
 *   post:
 *    summary: Super administrator can create new role
 *    tags: [Roles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createRole'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/createRole'
 *    security:
 *      - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "400":
 *        $ref: '#/components/responses/badRequest'
 *      "201":
 *        $ref: '#/components/responses/createSuccess'
 * components:
 *    schemas:
 *     createRole:
 *      type: object
 *      required:
 *       - name
 *       - description
 *      properties:
 *        name:
 *         type: string
 *        description:
 *         type: string
 *    securitySchemes:
 *      AdminToken:
 *        type: apiKey
 *        in: header
 *        name: Authorization
 *    responses:
 *      unauthorized:
 *        description: Token is missing or invalid
 *        headers:
 *         authorization:
 *           schema:
 *             type: string
 *      notFound:
 *        description: Role not found
 *        schema:
 *          type: string
 *      createSuccess:
 *       description: Role created successfully
 *       schema:
 *         type: string
 *      assignSuccess:
 *       description: Role assigned successfully
 *       schema:
 *         type: string
 *      updateSuccess:
 *       description: Role updated successfully
 *       schema:
 *         type: string
 *      deleteSuccess:
 *       description: Role deleted successfully
 *       schema:
 *         type: string
 *      badRequest:
 *       description: ooops! Field can't be empty
 *       schema:
 *         type: string
 *      success:
 *       description: list of saved roles
 *       schema:
 *         type: string
 */
roleRoutes.post('/create', superAdminAuth, createRoleValidation, rolesController.createRole);

/**
 * @swagger
 *  /roles/assign:
 *   post:
 *    summary: Super administrator can assign roles to users
 *    tags: [Roles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/assignRole'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/assignRole'
 *    security:
 *     - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "400":
 *        $ref: '#/components/responses/badRequest'
 *      "200":
 *        $ref: '#/components/responses/assignSuccess'
 * components:
 *    schemas:
 *     assignRole:
 *      type: object
 *      required:
 *       - _userId
 *       - _roleId
 *      properties:
 *        _userId:
 *         type: string
 *        _roleId:
 *         type: string
 */
roleRoutes.post('/assign', superAdminAuth, roleAssignValidation, rolesController.assignRole);

/**
 * @swagger
 *  /roles:
 *   get:
 *    summary: Super administrator can get all roles in the stystem
 *    tags: [Roles]
 *    security:
 *     - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "200":
 *        $ref: '#/components/responses/success'
 */
roleRoutes.get('/', superAdminAuth, rolesController.getRoles);

/**
 * @swagger
 *  /roles/{id}:
 *   get:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: The role id
 *    summary: Super administrator can get single role
 *    tags: [Roles]
 *    security:
 *     - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "200":
 *        $ref: '#/components/responses/success'
 */
roleRoutes.get('/:id', superAdminAuth, rolesController.getRole);

/**
 * @swagger
 *  /roles/{id}:
 *   put:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: The role id
 *    summary: Super administrator can update a given role
 *    tags: [Roles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createRole'
 *        multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/createRole'
 *    security:
 *     - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "400":
 *        $ref: '#/components/responses/badRequest'
 *      "200":
 *        $ref: '#/components/responses/updateSuccess'
 */
roleRoutes.put('/:id', superAdminAuth, roleUpdateValidation, rolesController.updateRole);

/**
 * @swagger
 *  /roles/{id}:
 *   delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: The role id
 *    summary: Super administrator can delete any role
 *    tags: [Roles]
 *    security:
 *     - AdminToken: []
 *    responses:
 *      "403":
 *        $ref: '#/components/responses/unauthorized'
 *      "404":
 *        $ref: '#/components/responses/notFound'
 *      "200":
 *        $ref: '#/components/responses/deleteSuccess'
 */
roleRoutes.delete('/:id', superAdminAuth, rolesController.deleteRole);

export default roleRoutes;
