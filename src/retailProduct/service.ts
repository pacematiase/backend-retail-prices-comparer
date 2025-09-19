import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rRetailProductDelete,
  rRetailProductFindAll,
  rRetailProductFindByCompositeKey,
  rRetailProductFindByRetailId,
  rRetailProductFindByProductId,
  rRetailProductInsert,
} from "./repository.js";
import { rRetailFindOneById } from "../retail/repository.js";
import { rProductFindById } from "../product/repository.js";
import { RetailProduct } from "./entity.js";

export async function sRetailProductFindAll(): Promise<
  ControllerResponse<RetailProduct[] | null>
> {
  try {
    const retailProducts = await rRetailProductFindAll();
    if (retailProducts && retailProducts.length > 0) {
      return new ControllerResponse(
        200,
        "Retail products found",
        "",
        retailProducts
      );
    } else {
      return new ControllerResponse(404, "No retail products found", null, []);
    }
  } catch (error) {
    return new ControllerResponse<RetailProduct[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductFindByCompositeKey(
  retailId: number,
  productId: number
): Promise<ControllerResponse<RetailProduct | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProduct = await rRetailProductFindByCompositeKey(
      retailId,
      productId
    );
    if (retailProduct) {
      return new ControllerResponse<RetailProduct | null>(
        200,
        "Retail product found",
        "",
        retailProduct
      );
    } else {
      return new ControllerResponse<RetailProduct | null>(
        404,
        "Retail product not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProduct | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductFindByRetailId(
  retailId: number
): Promise<ControllerResponse<RetailProduct[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProduct[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    const retailProducts = await rRetailProductFindByRetailId(retailId);
    if (retailProducts && retailProducts.length > 0) {
      return new ControllerResponse<RetailProduct[] | null>(
        200,
        "Retail products found",
        "",
        retailProducts
      );
    } else {
      return new ControllerResponse<RetailProduct[] | null>(
        404,
        "No retail products found for this retail",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProduct[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductFindByProductId(
  productId: number
): Promise<ControllerResponse<RetailProduct[] | null>> {
  try {
    if (productId < 1) {
      return new ControllerResponse<RetailProduct[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProducts = await rRetailProductFindByProductId(productId);
    if (retailProducts && retailProducts.length > 0) {
      return new ControllerResponse<RetailProduct[] | null>(
        200,
        "Retail products found",
        "",
        retailProducts
      );
    } else {
      return new ControllerResponse<RetailProduct[] | null>(
        404,
        "No retail products found for this product",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProduct[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductInsert(
  retailId: number,
  productId: number
): Promise<ControllerResponse<RetailProduct | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    // Check if the retail exists
    const retail = await rRetailFindOneById(retailId);
    if (!retail) {
      return new ControllerResponse<RetailProduct | null>(
        404,
        "Retail not found",
        null,
        null
      );
    }

    // Check if the product exists
    const product = await rProductFindById(productId);
    if (!product) {
      return new ControllerResponse<RetailProduct | null>(
        404,
        "Product not found",
        null,
        null
      );
    }

    // Check if the retail-product combination already exists
    const existingRetailProduct = await rRetailProductFindByCompositeKey(
      retailId,
      productId
    );
    if (existingRetailProduct) {
      return new ControllerResponse<RetailProduct | null>(
        409,
        "Retail product combination already exists",
        JSON.stringify(existingRetailProduct),
        null
      );
    }

    const newRetailProduct = new RetailProduct(retailId, productId);
    const insertResult = await rRetailProductInsert(newRetailProduct);

    return new ControllerResponse<RetailProduct | null>(
      201,
      "Retail product created successfully",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<RetailProduct | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductDelete(
  retailId: number,
  productId: number
): Promise<ControllerResponse<RetailProduct | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProduct | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProduct = await rRetailProductFindByCompositeKey(
      retailId,
      productId
    );
    if (!retailProduct) {
      return new ControllerResponse<RetailProduct | null>(
        404,
        "Retail product not found",
        null,
        null
      );
    }

    await rRetailProductDelete(retailId, productId);
    return new ControllerResponse(
      200,
      `Retail product (${retailId}, ${productId}) deleted successfully`,
      "",
      null
    );
  } catch (error) {
    return new ControllerResponse<RetailProduct | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
