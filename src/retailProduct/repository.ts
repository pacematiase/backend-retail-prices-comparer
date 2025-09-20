import { orm } from "../shared/db/orm.js";
import { RetailProduct } from "./entity.js";

export async function rRetailProductFindAll() {
  return await orm.em.findAll(RetailProduct, {});
}

export async function rRetailProductFindByCompositeKey(
  retailId: number,
  productId: number
) {
  return await orm.em.findOne(RetailProduct, {
    retailId: retailId,
    productId: productId,
  });
}

export async function rRetailProductFindByRetailId(retailId: number) {
  return await orm.em.find(RetailProduct, { retailId: retailId });
}

export async function rRetailProductFindByProductId(productId: number) {
  return await orm.em.find(RetailProduct, { productId: productId });
}

export async function rRetailProductInsert(retailProduct: RetailProduct) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(retailProduct);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailProductDelete(
  retailId: number,
  productId: number
) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(RetailProduct, {
      retailId: retailId,
      productId: productId,
    });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
