import { authMiddleware } from '../shared/auth/service.js';
import { Router } from 'express';
import {
  cUserFindAll,
  cUserFindOneById,
  cUserInsert,
  cUserPatch,
  cUserDelete,
} from './controller.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, cUserFindAll);

userRouter.get('/:userId', authMiddleware, cUserFindOneById);

userRouter.post('/', authMiddleware, cUserInsert);

userRouter.put('/:userId', authMiddleware, cUserPatch);

userRouter.delete('/:userId', authMiddleware, cUserDelete);

export default userRouter;

// Swagger documentation

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 *   post:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - userPassword
 *               - userRole
 *             properties:
 *               userName:
 *                 type: string
 *                 example: user1
 *               userPassword:
 *                 type: string
 *                 example: password1
 *               userRole:
 *                 type: number
 *                 enum: [1, 2]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Created user
 */

/**
 * @openapi
 * /user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Found user information
 *   put:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
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
 *               userName:
 *                 type: string
 *                 example: user1
 *               userPassword:
 *                 type: string
 *                 example: password1
 *               userRole:
 *                 type: number
 *                 enum: [1, 2]
 *                 example: 1
 *     responses:
 *       200:
 *         description: User was successfully updated
 *   delete:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User was successfully deleted
 */
