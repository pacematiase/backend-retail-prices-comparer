import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cProductFindAll,
  cProductFindById,
  cProductFindBySKU,
  cProductFindByName,
  cProductInsert,
  cProductUpdate,
  cProductDelete,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const productRouter = Router();

productRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cProductFindAll
);

productRouter.get(
  "/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cProductFindById
);

productRouter.post(
  "/findBySKU",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cProductFindBySKU
);

productRouter.post(
  "/findByName",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cProductFindByName
);

productRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cProductInsert
);

productRouter.put(
  "/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cProductUpdate
);

productRouter.delete(
  "/:productId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cProductDelete
);

export default productRouter;

// Swagger documentation

/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of all products
 *   post:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCategoryId
 *               - productSKU
 *               - productName
 *             properties:
 *               subCategoryId:
 *                 type: integer
 *                 example: 1
 *               productSKU:
 *                 type: string
 *                 example: "SKU123456"
 *               productName:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               productCodeBar:
 *                 type: string
 *                 example: "1234567890123"
 *               productImage:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @openapi
 * /product/findBySKU:
 *   post:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Find product by SKU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productSKU
 *             properties:
 *               productSKU:
 *                 type: string
 *                 example: "SKU123456"
 *     responses:
 *       200:
 *         description: Found product information
 */

/**
 * @openapi
 * /product/findByName:
 *   post:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Find product by name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *     responses:
 *       200:
 *         description: Found product information
 */

/**
 * @openapi
 * /product/{productId}:
 *   get:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Get one product
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
 *         description: Found product information
 *   put:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productSKU:
 *                 type: string
 *                 example: "SKU123456"
 *               productName:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               productCodeBar:
 *                 type: string
 *                 example: "1234567890123"
 *               productImage:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               subCategoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product was successfully updated
 *   delete:
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product
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
 *         description: Product was successfully deleted
 */
