import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cRetailProductFindAll,
  cRetailProductFindByCompositeKey,
  cRetailProductFindByRetailId,
  cRetailProductFindByProductId,
  cRetailProductInsert,
  cRetailProductDelete,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const retailProductRouter = Router();

retailProductRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductFindAll
);

retailProductRouter.get(
  "/retail/:retailId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductFindByRetailId
);

retailProductRouter.get(
  "/product/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductFindByProductId
);

retailProductRouter.get(
  "/:retailId/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cRetailProductFindByCompositeKey
);

retailProductRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductInsert
);

retailProductRouter.delete(
  "/:retailId/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cRetailProductDelete
);

export default retailProductRouter;

// Swagger documentation

/**
 * @openapi
 * /retailProduct:
 *   get:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Get all retail product relationships
 *     responses:
 *       200:
 *         description: List of all retail product relationships
 *   post:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Create a retail product relationship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - retailId
 *               - productId
 *             properties:
 *               retailId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Retail product relationship created successfully
 */

/**
 * @openapi
 * /retailProduct/retail/{retailId}:
 *   get:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Get all products for a specific retail
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
 *         description: List of products for the retail
 */

/**
 * @openapi
 * /retailProduct/product/{productId}:
 *   get:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Get all retails for a specific product
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
 *         description: List of retails for the product
 */

/**
 * @openapi
 * /retailProduct/{retailId}/{productId}:
 *   get:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Get specific retail product relationship
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
 *         description: Found retail product relationship
 *   delete:
 *     tags:
 *       - RetailProduct
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a retail product relationship
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
 *         description: Retail product relationship was successfully deleted
 */
