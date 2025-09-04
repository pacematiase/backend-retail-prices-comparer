import { ControllerResponse } from '../shared/interfaces/controllerResponse.js';
import {
  rRetailFindAll,
  rRetailFindOneById,
  rRetailFindOneByName,
  rRetailInsert,
  rRetailRename,
  rRetailDelete,
} from './repository.js';
import { Retail } from './entity.js';

export async function sRetailFindAll(): Promise<ControllerResponse> {
  try {
    const rRetailFindAllRes = await rRetailFindAll();
    if (rRetailFindAllRes.length === 0) {
      return new ControllerResponse(
        404,
        'No retails were found',
        JSON.stringify(rRetailFindAllRes)
      );
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      rRetailFindAllRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sRetailFindOneById(item: {
  retailId: number;
}): Promise<ControllerResponse> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        ''
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'Retail was not found',
        JSON.stringify(rRetailFindOneByIdRes)
      );
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      rRetailFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sRetailInsert(item: {
  retailName: string;
}): Promise<ControllerResponse> {
  try {
    if (item.retailName.length === 0) {
      return new ControllerResponse(400, 'retailName must not be empty', '');
    }
    const rRetailFindOneByNameRes = await rRetailFindOneByName(item.retailName);
    if (rRetailFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'retailName is already in use',
        JSON.stringify(rRetailFindOneByNameRes)
      );
    }
    const retail = new Retail(item.retailName);
    const rRetailInsertRes = await rRetailInsert(retail);
    return new ControllerResponse(200, 'Retail created successfully', {
      retailId: rRetailInsertRes,
      retailName: item.retailName,
    });
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sRetailRename(item: {
  retailId: number;
  retailName: string;
}): Promise<ControllerResponse> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        ''
      );
    }
    if (item.retailName.length === 0) {
      return new ControllerResponse(400, 'retailName must not be empty', '');
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'Retail was not found',
        JSON.stringify(rRetailFindOneByIdRes)
      );
    }
    const rRetailFindOneByNameRes = await rRetailFindOneByName(item.retailName);
    if (rRetailFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'retailName is already in use',
        JSON.stringify(rRetailFindOneByNameRes)
      );
    }
    const rRetailRenameRes = await rRetailRename(
      item.retailId,
      item.retailName
    );
    return new ControllerResponse(200, 'Retail renamed successfully', {
      OldValue: rRetailFindOneByIdRes,
      NewValue: item,
    });
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}

export async function sRetailDelete(item: {
  retailId: number;
}): Promise<ControllerResponse> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        ''
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(
        404,
        'Retail was not found',
        JSON.stringify(rRetailFindOneByIdRes)
      );
    }
    const rRetailDeleteRes = await rRetailDelete(item.retailId);
    return new ControllerResponse(
      200,
      'Retail deleted successfully',
      rRetailFindOneByIdRes
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err)
    );
  }
}
