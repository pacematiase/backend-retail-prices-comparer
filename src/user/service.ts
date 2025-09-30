import { ControllerResponse } from '../shared/classes/controllerResponse.js';
import { UserRole, isUserRole } from '../shared/enums/userRole.js';
import {
  rUserFindAll,
  rUserFindOneById,
  rUserFindOneByName,
  rUserGetHashedPassword,
  rUserInsert,
  rUserUpdate,
  rUserDelete,
  rUserChangePassword,
  rUserChangeUserName,
} from './repository.js';
import { User } from './entity.js';
import { sHashPassword, sAuthComparePassword } from '../shared/auth/service.js';

export async function sUserFindAll(): Promise<
  ControllerResponse<User[] | null>
> {
  try {
    const rUserFindAllRes = await rUserFindAll();
    if (rUserFindAllRes.length === 0) {
      return new ControllerResponse<User[] | null>(
        404,
        'No users were found',
        '',
        null
      );
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      null,
      rUserFindAllRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserFindOneById(item: {
  userId: number;
}): Promise<ControllerResponse<User | null>> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        '',
        null
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      null,
      rUserFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserGetHashedPassword(item: {
  userName: string;
}): Promise<
  ControllerResponse<{
    userId: number;
    userRole: UserRole;
    userPassword: string;
  } | null>
> {
  try {
    if (item.userName.length === 0) {
      return new ControllerResponse(
        400,
        'userName must not be empty',
        '',
        null
      );
    }
    const rUserGetHashedPasswordRes = await rUserGetHashedPassword(
      item.userName
    );
    if (rUserGetHashedPasswordRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      null,
      rUserGetHashedPasswordRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserInsert(item: {
  userName: string;
  userPassword: string;
  userRole: UserRole;
}): Promise<ControllerResponse<User | null>> {
  try {
    if (item.userName.length === 0) {
      return new ControllerResponse(
        400,
        'userName must not be empty',
        '',
        null
      );
    }
    const rUserFindOneByNameRes = await rUserFindOneByName(item.userName);
    if (rUserFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'userName is already in use',
        '',
        null
      );
    }
    const hashedPassword = await sHashPassword(item.userPassword);
    const user = new User(item.userName, hashedPassword, item.userRole);
    const rUserInsertRes = await rUserInsert(user);
    return new ControllerResponse(
      200,
      'User created successfully',
      null,
      rUserInsertRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserSignUp(item: {
  userName: string;
  userPassword: string;
}): Promise<ControllerResponse<User | null>> {
  try {
    if (item.userName.length === 0) {
      return new ControllerResponse(
        400,
        'userName must not be empty',
        '',
        null
      );
    }
    const rUserFindOneByNameRes = await rUserFindOneByName(item.userName);
    if (rUserFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'userName is already in use',
        '',
        null
      );
    }
    const hashedPassword = await sHashPassword(item.userPassword);
    const user = new User(item.userName, hashedPassword, UserRole.endUser);
    const rUserInsertRes = await rUserInsert(user);
    return new ControllerResponse(
      200,
      'User created successfully',
      null,
      rUserInsertRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserUpdate(item: {
  userId: number;
  userName?: string;
  userPassword?: string;
  userRole?: UserRole;
}): Promise<
  ControllerResponse<{
    oldValue: User;
    updatedFields: {
      userName?: string;
      userPassword?: string;
      userRole?: UserRole;
    };
  } | null>
> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        '',
        null
      );
    }
    if (!item.userName && !item.userPassword && !item.userRole) {
      return new ControllerResponse(
        400,
        'Either userName, userPassword or userRole are required',
        '',
        null
      );
    }
    if (item.userName && item.userName.length === 0) {
      return new ControllerResponse(
        400,
        'userName must not be empty',
        '',
        null
      );
    }
    if (item.userPassword && item.userPassword.length === 0) {
      return new ControllerResponse(
        400,
        'userPassword must not be empty',
        '',
        null
      );
    }
    if (item.userRole && isUserRole(item.userRole) === false) {
      return new ControllerResponse(404, 'userRole not found', '', null);
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    if (item.userName) {
      const rUserFindOneByNameRes = await rUserFindOneByName(item.userName);
      if (
        rUserFindOneByNameRes !== null &&
        rUserFindOneByNameRes.userId !== item.userId
      ) {
        return new ControllerResponse(
          400,
          'userName is already in use',
          JSON.stringify(rUserFindOneByNameRes),
          null
        );
      }
    }
    let patchPayload: {
      userName?: string;
      userPassword?: string;
      userRole?: UserRole;
    } = {};
    if (item.userPassword) {
      patchPayload.userPassword = await sHashPassword(item.userPassword);
    }
    if (item.userName) {
      patchPayload.userName = item.userName;
    }
    if (item.userRole) {
      patchPayload.userRole = item.userRole;
    }
    const rUserRenameRes = await rUserUpdate(item.userId, patchPayload);
    return new ControllerResponse(200, 'User updated successfully', null, {
      oldValue: rUserFindOneByIdRes,
      updatedFields: patchPayload,
    });
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserDelete(item: {
  userId: number;
}): Promise<ControllerResponse<User | null>> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        '',
        null
      );
    }
    if (item.userId < 2) {
      return new ControllerResponse(
        401,
        'admin user cannot be deleted',
        '',
        null
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    const rUserDeleteRes = await rUserDelete(item.userId);
    return new ControllerResponse(
      200,
      'User deleted successfully',
      null,
      rUserFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserChangePassword(item: {
  userId: number;
  oldPassword: string;
  newPassword: string;
}): Promise<
  ControllerResponse<{
    userId: number;
    oldPassword: string;
    newPassword: string;
  } | null>
> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        '',
        null
      );
    }
    if (item.newPassword.length === 0) {
      return new ControllerResponse(
        400,
        'userPassword must not be empty',
        '',
        null
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    let oldPasswordInRepository = (await rUserGetHashedPassword(
      rUserFindOneByIdRes.userName
    ))!.userPassword;
    let comparePasswordResult = await sAuthComparePassword(
      item.oldPassword,
      oldPasswordInRepository
    );
    if (comparePasswordResult === false) {
      return new ControllerResponse(
        404,
        'Old password is not correct',
        '',
        null
      );
    }
    let newPassword = await sHashPassword(item.newPassword);
    const rUserChangePasswordRes = await rUserChangePassword(
      item.userId,
      newPassword
    );
    return new ControllerResponse(
      200,
      'User password was updated successfully',
      null,
      {
        userId: item.userId,
        oldPassword: oldPasswordInRepository,
        newPassword: newPassword,
      }
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export async function sUserChangeUserName(item: {
  userId: number;
  newUserName: string;
  password: string;
}): Promise<
  ControllerResponse<{
    userId: number;
    oldUserName: string;
    newUserName: string;
  } | null>
> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        '',
        null
      );
    }
    if (item.newUserName.length === 0) {
      return new ControllerResponse(
        400,
        'userName must not be empty',
        '',
        null
      );
    }
    if (item.password.length === 0) {
      return new ControllerResponse(
        400,
        'password must not be empty',
        '',
        null
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(404, 'User was not found', '', null);
    }
    let actualPassword = (await rUserGetHashedPassword(
      rUserFindOneByIdRes.userName
    ))!.userPassword;
    let comparePasswordResult = await sAuthComparePassword(
      item.password,
      actualPassword
    );
    if (comparePasswordResult === false) {
      return new ControllerResponse(
        404,
        'Entered password is not correct',
        '',
        null
      );
    }
    const rUserFindOneByIdNameRes = await rUserFindOneByName(item.newUserName);
    if (rUserFindOneByIdNameRes !== null) {
      return new ControllerResponse(
        404,
        'UserName is already in use',
        '',
        null
      );
    }
    const rUserChangeUserNameres = await rUserChangeUserName(
      item.userId,
      item.newUserName
    );
    return new ControllerResponse(
      200,
      'User name was updated successfully',
      null,
      {
        userId: item.userId,
        oldUserName: rUserFindOneByIdRes.userName,
        newUserName: item.newUserName,
      }
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}
