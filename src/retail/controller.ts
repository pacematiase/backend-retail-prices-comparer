import { Request, Response } from 'express';
import {
  sRetailFindAll,
  sRetailFindOneById,
  sRetailInsert,
  sRetailRename,
  sRetailDelete,
} from './service.js';

export async function cRetailFindAll(req: Request, res: Response) {
  const result = await sRetailFindAll();
  res
    .status(result.statusCode)
    .json({
      message: result.message,
      errDetails: result.errDetails,
      data: result.data,
    });
}

export async function cRetailFindOneById(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailFindOneById({ retailId: retailId });
  res
    .status(result.statusCode)
    .json({
      message: result.message,
      errDetails: result.errDetails,
      data: result.data,
    });
}

export async function cRetailInsert(req: Request, res: Response) {
  const result = await sRetailInsert({ retailName: req.body.retailName });
  res
    .status(result.statusCode)
    .json({
      message: result.message,
      errDetails: result.errDetails,
      data: result.data,
    });
}

export async function cRetailRename(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailRename({
    retailId: retailId,
    retailName: req.body.retailName,
  });
  res
    .status(result.statusCode)
    .json({
      message: result.message,
      errDetails: result.errDetails,
      data: result.data,
    });
}

export async function cRetailDelete(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailDelete({
    retailId: retailId,
  });
  res
    .status(result.statusCode)
    .json({
      message: result.message,
      errDetails: result.errDetails,
      data: result.data,
    });
}
