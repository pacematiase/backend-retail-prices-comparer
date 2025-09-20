import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rRetailProductPriceDelete,
  rRetailProductPriceFindAll,
  rRetailProductPriceFindByCompositeKey,
  rRetailProductPriceFindByRetailId,
  rRetailProductPriceFindByProductId,
  rRetailProductPriceFindByRetailAndProduct,
  rRetailProductPriceFindCurrentPrice,
  rRetailProductPriceInsert,
  rRetailProductPriceUpdate,
} from "./repository.js";
import { rRetailFindOneById } from "../retail/repository.js";
import { rProductFindById } from "../product/repository.js";
import { rRetailProductFindByCompositeKey } from "../retailProduct/repository.js";
import { RetailProductPrice } from "./entity.js";

export async function sRetailProductPriceFindAll(): Promise<
  ControllerResponse<RetailProductPrice[] | null>
> {
  try {
    const retailProductPrices = await rRetailProductPriceFindAll();
    if (retailProductPrices && retailProductPrices.length > 0) {
      return new ControllerResponse(
        200,
        "Retail product prices found",
        "",
        retailProductPrices
      );
    } else {
      return new ControllerResponse(
        404,
        "No retail product prices found",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductPriceFindByCompositeKey(
  retailId: number,
  productId: number,
  dateFrom: Date
): Promise<ControllerResponse<RetailProductPrice | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    const retailProductPrice = await rRetailProductPriceFindByCompositeKey(
      retailId,
      productId,
      dateFrom
    );
    if (retailProductPrice) {
      return new ControllerResponse<RetailProductPrice | null>(
        200,
        "Retail product price found",
        "",
        retailProductPrice
      );
    } else {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Retail product price not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductPriceFindByRetailId(
  retailId: number
): Promise<ControllerResponse<RetailProductPrice[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductPrices = await rRetailProductPriceFindByRetailId(
      retailId
    );
    if (retailProductPrices && retailProductPrices.length > 0) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        200,
        "Retail product prices found",
        "",
        retailProductPrices
      );
    } else {
      return new ControllerResponse<RetailProductPrice[] | null>(
        404,
        "No retail product prices found for this retail",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductPriceFindByProductId(
  productId: number
): Promise<ControllerResponse<RetailProductPrice[] | null>> {
  try {
    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductPrices = await rRetailProductPriceFindByProductId(
      productId
    );
    if (retailProductPrices && retailProductPrices.length > 0) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        200,
        "Retail product prices found",
        "",
        retailProductPrices
      );
    } else {
      return new ControllerResponse<RetailProductPrice[] | null>(
        404,
        "No retail product prices found for this product",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductPriceFindByRetailAndProduct(
  retailId: number,
  productId: number
): Promise<ControllerResponse<RetailProductPrice[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductPrices = await rRetailProductPriceFindByRetailAndProduct(
      retailId,
      productId
    );
    if (retailProductPrices && retailProductPrices.length > 0) {
      return new ControllerResponse<RetailProductPrice[] | null>(
        200,
        "Retail product prices found",
        "",
        retailProductPrices
      );
    } else {
      return new ControllerResponse<RetailProductPrice[] | null>(
        404,
        "No retail product prices found for this retail-product combination",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductPriceFindCurrentPrice(
  retailId: number,
  productId: number,
  currentDate?: Date
): Promise<ControllerResponse<RetailProductPrice | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const currentPrice = await rRetailProductPriceFindCurrentPrice(
      retailId,
      productId,
      currentDate
    );
    if (currentPrice) {
      return new ControllerResponse<RetailProductPrice | null>(
        200,
        "Current price found",
        "",
        currentPrice
      );
    } else {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "No current price found for this retail-product combination",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductPrice | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductPriceInsert(
  retailId: number,
  productId: number,
  dateFrom: Date,
  price: number,
  dateTo?: Date
): Promise<ControllerResponse<RetailProductPrice | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    if (price < 0) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Price must be a non-negative number",
        null,
        null
      );
    }

    if (dateTo && isNaN(dateTo.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date to must be a valid date",
        null,
        null
      );
    }

    if (dateTo && dateTo <= dateFrom) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date to must be after date from",
        null,
        null
      );
    }

    // Check if the retail exists
    const retail = await rRetailFindOneById(retailId);
    if (!retail) {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Retail not found",
        null,
        null
      );
    }

    // Check if the product exists
    const product = await rProductFindById(productId);
    if (!product) {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Product not found",
        null,
        null
      );
    }

    // Check if the retail-product relationship exists
    const retailProduct = await rRetailProductFindByCompositeKey(
      retailId,
      productId
    );
    if (!retailProduct) {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Retail product relationship not found",
        null,
        null
      );
    }

    // Check if the retail-product-price combination already exists
    const existingRetailProductPrice =
      await rRetailProductPriceFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (existingRetailProductPrice) {
      return new ControllerResponse<RetailProductPrice | null>(
        409,
        "Retail product price for this date already exists",
        JSON.stringify(existingRetailProductPrice),
        null
      );
    }

    const newRetailProductPrice = new RetailProductPrice(
      retailId,
      productId,
      dateFrom,
      price,
      dateTo
    );
    const insertResult = await rRetailProductPriceInsert(newRetailProductPrice);

    return new ControllerResponse<RetailProductPrice | null>(
      201,
      "Retail product price created successfully",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<RetailProductPrice | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductPriceUpdate(
  retailId: number,
  productId: number,
  dateFrom: Date,
  price: number,
  dateTo?: Date
): Promise<ControllerResponse<RetailProductPrice | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    if (price < 0) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Price must be a non-negative number",
        null,
        null
      );
    }

    if (dateTo && isNaN(dateTo.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date to must be a valid date",
        null,
        null
      );
    }

    if (dateTo && dateTo <= dateFrom) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date to must be after date from",
        null,
        null
      );
    }

    // Check if the retail-product-price exists
    const existingRetailProductPrice =
      await rRetailProductPriceFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (!existingRetailProductPrice) {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Retail product price not found",
        null,
        null
      );
    }

    await rRetailProductPriceUpdate(
      retailId,
      productId,
      dateFrom,
      price,
      dateTo
    );

    // Return the updated record
    const updatedRetailProductPrice =
      await rRetailProductPriceFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );

    return new ControllerResponse<RetailProductPrice | null>(
      200,
      "Retail product price updated successfully",
      "",
      updatedRetailProductPrice
    );
  } catch (error) {
    return new ControllerResponse<RetailProductPrice | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductPriceDelete(
  retailId: number,
  productId: number,
  dateFrom: Date
): Promise<ControllerResponse<RetailProductPrice | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductPrice | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    const retailProductPrice = await rRetailProductPriceFindByCompositeKey(
      retailId,
      productId,
      dateFrom
    );
    if (!retailProductPrice) {
      return new ControllerResponse<RetailProductPrice | null>(
        404,
        "Retail product price not found",
        null,
        null
      );
    }

    await rRetailProductPriceDelete(retailId, productId, dateFrom);
    return new ControllerResponse(
      200,
      `Retail product price (${retailId}, ${productId}, ${dateFrom.toISOString()}) deleted successfully`,
      "",
      null
    );
  } catch (error) {
    return new ControllerResponse<RetailProductPrice | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
