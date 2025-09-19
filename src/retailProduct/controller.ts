import { Request, Response } from "express";
import {
  sRetailProductFindAll,
  sRetailProductFindByCompositeKey,
  sRetailProductFindByRetailId,
  sRetailProductFindByProductId,
  sRetailProductInsert,
  sRetailProductDelete,
} from "./service.js";

export async function cRetailProductFindAll(req: Request, res: Response) {
  const result = await sRetailProductFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductFindByCompositeKey(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductFindByCompositeKey(retailId, productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductFindByRetailId(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailProductFindByRetailId(retailId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductFindByProductId(
  req: Request,
  res: Response
) {
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductFindByProductId(productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductInsert(req: Request, res: Response) {
  const { retailId, productId } = req.body;
  const result = await sRetailProductInsert(retailId, productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductDelete(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductDelete(retailId, productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
