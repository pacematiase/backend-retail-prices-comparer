import { Request, Response } from 'express';
import {
  sUserFindAll,
  sUserFindOneById,
  sUserInsert,
  sUserPatch,
  sUserDelete,
  sUserChangePassword,
} from './service.js';

export async function cUserFindAll(req: Request, res: Response) {
  const result = await sUserFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cUserFindOneById(req: Request, res: Response) {
  const userId: number = parseInt(req.params.userId);
  const result = await sUserFindOneById({ userId: userId });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cUserInsert(req: Request, res: Response) {
  const result = await sUserInsert({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userRole: req.body.userRole,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cUserPatch(req: Request, res: Response) {
  const userId: number = parseInt(req.params.userId);
  const result = await sUserPatch({
    userId: userId,
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userRole: req.body.userRole,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cUserDelete(req: Request, res: Response) {
  const userId: number = parseInt(req.params.userId);
  const result = await sUserDelete({
    userId: userId,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cUserChangePassword(req: Request, res: Response) {
  const userId: number = parseInt(req.userId!);
  const newPassword: string = req.body.newPassword;
  const oldPassword: string = req.body.oldPassword;
  const result = await sUserChangePassword({
    userId: userId,
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
