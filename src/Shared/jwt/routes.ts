import { Router } from 'express';
import { generateToken } from './controller.js';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { userName, password } = req.body;

  //  Replace with call to users controller.
  if (userName === 'test@example.com' && password === 'password123') {
    const token = generateToken({
      userId: '123',
      userRole: 'toBeReplacedWithActualRole',
    });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

export default authRouter;
