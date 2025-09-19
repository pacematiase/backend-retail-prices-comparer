import { orm } from "../shared/db/orm.js";
import { Category } from "./entity.js";

export async function rCategoryFindAll() {
  return await orm.em.findAll(Category, {});
}

export async function rCategoryFindById(id: number) {
  return await orm.em.findOne(Category, { categoryId: id });
}

export async function rCategoryFindByName(name: string) {
  return await orm.em.findOne(Category, { categoryName: name });
}

export async function rCategoryInsert(category: Category) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(category);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rCategoryRename(id: number, name: string) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      Category,
      { categoryId: id },
      { categoryName: name }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rCategoryDelete(id: number) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(Category, { categoryId: id });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
