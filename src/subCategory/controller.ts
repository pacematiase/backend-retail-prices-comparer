import { Request, Response } from "express";
import {
  sSubCategoryFindAll,
  sSubCategoryFindById,
  sSubCategoryFindByName,
  sSubCategoryInsert,
  sSubCategoryRename,
  sSubCategoryDelete,
} from "./service.js";

export async function cSubCategoryFindAll(req: Request, res: Response) {
  const result = await sSubCategoryFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cSubCategoryFindById(req: Request, res: Response) {
  const subCategoryId: number = parseInt(req.params.subCategoryId);
  const result = await sSubCategoryFindById(subCategoryId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cSubCategoryFindByName(req: Request, res: Response) {
  const { subCategoryName } = req.body;
  const result = await sSubCategoryFindByName(subCategoryName);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cSubCategoryInsert(req: Request, res: Response) {
  const { subCategoryName, categoryId } = req.body;
  const result = await sSubCategoryInsert(subCategoryName, categoryId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cSubCategoryRename(req: Request, res: Response) {
  const subCategoryId: number = parseInt(req.params.subCategoryId);
  const { subCategoryName } = req.body;
  const result = await sSubCategoryRename(subCategoryId, subCategoryName);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cSubCategoryDelete(req: Request, res: Response) {
  const subCategoryId: number = parseInt(req.params.subCategoryId);
  const result = await sSubCategoryDelete(subCategoryId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
