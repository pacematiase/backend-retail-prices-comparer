import { orm } from "../shared/db/orm.js";
import { Product } from "./entity.js";

export async function rProductFindAll() {
  return await orm.em.findAll(Product, {});
}

export async function rProductFindById(id: number) {
  return await orm.em.findOne(Product, { productId: id });
}

export async function rProductFindBySKU(sku: string) {
  return await orm.em.findOne(Product, { productSKU: sku });
}

export async function rProductFindByName(name: string) {
  return await orm.em.findOne(Product, { productName: name });
}

export async function rProductInsert(product: Product) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(product);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rProductUpdate(
  id: number,
  productData: Partial<Product>
) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      Product,
      { productId: id },
      productData
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rProductDelete(id: number) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(Product, { productId: id });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
