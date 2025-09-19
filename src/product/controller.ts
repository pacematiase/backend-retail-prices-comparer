import { Request, Response } from "express";
import {
  sProductFindAll,
  sProductFindById,
  sProductFindBySKU,
  sProductFindByName,
  sProductInsert,
  sProductUpdate,
  sProductDelete,
} from "./service.js";

export async function cProductFindAll(req: Request, res: Response) {
  const result = await sProductFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductFindById(req: Request, res: Response) {
  const productId: number = parseInt(req.params.productId);
  const result = await sProductFindById(productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductFindBySKU(req: Request, res: Response) {
  const { productSKU } = req.body;
  const result = await sProductFindBySKU(productSKU);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductFindByName(req: Request, res: Response) {
  const { productName } = req.body;
  const result = await sProductFindByName(productName);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductInsert(req: Request, res: Response) {
  const {
    subCategoryId,
    productSKU,
    productName,
    productCodeBar,
    productImage,
  } = req.body;
  const result = await sProductInsert(
    subCategoryId,
    productSKU,
    productName,
    productCodeBar,
    productImage
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductUpdate(req: Request, res: Response) {
  const productId: number = parseInt(req.params.productId);
  const {
    productSKU,
    productName,
    productCodeBar,
    productImage,
    subCategoryId,
  } = req.body;
  const result = await sProductUpdate(productId, {
    productSKU,
    productName,
    productCodeBar,
    productImage,
    subCategoryId,
  });
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cProductDelete(req: Request, res: Response) {
  const productId: number = parseInt(req.params.productId);
  const result = await sProductDelete(productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
