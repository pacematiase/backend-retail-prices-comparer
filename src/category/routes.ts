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

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
categoryRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cCategoryFindAll
);

categoryRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryCreate
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Get a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: The category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *   put:
 *     tags: [Category]
 *     summary: Update a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
categoryRouter.get(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cCategoryFindById
);

categoryRouter.put(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryUpdate
);

categoryRouter.delete(
  "/:id",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cCategoryDelete
);

export default categoryRouter;
