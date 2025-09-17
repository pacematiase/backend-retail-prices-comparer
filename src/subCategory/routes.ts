import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cSubCategoryFindAll,
  cSubCategoryFindById,
  cSubCategoryFindByName,
  cSubCategoryInsert,
  cSubCategoryRename,
  cSubCategoryDelete,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const subCategoryRouter = Router();

subCategoryRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cSubCategoryFindAll
);

subCategoryRouter.get(
  "/:subCategoryId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cSubCategoryFindById
);

subCategoryRouter.post(
  "/findByName",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cSubCategoryFindByName
);

subCategoryRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cSubCategoryInsert
);

subCategoryRouter.put(
  "/:subCategoryId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cSubCategoryRename
);

subCategoryRouter.delete(
  "/:subCategoryId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cSubCategoryDelete
);

export default subCategoryRouter;

// Swagger documentation

/**
 * @openapi
 * /subCategory:
 *   get:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Get all subcategories
 *     responses:
 *       200:
 *         description: List of all subcategories
 *   post:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Create a subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCategoryName
 *               - categoryId
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Smartphones
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Created subcategory information
 */

/**
 * @openapi
 * /subCategory/findByName:
 *   post:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Find subcategory by name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCategoryName
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Smartphones
 *     responses:
 *       200:
 *         description: Found subcategory information
 */

/**
 * @openapi
 * /subCategory/{subCategoryId}:
 *   get:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Get one subcategory
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Found subcategory information
 *   put:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Update a subcategory
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCategoryName
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Smartphones
 *     responses:
 *       200:
 *         description: SubCategory was successfully updated
 *   delete:
 *     tags:
 *       - SubCategory
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a subcategory
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         description: ID of the subcategory
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: SubCategory was successfully deleted
 */
