import { orm } from '../shared/db/orm.js';
import { User } from './entity.js';
import { UserRole } from '../shared/enums/userRole.js';

export async function rUserFindAll() {
  return await orm.em.findAll(User);
}

export async function rUserFindOneById(userId: number) {
  return await orm.em.findOne(User, { userId: userId });
}

export async function rUserFindOneByName(userName: string) {
  return await orm.em.findOne(User, { userName: userName });
}

export async function rUserGetHashedPassword(userName: string) {
  return await orm.em.findOne(
    User,
    { userName: userName },
    { fields: ['userId', 'userRole', 'userPassword'] }
  );
}

export async function rUserInsert(User: User) {
  await orm.em.begin();
  try {
    const insertResult = await orm.em.insert(User);
    await orm.em.commit();
    return insertResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rUserUpdate(
  userId: number,
  item: {
    userName?: string;
    userPassword?: string;
    userRole?: UserRole;
  }
) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      User,
      { userId: userId },
      item
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rUserDelete(userId: number) {
  await orm.em.begin();
  try {
    const deleteResult = await orm.em.nativeDelete(User, {
      userId: userId,
    });
    await orm.em.commit();
    return deleteResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rUserChangePassword(userId: number, newPassword: string) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      User,
      {
        userId: userId,
      },
      {
        userPassword: newPassword,
      }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}

export async function rUserChangeUserName(userId: number, newUserName: string) {
  await orm.em.begin();
  try {
    const updateResult = await orm.em.nativeUpdate(
      User,
      {
        userId: userId,
      },
      {
        userName: newUserName,
      }
    );
    await orm.em.commit();
    return updateResult;
  } catch (e) {
    await orm.em.rollback();
    throw e;
  }
}
