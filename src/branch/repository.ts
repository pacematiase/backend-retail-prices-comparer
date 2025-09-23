import { orm } from "../shared/db/orm.js";
import { Branch } from "./entity.js";

export async function rBranchFindAll() {
  return await orm.em.findAll(Branch, {});
}

export async function rBranchFindById(branchId: number, retailId: number) {
  return await orm.em.findOne(Branch, { branchId, retailId });
}

export async function rBranchFindByRetailId(retailId: number) {
  return await orm.em.find(Branch, { retailId });
}

export async function rBranchFindByNameAndRetail(
  branchName: string,
  retailId: number
) {
  return await orm.em.findOne(Branch, { branchName, retailId });
}

export async function rBranchInsert(branch: Branch) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(branch);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rBranchUpdate(
  branchId: number,
  retailId: number,
  updateData: Partial<Branch>
) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      Branch,
      { branchId, retailId },
      updateData
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rBranchDelete(branchId: number, retailId: number) {
  await orm.em.begin();
  try {
    await orm.em.nativeDelete(Branch, { branchId, retailId });
    await orm.em.commit();
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
