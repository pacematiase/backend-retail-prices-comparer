import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cRetailProductPriceFindAll,
  cRetailProductPriceFindByCompositeKey,
  cRetailProductPriceFindByRetailId,
  cRetailProductPriceFindByProductId,
  cRetailProductPriceFindByRetailAndProduct,
  cRetailProductPriceFindCurrentPrice,
  cRetailProductPriceInsert,
  cRetailProductPriceUpdate,
  cRetailProductPriceDelete,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const retailProductPriceRouter = Router();

retailProductPriceRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindAll
);

retailProductPriceRouter.get(
  "/retail/:retailId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindByRetailId
);

retailProductPriceRouter.get(
  "/product/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindByProductId
);

retailProductPriceRouter.get(
  "/retail/:retailId/product/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindByRetailAndProduct
);

retailProductPriceRouter.get(
  "/retail/:retailId/product/:productId/current",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindCurrentPrice
);

retailProductPriceRouter.get(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductPriceFindByCompositeKey
);

retailProductPriceRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductPriceInsert
);

retailProductPriceRouter.put(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductPriceUpdate
);

retailProductPriceRouter.delete(
  "/:retailId/:productId/:dateFrom",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductPriceDelete
);

export default retailProductPriceRouter;

// Swagger documentation

/**
 * @openapi
 * /retailProductPrice:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get all retail product prices
 *     responses:
 *       200:
 *         description: List of all retail product prices
 *   post:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Create a retail product price
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
 *               - price
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
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 29.99
 *               dateTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       201:
 *         description: Retail product price created successfully
 */

/**
 * @openapi
 * /retailProductPrice/retail/{retailId}:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get all prices for a specific retail
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
 *         description: List of prices for the retail
 */

/**
 * @openapi
 * /retailProductPrice/product/{productId}:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get all prices for a specific product
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
 *         description: List of prices for the product
 */

/**
 * @openapi
 * /retailProductPrice/retail/{retailId}/product/{productId}:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get all prices for a specific retail-product combination
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
 *         description: List of prices for the retail-product combination
 */

/**
 * @openapi
 * /retailProductPrice/retail/{retailId}/product/{productId}/current:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get current price for a specific retail-product combination
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
 *         description: Date to check current price (defaults to now)
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-06-15T10:30:00.000Z"
 *     responses:
 *       200:
 *         description: Current price for the retail-product combination
 */

/**
 * @openapi
 * /retailProductPrice/{retailId}/{productId}/{dateFrom}:
 *   get:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Get specific retail product price
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
 *         description: Start date of the price
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Found retail product price
 *   put:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Update a retail product price
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
 *         description: Start date of the price
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
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 29.99
 *               dateTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Retail product price was successfully updated
 *   delete:
 *     tags:
 *       - RetailProductPrice
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a retail product price
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
 *         description: Start date of the price
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Retail product price was successfully deleted
 */
