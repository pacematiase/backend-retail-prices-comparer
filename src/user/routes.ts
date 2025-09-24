// TODO: Change username for self
// TODO: Change password for self
// TODO: Delete self
// TODO: See own user data

import { sValidateToken, sValidateRole } from '../shared/auth/service.js';
import { Router } from 'express';
import {
  cUserFindAll,
  cUserFindOneById,
  cUserInsert,
  cUserPatch,
  cUserDelete,
  cUserChangePassword,
} from './controller.js';
import { UserRole } from '../shared/enums/userRole.js';
import { User } from './entity.js';

const userRouter = Router();

userRouter.get(
  '/',
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cUserFindAll
);

userRouter.get(
  '/:userId',
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cUserFindOneById
);

userRouter.post(
  '/',
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cUserInsert
);

userRouter.put(
  '/:userId',
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cUserPatch
);

userRouter.delete(
  '/:userId',
  sValidateToken,
  sValidateRole([UserRole.administrator]),
  cUserDelete
);

userRouter.post(
  '/changePassword',
  sValidateToken,
  sValidateRole([UserRole.administrator, UserRole.endUser]),
  cUserChangePassword
);

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

/**
 * @openapi
 * /user/changePassword:
 *   post:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     summary: Change self password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password1
 *               newPassword:
 *                 type: string
 *                 example: password2
 *     responses:
 *       200:
 *         description: Password was successfully updated
 */
