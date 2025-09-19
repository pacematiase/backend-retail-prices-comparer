import { Router } from "express";
import { cAuthLogin } from "./controller.js";

const authRouter = Router();

authRouter.post("/login", cAuthLogin);

export default authRouter;

// Swagger documentation

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Get an authentication token
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - userPassword
 *             properties:
 *               userName:
 *                 type: string
 *                 example: admin
 *               userPassword:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Authentication token successfully received
 *       401:
 *         description: Invalid credentials
 */
