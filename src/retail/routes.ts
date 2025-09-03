import { authMiddleware, AuthRequest } from '../shared/jwt/auth.js';
import { Router } from 'express';
import { add, findAll, findOne, remove, update } from './controller.js';

const retailRouter = Router();

retailRouter.get('/', authMiddleware, findAll);

retailRouter.post('/', authMiddleware, add);

retailRouter.get('/:id', authMiddleware, findOne);

retailRouter.put('/:id', authMiddleware, update);

retailRouter.delete('/:id', authMiddleware, remove);

export default retailRouter;

// Swagger documentation

/**
 * @openapi
 * /retail:
 *   get:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Get all retails
 *     responses:
 *       200:
 *         description: List of all retails
 *   post:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Create a retail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - retailId
 *               - retailName
 *             properties:
 *               retailId:
 *                 type: integer
 *                 example: 1
 *               retailName:
 *                 type: string
 *                 example: Coto
 *     responses:
 *       200:
 *         description: Created retail information
 */

/**
 * @openapi
 * /retail/{id}:
 *   get:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Get one retail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Found retail information
 *   put:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Update a retail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the retail
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
 *               - retailName
 *             properties:
 *               retailName:
 *                 type: string
 *                 example: Coto
 *     responses:
 *       200:
 *         description: Retail was successfully updated
 *   delete:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a retail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the retail
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Retail was successfully deleted
 */
