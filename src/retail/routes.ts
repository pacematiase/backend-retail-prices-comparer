import { authMiddleware, AuthRequest } from '../shared/jwt/auth.js';
import { Router } from 'express';
import { add, findAll, findOne, remove, update } from './controller.js';

const retailRouter = Router();

retailRouter.get('/', authMiddleware, findAll);

retailRouter.get('/:id', authMiddleware, findOne);

retailRouter.post('/', authMiddleware, add);

retailRouter.put('/:id', authMiddleware, update);

retailRouter.delete('/:id', authMiddleware, remove);

export default retailRouter;
