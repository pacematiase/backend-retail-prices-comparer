import { orm } from "../shared/db/orm.js";
import { SubCategory } from "./entity.js";

export async function rSubCategoryFindAll() {
  return await orm.em.findAll(SubCategory, {});
}

export async function rSubCategoryFindById(id: number) {
  return await orm.em.findOne(SubCategory, { subCategoryId: id });
}

export async function rSubCategoryFindByName(name: string) {
  return await orm.em.findOne(SubCategory, { subCategoryName: name });
}

export async function rSubCategoryInsert(subCategory: SubCategory) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(subCategory);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rSubCategoryRename(id: number, name: string) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      SubCategory,
      { subCategoryId: id },
      { subCategoryName: name }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rSubCategoryDelete(id: number) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(SubCategory, { subCategoryId: id });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
