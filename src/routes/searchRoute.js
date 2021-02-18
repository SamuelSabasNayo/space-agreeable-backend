import { Router } from "express";
import {searchRequest,managerSearchRequestForRequester,managerSearchRequestForOwnRequest } from "../controllers/searchController";
import auth from "../middlewares/check-auth";
import { authManager } from '../middlewares/authManager';

const router = Router();

/**
 * @swagger
 * /requests/search:
 *    get:
 *      summary: Search own requests as requester
 *      tags: [Search]
 *      parameters:
 *        - in: query
 *          name: idRoom
 *          schema:
 *            type: integer
 *          description: id for room
 *        - in: query
 *          name: dateStart
 *          schema:
 *            type: date
 *          description: checkin date
 *        - in: query
 *          name: dateEnd
 *          schema:
 *            type: date
 *          description: checkout date 
 *        - in: query
 *          name: requestStatus
 *          schema:
 *            type: string
 *          description: request status
 *      responses:
 *        "200":
 *          description: search successfull
 */
router.get("/request/search",auth,searchRequest);

/**
 * @swagger
 * /requests/search/requester:
 *    get:
 *      summary: Search requests as manager
 *      tags: [Search]
 *      parameters:
 *        - in: query
 *          name: idRoom
 *          schema:
 *            type: integer
 *          description: id for room
 *        - in: query
 *          name: dateStart
 *          schema:
 *            type: date
 *          description: checkin date
 *        - in: query
 *          name: dateEnd
 *          schema:
 *            type: date
 *          description: checkout date 
 *        - in: query
 *          name: requestStatus
 *          schema:
 *            type: string
 *          description: request status
 *      responses:
 *        "200":
 *          description: search successfull
 */
router.get("/request/search/requester",auth, authManager, managerSearchRequestForRequester);

/**
 * @swagger
 * /requests/search/manager:
 *    get:
 *      summary: Search own requests as manager
 *      tags: [Search]
 *      parameters:
 *        - in: query
 *          name: idRoom
 *          schema:
 *            type: integer
 *          description: id for room
 *        - in: query
 *          name: dateStart
 *          schema:
 *            type: date
 *          description: checkin date
 *        - in: query
 *          name: dateEnd
 *          schema:
 *            type: date
 *          description: checkout date 
 *        - in: query
 *          name: requestStatus
 *          schema:
 *            type: string
 *          description: request status
 *      responses:
 *        "200":
 *          description: search successfull
 */
router.get("/request/search/manager",auth, authManager, searchRequest);

export default router;