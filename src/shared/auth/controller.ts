import { Request, Response } from 'express';
import { sAuthLogin } from './service.js';

export async function cAuthLogin(req: Request, res: Response) {
  const result = await sAuthLogin({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
