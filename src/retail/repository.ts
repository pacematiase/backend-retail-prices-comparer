import { orm } from '../shared/db/orm.js';
import { Retail } from './entity.js';

export async function rRetailFindAll() {
  return await orm.em.findAll(Retail);
}

export async function rRetailFindOneById(retailId: number) {
  return await orm.em.findOne(Retail, { retailId: retailId });
}

export async function rRetailFindOneByName(retailName: string) {
  return await orm.em.findOne(Retail, { retailName: retailName });
}

export async function rRetailInsert(Retail: Retail) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(Retail);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailRename(retailId: number, retailName: string) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      Retail,
      { retailId: retailId },
      { retailName: retailName }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rRetailDelete(retailId: number) {
  await orm.em.begin();
  try {
    const deleteResult = await orm.em.nativeDelete(Retail, {
      retailId: retailId,
    });
    await orm.em.commit();
    return deleteResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
