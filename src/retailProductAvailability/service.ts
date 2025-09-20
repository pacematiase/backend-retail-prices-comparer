import { ControllerResponse } from "../shared/classes/controllerResponse.js";
import {
  rRetailProductAvailabilityDelete,
  rRetailProductAvailabilityFindAll,
  rRetailProductAvailabilityFindByCompositeKey,
  rRetailProductAvailabilityFindByRetailId,
  rRetailProductAvailabilityFindByProductId,
  rRetailProductAvailabilityFindByRetailAndProduct,
  rRetailProductAvailabilityFindCurrentAvailability,
  rRetailProductAvailabilityFindAvailableInRange,
  rRetailProductAvailabilityInsert,
  rRetailProductAvailabilityUpdate,
} from "./repository.js";
import { rRetailFindOneById } from "../retail/repository.js";
import { rProductFindById } from "../product/repository.js";
import { rRetailProductFindByCompositeKey } from "../retailProduct/repository.js";
import { RetailProductAvailability } from "./entity.js";

export async function sRetailProductAvailabilityFindAll(): Promise<
  ControllerResponse<RetailProductAvailability[] | null>
> {
  try {
    const retailProductAvailabilities =
      await rRetailProductAvailabilityFindAll();
    if (retailProductAvailabilities && retailProductAvailabilities.length > 0) {
      return new ControllerResponse(
        200,
        "Retail product availabilities found",
        "",
        retailProductAvailabilities
      );
    } else {
      return new ControllerResponse(
        404,
        "No retail product availabilities found",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability[]>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductAvailabilityFindByCompositeKey(
  retailId: number,
  productId: number,
  dateFrom: Date
): Promise<ControllerResponse<RetailProductAvailability | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    const retailProductAvailability =
      await rRetailProductAvailabilityFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (retailProductAvailability) {
      return new ControllerResponse<RetailProductAvailability | null>(
        200,
        "Retail product availability found",
        "",
        retailProductAvailability
      );
    } else {
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "Retail product availability not found",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductAvailabilityFindByRetailId(
  retailId: number
): Promise<ControllerResponse<RetailProductAvailability[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductAvailabilities =
      await rRetailProductAvailabilityFindByRetailId(retailId);
    if (retailProductAvailabilities && retailProductAvailabilities.length > 0) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        200,
        "Retail product availabilities found",
        "",
        retailProductAvailabilities
      );
    } else {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        404,
        "No retail product availabilities found for this retail",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductAvailabilityFindByProductId(
  productId: number
): Promise<ControllerResponse<RetailProductAvailability[] | null>> {
  try {
    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductAvailabilities =
      await rRetailProductAvailabilityFindByProductId(productId);
    if (retailProductAvailabilities && retailProductAvailabilities.length > 0) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        200,
        "Retail product availabilities found",
        "",
        retailProductAvailabilities
      );
    } else {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        404,
        "No retail product availabilities found for this product",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductAvailabilityFindByRetailAndProduct(
  retailId: number,
  productId: number
): Promise<ControllerResponse<RetailProductAvailability[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const retailProductAvailabilities =
      await rRetailProductAvailabilityFindByRetailAndProduct(
        retailId,
        productId
      );
    if (retailProductAvailabilities && retailProductAvailabilities.length > 0) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        200,
        "Retail product availabilities found",
        "",
        retailProductAvailabilities
      );
    } else {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        404,
        "No retail product availabilities found for this retail-product combination",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductAvailabilityFindCurrentAvailability(
  retailId: number,
  productId: number,
  currentDate?: Date
): Promise<ControllerResponse<RetailProductAvailability | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    const currentAvailability =
      await rRetailProductAvailabilityFindCurrentAvailability(
        retailId,
        productId,
        currentDate
      );
    if (currentAvailability) {
      return new ControllerResponse<RetailProductAvailability | null>(
        200,
        "Current availability found",
        "",
        currentAvailability
      );
    } else {
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "No current availability found for this retail-product combination",
        null,
        null
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductAvailabilityFindAvailableInRange(
  retailId: number,
  productId: number,
  startDate: Date,
  endDate: Date
): Promise<ControllerResponse<RetailProductAvailability[] | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!startDate || isNaN(startDate.getTime())) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "Start date must be a valid date",
        null,
        null
      );
    }

    if (!endDate || isNaN(endDate.getTime())) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "End date must be a valid date",
        null,
        null
      );
    }

    if (endDate <= startDate) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        400,
        "End date must be after start date",
        null,
        null
      );
    }

    const availabilities = await rRetailProductAvailabilityFindAvailableInRange(
      retailId,
      productId,
      startDate,
      endDate
    );
    if (availabilities && availabilities.length > 0) {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        200,
        "Availabilities found for the specified range",
        "",
        availabilities
      );
    } else {
      return new ControllerResponse<RetailProductAvailability[] | null>(
        404,
        "No availabilities found for the specified range",
        null,
        []
      );
    }
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability[] | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      []
    );
  }
}

