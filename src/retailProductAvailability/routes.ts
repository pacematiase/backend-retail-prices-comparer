import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cRetailProductAvailabilityFindAll,
  cRetailProductAvailabilityFindByCompositeKey,
  cRetailProductAvailabilityFindByRetailId,
  cRetailProductAvailabilityFindByProductId,
  cRetailProductAvailabilityFindByRetailAndProduct,
  cRetailProductAvailabilityFindCurrentAvailability,
  cRetailProductAvailabilityFindAvailableInRange,
  cRetailProductAvailabilityInsert,
  cRetailProductAvailabilityUpdate,
  cRetailProductAvailabilityDelete,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const retailProductAvailabilityRouter = Router();

retailProductAvailabilityRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindAll
);

retailProductAvailabilityRouter.get(
  "/retail/:retailId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindByRetailId
);

retailProductAvailabilityRouter.get(
  "/product/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindByProductId
);

retailProductAvailabilityRouter.get(
  "/retail/:retailId/product/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindByRetailAndProduct
);

retailProductAvailabilityRouter.get(
  "/retail/:retailId/product/:productId/current",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindCurrentAvailability
);

retailProductAvailabilityRouter.get(
  "/retail/:retailId/product/:productId/range",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindAvailableInRange
);

retailProductAvailabilityRouter.get(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductAvailabilityFindByCompositeKey
);

retailProductAvailabilityRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductAvailabilityInsert
);

retailProductAvailabilityRouter.put(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductAvailabilityUpdate
);

retailProductAvailabilityRouter.delete(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductAvailabilityDelete
);

export default retailProductAvailabilityRouter;

// Swagger documentation

/**
 * @openapi
 * /retailProductAvailability:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get all retail product availabilities
 *     responses:
 *       200:
 *         description: List of all retail product availabilities
 *   post:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Create a retail product availability
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - retailId
 *               - productId
 *               - dateFrom
 *             properties:
 *               retailId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 1
 *               dateFrom:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00.000Z"
 *               dateTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       201:
 *         description: Retail product availability created successfully
 */

/**
 * @openapi
 * /retailProductAvailability/retail/{retailId}:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get all availabilities for a specific retail
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of availabilities for the retail
 */

/**
 * @openapi
 * /retailProductAvailability/product/{productId}:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get all availabilities for a specific product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of availabilities for the product
 */

/**
 * @openapi
 * /retailProductAvailability/retail/{retailId}/product/{productId}:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get all availabilities for a specific retail-product combination
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of availabilities for the retail-product combination
 */

/**
 * @openapi
 * /retailProductAvailability/retail/{retailId}/product/{productId}/current:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get current availability for a specific retail-product combination
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: date
 *         required: false
 *         description: Date to check current availability (defaults to now)
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-06-15T10:30:00.000Z"
 *     responses:
 *       200:
 *         description: Current availability for the retail-product combination
 */

/**
 * @openapi
 * /retailProductAvailability/retail/{retailId}/product/{productId}/range:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get availabilities for a specific retail-product combination within a date range
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date of the range
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: End date of the range
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Availabilities found for the specified range
 */

/**
 * @openapi
 * /retailProductAvailability/{retailId}/{productId}/{dateFrom}:
 *   get:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Get specific retail product availability
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: dateFrom
 *         required: true
 *         description: Start date of the availability
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Found retail product availability
 *   put:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Update a retail product availability
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: dateFrom
 *         required: true
 *         description: Start date of the availability
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Retail product availability was successfully updated
 *   delete:
 *     tags:
 *       - RetailProductAvailability
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a retail product availability
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: dateFrom
 *         required: true
 *         description: Start date of the availability
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Retail product availability was successfully deleted
 */
