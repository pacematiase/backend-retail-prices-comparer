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
  res.json({
    message: "Categories retrieved successfully",
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cCategoryFindById(req = request, res = response) {
  const { id } = req.params;
  const category = await sCategoryFindById(Number(id));
  if (!category) return res.sendStatus(404);
  res.json({
    message: "Category retrieved successfully",
    errDetails: category.errDetails,
    data: category.data,
  });
}

export async function cCategoryCreate(req = request, res = response) {
  const category = await sCategoryInsert(req.body);
  res.json({
    message: "Category created successfully",
    errDetails: category.errDetails,
    data: category.data,
  });
}

export async function cCategoryUpdate(req = request, res = response) {
  const { id } = req.params;
  const updatedCategory = await sCategoryRename(Number(id), req.body);
  res.json({
    message: "Category updated successfully",
    errDetails: updatedCategory.errDetails,
    data: updatedCategory.data,
  });
}

export async function cCategoryDelete(req = request, res = response) {
  const { id } = req.params;
  const response = await sCategoryDelete(Number(id));
  res.json({
    message: "Category deleted successfully",
    errDetails: response.errDetails,
    data: response.data,
  });
}
