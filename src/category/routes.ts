import { sValidateToken, sValidateRole } from "../shared/auth/service.js";

import { Router } from "express";
import {
  cCategoryFindAll,
  cCategoryFindById,
  cCategoryCreate,
  cCategoryDelete,
  cCategoryUpdate,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const categoryRouter = Router();

categoryRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cCategoryFindAll
);

categoryRouter.get(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cCategoryFindById
);

categoryRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryCreate
);

categoryRouter.delete(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryDelete
);

categoryRouter.put(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryUpdate
);

export default categoryRouter;

// Swagger documentation

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of all categories
 *   post:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Create a category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Created category information
 */

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get one category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Found category information
 *   put:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
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
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category was successfully updated
 *   delete:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category was successfully deleted
 */
