import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rProductDelete,
  rProductFindAll,
  rProductFindById,
  rProductFindBySKU,
  rProductFindByName,
  rProductInsert,
  rProductUpdate,
} from "./repository.js";
import { rSubCategoryFindById } from "../subCategory/repository.js";
import { Product } from "./entity.js";

export async function sProductFindAll(): Promise<
  ControllerResponse<Product[] | null>
> {
  try {
    const products = await rProductFindAll();
    if (products && products.length > 0) {
      return new ControllerResponse(200, "Products found", "", products);
    } else {
      return new ControllerResponse(404, "No products found", null, []);
    }
  } catch (error) {
    return new ControllerResponse<Product[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sProductFindById(
  id: number
): Promise<ControllerResponse<Product | null>> {
  try {
    if (id < 1) {
      return new ControllerResponse<Product | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const product = await rProductFindById(id);
    if (product) {
      return new ControllerResponse<Product | null>(
        200,
        "Product found",
        "",
        product
      );
    } else {
      return new ControllerResponse<Product | null>(
        404,
        "Product not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sProductFindBySKU(
  sku: string
): Promise<ControllerResponse<Product | null>> {
  try {
    if (!sku || sku.trim() === "") {
      return new ControllerResponse<Product | null>(
        400,
        "Product SKU must not be empty",
        null,
        null
      );
    }

    const product = await rProductFindBySKU(sku);
    if (product) {
      return new ControllerResponse<Product | null>(
        200,
        "Product found",
        "",
        product
      );
    } else {
      return new ControllerResponse<Product | null>(
        404,
        "Product not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sProductFindByName(
  name: string
): Promise<ControllerResponse<Product | null>> {
  try {
    if (!name || name.trim() === "") {
      return new ControllerResponse<Product | null>(
        400,
        "Product name must not be empty",
        null,
        null
      );
    }

    const product = await rProductFindByName(name);
    if (product) {
      return new ControllerResponse<Product | null>(
        200,
        "Product found",
        "",
        product
      );
    } else {
      return new ControllerResponse<Product | null>(
        404,
        "Product not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sProductInsert(
  subCategoryId: number,
  productSKU: string,
  productName: string,
  productCodeBar?: string,
  productImage?: string
): Promise<ControllerResponse<Product | null>> {
  try {
    // Validation
    if (!productSKU || productSKU.trim() === "") {
      return new ControllerResponse<Product | null>(
        400,
        "Product SKU must not be empty",
        null,
        null
      );
    }

    if (!productName || productName.trim() === "") {
      return new ControllerResponse<Product | null>(
        400,
        "Product name must not be empty",
        null,
        null
      );
    }

    if (!subCategoryId || subCategoryId < 1) {
      return new ControllerResponse<Product | null>(
        400,
        "SubCategory ID must be a positive integer",
        null,
        null
      );
    }

    // Check if the subcategory exists
    const subCategory = await rSubCategoryFindById(subCategoryId);
    if (!subCategory) {
      return new ControllerResponse<Product | null>(
        404,
        "SubCategory not found",
        null,
        null
      );
    }

    // Check if SKU already exists
    const existingProductBySKU = await rProductFindBySKU(productSKU);
    if (existingProductBySKU) {
      return new ControllerResponse<Product | null>(
        409,
        "Product SKU already exists",
        JSON.stringify(existingProductBySKU),
        null
      );
    }

    const newProduct = new Product(
      subCategory,
      productSKU,
      productName,
      productCodeBar || "",
      productImage || ""
    );
    const insertResult = await rProductInsert(newProduct);

    return new ControllerResponse<Product | null>(
      201,
      "Product created successfully",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sProductUpdate(
  id: number,
  productData: {
    productSKU?: string;
    productName?: string;
    productCodeBar?: string;
    productImage?: string;
    subCategoryId?: number;
  }
): Promise<ControllerResponse<Product | null>> {
  try {
    if (id < 1) {
      return new ControllerResponse<Product | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    // Check if product exists
    const existingProduct = await rProductFindById(id);
    if (!existingProduct) {
      return new ControllerResponse<Product | null>(
        404,
        "Product not found",
        null,
        null
      );
    }

    // Validate SKU if provided
    if (productData.productSKU !== undefined) {
      if (!productData.productSKU || productData.productSKU.trim() === "") {
        return new ControllerResponse<Product | null>(
          400,
          "Product SKU must not be empty",
          null,
          null
        );
      }

      // Check if SKU already exists (excluding current product)
      const existingProductBySKU = await rProductFindBySKU(
        productData.productSKU
      );
      if (existingProductBySKU && existingProductBySKU.productId !== id) {
        return new ControllerResponse<Product | null>(
          409,
          "Product SKU already exists",
          JSON.stringify(existingProductBySKU),
          null
        );
      }
    }

    // Validate subcategory if provided
    if (productData.subCategoryId !== undefined) {
      if (!productData.subCategoryId || productData.subCategoryId < 1) {
        return new ControllerResponse<Product | null>(
          400,
          "SubCategory ID must be a positive integer",
          null,
          null
        );
      }

      const subCategory = await rSubCategoryFindById(productData.subCategoryId);
      if (!subCategory) {
        return new ControllerResponse<Product | null>(
          404,
          "SubCategory not found",
          null,
          null
        );
      }
    }

    const updateResult = await rProductUpdate(id, productData);
    const updatedProduct = await rProductFindById(id);

    return new ControllerResponse<Product | null>(
      200,
      `Product ${updateResult} updated successfully`,
      "",
      updatedProduct
    );
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sProductDelete(
  id: number
): Promise<ControllerResponse<Product | null>> {
  try {
    if (id < 1) {
      return new ControllerResponse<Product | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const product = await rProductFindById(id);
    if (!product) {
      return new ControllerResponse<Product | null>(
        404,
        "Product not found",
        null,
        null
      );
    }

    await rProductDelete(id);
    return new ControllerResponse(
      200,
      `Product ${id} deleted successfully`,
      "",
      null
    );
  } catch (error) {
    return new ControllerResponse<Product | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
