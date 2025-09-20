import { orm } from "../shared/db/orm.js";
import { RetailProductAvailability } from "./entity.js";

export async function rRetailProductAvailabilityFindAll() {
  return await orm.em.findAll(RetailProductAvailability, {});
}

export async function rRetailProductAvailabilityFindByCompositeKey(
  retailId: number,
  productId: number,
  dateFrom: Date
) {
  return await orm.em.findOne(RetailProductAvailability, {
    retailId: retailId,
    productId: productId,
    dateFrom: dateFrom,
  });
}

export async function rRetailProductAvailabilityFindByRetailId(
  retailId: number
) {
  return await orm.em.find(RetailProductAvailability, { retailId: retailId });
}

export async function rRetailProductAvailabilityFindByProductId(
  productId: number
) {
  return await orm.em.find(RetailProductAvailability, { productId: productId });
}

export async function rRetailProductAvailabilityFindByRetailAndProduct(
  retailId: number,
  productId: number
) {
  return await orm.em.find(RetailProductAvailability, {
    retailId: retailId,
    productId: productId,
  });
}

export async function rRetailProductAvailabilityFindCurrentAvailability(
  retailId: number,
  productId: number,
  currentDate: Date = new Date()
) {
  return await orm.em.findOne(RetailProductAvailability, {
    retailId: retailId,
    productId: productId,
    dateFrom: { $lte: currentDate },
    $or: [{ dateTo: null }, { dateTo: { $gte: currentDate } }],
  });
}

export async function rRetailProductAvailabilityFindAvailableInRange(
  retailId: number,
  productId: number,
  startDate: Date,
  endDate: Date
) {
  return await orm.em.find(RetailProductAvailability, {
    retailId: retailId,
    productId: productId,
    $or: [
      {
        dateFrom: { $lte: endDate },
        $or: [{ dateTo: null }, { dateTo: { $gte: startDate } }],
      },
    ],
  });
}

export async function rRetailProductAvailabilityInsert(
  retailProductAvailability: RetailProductAvailability
) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(retailProductAvailability);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailProductAvailabilityUpdate(
  retailId: number,
  productId: number,
  dateFrom: Date,
  dateTo?: Date
) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      RetailProductAvailability,
      {
        retailId: retailId,
        productId: productId,
        dateFrom: dateFrom,
      },
      {
        dateTo: dateTo,
      }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailProductAvailabilityDelete(
  retailId: number,
  productId: number,
  dateFrom: Date
) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(RetailProductAvailability, {
      retailId: retailId,
      productId: productId,
      dateFrom: dateFrom,
    });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