export async function sRetailProductAvailabilityInsert(
  retailId: number,
  productId: number,
  dateFrom: Date,
  dateTo?: Date
): Promise<ControllerResponse<RetailProductAvailability | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    if (dateTo && isNaN(dateTo.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date to must be a valid date",
        null,
        null
      );
    }

    if (dateTo && dateTo <= dateFrom) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date to must be after date from",
        null,
        null
      );
    }

    // Check if the retail exists
    const retail = await rRetailFindOneById(retailId);
    if (!retail) {
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "Retail not found",
        null,
        null
      );
    }

    // Check if the product exists
    const product = await rProductFindById(productId);
    if (!product) {
      return new ControllerResponse<RetailProductAvailability | null>(
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
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "Retail product relationship not found",
        null,
        null
      );
    }

    // Check if the retail-product-availability combination already exists
    const existingRetailProductAvailability =
      await rRetailProductAvailabilityFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (existingRetailProductAvailability) {
      return new ControllerResponse<RetailProductAvailability | null>(
        409,
        "Retail product availability for this date already exists",
        JSON.stringify(existingRetailProductAvailability),
        null
      );
    }

    const newRetailProductAvailability = new RetailProductAvailability(
      retailId,
      productId,
      dateFrom,
      dateTo
    );
    const insertResult = await rRetailProductAvailabilityInsert(
      newRetailProductAvailability
    );

    return new ControllerResponse<RetailProductAvailability | null>(
      201,
      "Retail product availability created successfully",
      "",
      insertResult
    );
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductAvailabilityUpdate(
  retailId: number,
  productId: number,
  dateFrom: Date,
  dateTo?: Date
): Promise<ControllerResponse<RetailProductAvailability | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    if (dateTo && isNaN(dateTo.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date to must be a valid date",
        null,
        null
      );
    }

    if (dateTo && dateTo <= dateFrom) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date to must be after date from",
        null,
        null
      );
    }

    // Check if the retail-product-availability exists
    const existingRetailProductAvailability =
      await rRetailProductAvailabilityFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (!existingRetailProductAvailability) {
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "Retail product availability not found",
        null,
        null
      );
    }

    await rRetailProductAvailabilityUpdate(
      retailId,
      productId,
      dateFrom,
      dateTo
    );

    // Return the updated record
    const updatedRetailProductAvailability =
      await rRetailProductAvailabilityFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );

    return new ControllerResponse<RetailProductAvailability | null>(
      200,
      "Retail product availability updated successfully",
      "",
      updatedRetailProductAvailability
    );
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}

export async function sRetailProductAvailabilityDelete(
  retailId: number,
  productId: number,
  dateFrom: Date
): Promise<ControllerResponse<RetailProductAvailability | null>> {
  try {
    if (retailId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Retail ID must be a positive integer",
        null,
        null
      );
    }

    if (productId < 1) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Product ID must be a positive integer",
        null,
        null
      );
    }

    if (!dateFrom || isNaN(dateFrom.getTime())) {
      return new ControllerResponse<RetailProductAvailability | null>(
        400,
        "Date from must be a valid date",
        null,
        null
      );
    }

    const retailProductAvailability =
      await rRetailProductAvailabilityFindByCompositeKey(
        retailId,
        productId,
        dateFrom
      );
    if (!retailProductAvailability) {
      return new ControllerResponse<RetailProductAvailability | null>(
        404,
        "Retail product availability not found",
        null,
        null
      );
    }

    await rRetailProductAvailabilityDelete(retailId, productId, dateFrom);
    return new ControllerResponse(
      200,
      `Retail product availability (${retailId}, ${productId}, ${dateFrom.toISOString()}) deleted successfully`,
      "",
      null
    );
  } catch (error) {
    return new ControllerResponse<RetailProductAvailability | null>(
      500,
      "Internal server error",
      JSON.stringify(error),
      null
    );
  }
}
