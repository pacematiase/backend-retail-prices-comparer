import { orm } from "../shared/db/orm.js";
import { RetailProductPrice } from "./entity.js";

export async function rRetailProductPriceFindAll() {
  return await orm.em.findAll(RetailProductPrice, {});
}

export async function rRetailProductPriceFindByCompositeKey(
  retailId: number,
  productId: number,
  dateFrom: Date
) {
  return await orm.em.findOne(RetailProductPrice, {
    retailId: retailId,
    productId: productId,
    dateFrom: dateFrom,
  });
}

export async function rRetailProductPriceFindByRetailId(retailId: number) {
  return await orm.em.find(RetailProductPrice, { retailId: retailId });
}

export async function rRetailProductPriceFindByProductId(productId: number) {
  return await orm.em.find(RetailProductPrice, { productId: productId });
}

export async function rRetailProductPriceFindByRetailAndProduct(
  retailId: number,
  productId: number
) {
  return await orm.em.find(RetailProductPrice, {
    retailId: retailId,
    productId: productId,
  });
}

export async function rRetailProductPriceFindCurrentPrice(
  retailId: number,
  productId: number,
  currentDate: Date = new Date()
) {
  return await orm.em.findOne(RetailProductPrice, {
    retailId: retailId,
    productId: productId,
    dateFrom: { $lte: currentDate },
    $or: [{ dateTo: null }, { dateTo: { $gte: currentDate } }],
  });
}

export async function rRetailProductPriceInsert(
  retailProductPrice: RetailProductPrice
) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(retailProductPrice);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailProductPriceUpdate(
  retailId: number,
  productId: number,
  dateFrom: Date,
  price: number,
  dateTo?: Date
) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      RetailProductPrice,
      {
        retailId: retailId,
        productId: productId,
        dateFrom: dateFrom,
      },
      {
        price: price,
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

export async function rRetailProductPriceDelete(
  retailId: number,
  productId: number,
  dateFrom: Date
) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(RetailProductPrice, {
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
