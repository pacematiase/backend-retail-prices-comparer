import {  Router } from "express";
import { sValidateToken, sValidateRole } from "../shared/auth/service.js";
import { UserRole } from "../shared/enums/userRole.js"
import { cBrandCreate, cBrandFindAll, cBrandFindById, cBrandFindByName, cBrandUpdate, cBrandRemove} from "./controller.js";

const brandRouter = Router();

brandRouter.get('/',sValidateToken ,sValidateRole([UserRole.administrator, UserRole.endUser]) , cBrandFindAll)
brandRouter.get('/:id',sValidateToken ,sValidateRole([UserRole.administrator, UserRole.endUser]) , cBrandFindById)
brandRouter.get('/name/:name',sValidateToken ,sValidateRole([UserRole.administrator, UserRole.endUser]) , cBrandFindByName)
brandRouter.post('/',sValidateToken ,sValidateRole([UserRole.administrator]) , cBrandCreate)
brandRouter.patch('/:id',sValidateToken ,sValidateRole([UserRole.administrator]) , cBrandUpdate)
brandRouter.delete('/:id',sValidateToken ,sValidateRole([UserRole.administrator]) , cBrandRemove)


export default brandRouter


/**
 * @openapi
 * /brand:
 *   get:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Get all brands
 *     responses:
 *       200:
 *         description: List of all brands
 *   post:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Nike
 *     responses:
 *       201:
 *         description: Brand created successfully
 *
 * /brand/{id}:
 *   get:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Get brand by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Brand found
 *   patch:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Update a brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               brandName:
 *                 type: string
 *                 example: Nike
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *   delete:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *
 * /brand/name/{name}:
 *   get:
 *     tags:
 *       - Brand
 *     security:
 *       - bearerAuth: []
 *     summary: Get brand by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: Nike
 *     responses:
 *       200:
 *         description: Brand found
 */