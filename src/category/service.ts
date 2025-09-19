import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rCategoryDelete,
  rCategoryFindAll,
  rCategoryFindById,
  rCategoryFindByName,
  rCategoryInsert,
  rCategoryRename,
} from "./repository.js";
import { Category } from "./entity.js";

export async function sCategoryFindAll(): Promise<
  ControllerResponse<Category[] | null>
> {
  try {
    const categories = await rCategoryFindAll();
    if (categories && categories.length > 0) {
      return new ControllerResponse(200, "Categories found", "", categories);
    } else {
      return new ControllerResponse(404, "No categories found", null, []);
    }
  } catch (error) {
    return new ControllerResponse<Category[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}
export async function sCategoryFindById(
  id: number
): Promise<ControllerResponse<Category | null>> {
  try {
    const category = await rCategoryFindById(id);
    if (category) {
      return new ControllerResponse<Category | null>(
        200,
        "Category found",
        "",
        category
      );
    } else {
      return new ControllerResponse<Category | null>(
        404,
        "Category not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Category | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sCategoryFindByName(
  name: string
): Promise<ControllerResponse<Category | null>> {
  try {
    const category = await rCategoryFindByName(name);
    if (category) {
      return new ControllerResponse<Category | null>(
        200,
        "Category found",
        "",
        category
      );
    } else {
      return new ControllerResponse<Category | null>(
        404,
        "Category not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Category | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sCategoryInsert(
  categoryName: string
): Promise<ControllerResponse<Category | null>> {
  try {
    if (!categoryName || categoryName.trim() === "") {
      return new ControllerResponse<Category | null>(
        400,
        "Category must not be empty",
        null,
        null
      );
    }

    const existingCategory = await rCategoryFindByName(categoryName);
    if (existingCategory) {
      return new ControllerResponse<Category | null>(
        409,
        "Category already exists",
        JSON.stringify(existingCategory),
        null
      );
    }

    const newCategory = new Category();
    newCategory.categoryName = categoryName;
    const insertResult = await rCategoryInsert(newCategory);

    return new ControllerResponse<Category | null>(
      201,
      "Category created",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<Category | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sCategoryRename(
  id: number,
  newName: string
): Promise<ControllerResponse<Category | null>> {
  try {
    const category = await rCategoryFindById(id);
    if (!category) {
      return new ControllerResponse<Category | null>(
        404,
        "Category not found",
        null,
        null
      );
    }

    const existingCategory = await rCategoryFindByName(newName);
    if (existingCategory) {
      return new ControllerResponse<Category | null>(
        409,
        "Category already exists",
        JSON.stringify(existingCategory),
        null
      );
    }

    const updateResult = await rCategoryRename(id, newName);
    const updatedCategory = await rCategoryFindById(id);
    return new ControllerResponse<Category | null>(
      200,
      `Category ${updateResult} renamed`,
      "",
      updatedCategory
    );
  } catch (error) {
    return new ControllerResponse<Category | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sCategoryDelete(
  id: number
): Promise<ControllerResponse<Category | null>> {
  try {
    const category = await rCategoryFindById(id);
    if (!category) {
      return new ControllerResponse<Category | null>(
        404,
        "Category not found",
        null,
        null
      );
    }

    await rCategoryDelete(id);
    return new ControllerResponse(200, `Category ${id} deleted`, "", null);
  } catch (error) {
    return new ControllerResponse<Category | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
