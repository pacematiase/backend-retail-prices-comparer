import { request, response } from "express";
import {
  sCategoryFindAll,
  sCategoryFindById,
  sCategoryInsert,
  sCategoryRename,
  sCategoryDelete,
} from "./service.js";

export async function cCategoryFindAll(req = request, res = response) {
  const result = await sCategoryFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cCategoryFindById(req = request, res = response) {
  const { id } = req.params;
  const category = await sCategoryFindById(Number(id));
  res.status(category.statusCode).json({
    message: category.message,
    errDetails: category.errDetails,
    data: category.data,
  });
}

export async function cCategoryCreate(req = request, res = response) {
  const { categoryName } = req.body;
  const category = await sCategoryInsert(categoryName);
  res.status(category.statusCode).json({
    message: category.message,
    errDetails: category.errDetails,
    data: category.data,
  });
}

export async function cCategoryUpdate(req = request, res = response) {
  const { id } = req.params;
  const { categoryName } = req.body;
  const updatedCategory = await sCategoryRename(Number(id), categoryName);
  res.status(updatedCategory.statusCode).json({
    message: updatedCategory.message,
    errDetails: updatedCategory.errDetails,
    data: updatedCategory.data,
  });
}

export async function cCategoryDelete(req = request, res = response) {
  const { id } = req.params;
  const result = await sCategoryDelete(Number(id));
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
