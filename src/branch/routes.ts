import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { Router } from "express";
import {
  cBranchFindAll,
  cBranchFindById,
  cBranchFindByRetailId,
  cBranchCreate,
  cBranchDelete,
  cBranchUpdate,
} from "./controller.js";
import { UserRole } from "../shared/enums/userRole.js";

const branchRouter = Router();

// Get all branches
branchRouter.get(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cBranchFindAll
);

// Get branches by retail ID
branchRouter.get(
  "/retail/:retailId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cBranchFindByRetailId
);

// Get specific branch by branchId and retailId
branchRouter.get(
  "/:retailId/:branchId",
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cBranchFindById
);

// Create new branch
branchRouter.post(
  "/",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cBranchCreate
);

// Update branch
branchRouter.put(
  "/:retailId/:branchId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cBranchUpdate
);

// Delete branch
branchRouter.delete(
  "/:retailId/:branchId",
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cBranchDelete
);

export default branchRouter;

// Swagger documentation

/**
 * @openapi
 * /branch:
 *   get:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Get all branches
 *     responses:
 *       200:
 *         description: List of all branches
 *   post:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Create a branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - retailId
 *               - branchName
 *             properties:
 *               branchId:
 *                 type: integer
 *                 example: 1
 *                 description: "Branch ID (optional, will be auto-generated starting with 9000000 if not provided)"
 *               retailId:
 *                 type: integer
 *                 example: 1
 *               branchName:
 *                 type: string
 *                 example: "Rosario Echesortu"
 *               branchPostalCode:
 *                 type: string
 *                 example: "2000"
 *               branchCity:
 *                 type: string
 *                 example: "Rosario"
 *               branchAddress:
 *                 type: string
 *                 example: "Mendoza 3891"
 *               branchProvinceCode:
 *                 type: string
 *                 example: "AR-S"
 *     responses:
 *       201:
 *         description: Branch created successfully
 */

/**
 * @openapi
 * /branch/retail/{retailId}:
 *   get:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Get all branches for a specific retail
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
 *         description: List of branches for the retail
 */

/**
 * @openapi
 * /branch/{retailId}/{branchId}:
 *   get:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Get a specific branch
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: ID of the branch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Branch information
 *   put:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Update a branch
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: ID of the branch
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
 *               branchName:
 *                 type: string
 *                 example: "Updated Store Name"
 *               branchPostalCode:
 *                 type: string
 *                 example: "54321"
 *               branchCity:
 *                 type: string
 *                 example: "Los Angeles"
 *               branchAddress:
 *                 type: string
 *                 example: "456 Oak Ave"
 *               branchProvinceCode:
 *                 type: string
 *                 example: "CA"
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *   delete:
 *     tags:
 *       - Branch
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a branch
 *     parameters:
 *       - in: path
 *         name: retailId
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: ID of the branch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
