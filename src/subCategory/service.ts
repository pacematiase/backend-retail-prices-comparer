import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rSubCategoryDelete,
  rSubCategoryFindAll,
  rSubCategoryFindById,
  rSubCategoryFindByName,
  rSubCategoryInsert,
  rSubCategoryRename,
} from "./repository.js";
import { rCategoryFindById } from "../category/repository.js";
import { SubCategory } from "./entity.js";

export async function sSubCategoryFindAll(): Promise<
  ControllerResponse<SubCategory[] | null>
> {
  try {
    const subCategories = await rSubCategoryFindAll();
    if (subCategories && subCategories.length > 0) {
      return new ControllerResponse(
        200,
        "SubCategories found",
        "",
        subCategories
      );
    } else {
      return new ControllerResponse(404, "No subcategories found", null, []);
    }
  } catch (error) {
    return new ControllerResponse<SubCategory[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sSubCategoryFindById(
  id: number
): Promise<ControllerResponse<SubCategory | null>> {
  try {
    const subCategory = await rSubCategoryFindById(id);
    if (subCategory) {
      return new ControllerResponse<SubCategory | null>(
        200,
        "SubCategory found",
        "",
        subCategory
      );
    } else {
      return new ControllerResponse<SubCategory | null>(
        404,
        "SubCategory not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<SubCategory | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sSubCategoryFindByName(
  name: string
): Promise<ControllerResponse<SubCategory | null>> {
  try {
    const subCategory = await rSubCategoryFindByName(name);
    if (subCategory) {
      return new ControllerResponse<SubCategory | null>(
        200,
        "SubCategory found",
        "",
        subCategory
      );
    } else {
      return new ControllerResponse<SubCategory | null>(
        404,
        "SubCategory not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<SubCategory | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sSubCategoryInsert(
  subCategoryName: string,
  categoryId: number
): Promise<ControllerResponse<SubCategory | null>> {
  try {
    if (!subCategoryName || subCategoryName.trim() === "") {
      return new ControllerResponse<SubCategory | null>(
        400,
        "SubCategory name must not be empty",
        null,
        null
      );
    }

    if (!categoryId || categoryId < 1) {
      return new ControllerResponse<SubCategory | null>(
        400,
        "Category ID must be a positive integer",
        null,
        null
      );
    }

    // Check if the category exists
    const category = await rCategoryFindById(categoryId);
    if (!category) {
      return new ControllerResponse<SubCategory | null>(
        404,
        "Category not found",
        null,
        null
      );
    }

    const existingSubCategory = await rSubCategoryFindByName(subCategoryName);
    if (existingSubCategory) {
      return new ControllerResponse<SubCategory | null>(
        409,
        "SubCategory already exists",
        JSON.stringify(existingSubCategory),
        null
      );
    }

    const newSubCategory = new SubCategory();
    newSubCategory.subCategoryName = subCategoryName;
    newSubCategory.categoryId = category;
    const insertResult = await rSubCategoryInsert(newSubCategory);

    return new ControllerResponse<SubCategory | null>(
      201,
      "SubCategory created",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<SubCategory | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sSubCategoryRename(
  id: number,
  newName: string
): Promise<ControllerResponse<SubCategory | null>> {
  try {
    const subCategory = await rSubCategoryFindById(id);
    if (!subCategory) {
      return new ControllerResponse<SubCategory | null>(
        404,
        "SubCategory not found",
        null,
        null
      );
    }

    const existingSubCategory = await rSubCategoryFindByName(newName);
    if (existingSubCategory) {
      return new ControllerResponse<SubCategory | null>(
        409,
        "SubCategory already exists",
        JSON.stringify(existingSubCategory),
        null
      );
    }

    const updateResult = await rSubCategoryRename(id, newName);
    const updatedSubCategory = await rSubCategoryFindById(id);
    return new ControllerResponse<SubCategory | null>(
      200,
      `SubCategory ${updateResult} renamed`,
      "",
      updatedSubCategory
    );
  } catch (error) {
    return new ControllerResponse<SubCategory | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sSubCategoryDelete(
  id: number
): Promise<ControllerResponse<SubCategory | null>> {
  try {
    const subCategory = await rSubCategoryFindById(id);
    if (!subCategory) {
      return new ControllerResponse<SubCategory | null>(
        404,
        "SubCategory not found",
        null,
        null
      );
    }

    await rSubCategoryDelete(id);
    return new ControllerResponse(200, `SubCategory ${id} deleted`, "", null);
  } catch (error) {
    return new ControllerResponse<SubCategory | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
