import { Router } from "express";
import { sValidateRole, sValidateToken } from "../shared/auth/service.js";
import { UserRole } from "../shared/enums/userRole.js";
import { cShoppingListCreate, cShoppingListDelete, cShoppingListFindAll, cShoppingListFindOneById, cShoppingListUpdate } from "./controller.js";


export const shoppingListRouter = Router();

shoppingListRouter.get('/:user', sValidateToken, sValidateRole([UserRole.administrator, UserRole.endUser]), cShoppingListFindAll)
shoppingListRouter.get('/:id', sValidateToken, sValidateRole([UserRole.administrator, UserRole.endUser]), cShoppingListFindOneById)
shoppingListRouter.post('/', sValidateToken, sValidateRole([UserRole.administrator, UserRole.endUser]), cShoppingListCreate)
shoppingListRouter.patch('/:id', sValidateToken, sValidateRole([UserRole.administrator, UserRole.endUser]), cShoppingListUpdate)
shoppingListRouter.delete('/:id', sValidateToken, sValidateRole([UserRole.administrator, UserRole.endUser]), cShoppingListDelete)

export default shoppingListRouter

// Swagger documentation
/**
 * @openapi
 * /shopping-list:
 *   get:
 *     tags:
 *       - ShoppingList
 *     security:
 *       - bearerAuth: []
 *     summary: Get all shopping lists
 *     responses:
 *       200:
 *         description: List of all shopping lists
 *   post:
 *     tags:
 *       - ShoppingList
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new shopping list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - items
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Weekly Groceries"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Shopping list successfully created
 */

/**
 * @openapi
 * /shopping-list/{id}:
 *   get:
 *     tags:
 *       - ShoppingList
 *     security:
 *       - bearerAuth: []
 *     summary: Get a shopping list by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shopping list
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Found shopping list information
 *   patch:
 *     tags:
 *       - ShoppingList
 *     security:
 *       - bearerAuth: []
 *     summary: Update a shopping list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shopping list
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
 *               name:
 *                 type: string
 *                 example: "Updated Shopping List"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 3
 *                     quantity:
 *                       type: number
 *                       example: 5
 *     responses:
 *       200:
 *         description: Shopping list successfully updated
 *   delete:
 *     tags:
 *       - ShoppingList
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a shopping list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shopping list
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Shopping list successfully deleted
 */
