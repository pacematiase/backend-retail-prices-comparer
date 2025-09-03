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
 *     responses:
 *       200:
 *         description: Created retail information
 * /retail/{id}:
 *   get:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Get one retail
 *     responses:
 *       200:
 *         description: Found retail information
 *   put:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Update a retail
 *     responses:
 *       200:
 *         description: Found retail information
 *   delete:
 *     tags:
 *       - Retail
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a retail
 *     responses:
 *       200:
 *         description: Found retail information
 */
