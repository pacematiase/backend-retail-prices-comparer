import { ControllerResponse } from '../shared/interfaces/controllerResponse.js';
import {
  rUserFindAll,
  rUserFindOneById,
  rUserFindOneByName,
  rUserInsert,
  rUserPatch,
  rUserDelete,
} from './repository.js';
import { User, UserRole, isUserRole } from './entity.js';

export async function sUserFindAll(): Promise<ControllerResponse> {
  try {
    const rUserFindAllRes = await rUserFindAll();
    if (rUserFindAllRes.length === 0) {
      return new ControllerResponse(
        404,
        'No users were found',
        JSON.stringify(rUserFindAllRes)
      );
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      rUserFindAllRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sUserFindOneById(item: {
  userId: number;
}): Promise<ControllerResponse> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        ''
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'User was not found',
        JSON.stringify(rUserFindOneByIdRes)
      );
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      rUserFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sUserInsert(item: {
  userName: string;
  userPassword: string;
  userRole: UserRole;
}): Promise<ControllerResponse> {
  try {
    if (item.userName.length === 0) {
      return new ControllerResponse(400, 'userName must not be empty', '');
    }
    const rUserFindOneByNameRes = await rUserFindOneByName(item.userName);
    if (rUserFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'userName is already in use',
        JSON.stringify(rUserFindOneByNameRes)
      );
    }
    const user = new User(item.userName, item.userPassword, item.userRole);
    const rUserInsertRes = await rUserInsert(user);
    return new ControllerResponse(200, 'User created successfully', {
      userId: rUserInsertRes,
      userName: item.userName,
    });
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sUserPatch(item: {
  userId: number;
  userName?: string;
  userPassword?: string;
  userRole?: UserRole;
}): Promise<ControllerResponse> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        ''
      );
    }
    if (!item.userName && !item.userPassword && !item.userRole) {
      return new ControllerResponse(
        400,
        'Either userName, userPassword or userRole are required',
        ''
      );
    }
    if (item.userName && item.userName.length === 0) {
      return new ControllerResponse(400, 'userName must not be empty', '');
    }
    if (item.userPassword && item.userPassword.length === 0) {
      return new ControllerResponse(400, 'userPassword must not be empty', '');
    }
    if (item.userRole && isUserRole(item.userRole) === false) {
      return new ControllerResponse(400, 'userRole not found', '');
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'User was not found',
        JSON.stringify(rUserFindOneByIdRes)
      );
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
          JSON.stringify(rUserFindOneByNameRes)
        );
      }
    }
    const patchPayload = {
      ...(item.userName !== undefined && { userName: item.userName }),
      ...(item.userPassword !== undefined && {
        userPassword: item.userPassword,
      }),
      ...(item.userRole !== undefined && { userRole: item.userRole }),
    };
    const rUserRenameRes = await rUserPatch(item.userId, patchPayload);
    return new ControllerResponse(200, 'User patched successfully', {
      OldValue: rUserFindOneByIdRes,
      UpdatedFields: patchPayload,
    });
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sUserDelete(item: {
  userId: number;
}): Promise<ControllerResponse> {
  try {
    if (item.userId < 1) {
      return new ControllerResponse(
        400,
        'userId must be a positive integer',
        ''
      );
    }
    const rUserFindOneByIdRes = await rUserFindOneById(item.userId);
    if (rUserFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'User was not found',
        JSON.stringify(rUserFindOneByIdRes)
      );
    }
    const rUserDeleteRes = await rUserDelete(item.userId);
    return new ControllerResponse(
      200,
      'User deleted successfully',
      rUserFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}
