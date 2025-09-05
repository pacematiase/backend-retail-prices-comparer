import { ControllerResponse } from '../shared/classes/controllerResponse.js';
import {
  rRetailFindAll,
  rRetailFindOneById,
  rRetailFindOneByName,
  rRetailInsert,
  rRetailRename,
  rRetailDelete,
} from './repository.js';
import { Retail } from './entity.js';

export async function sRetailFindAll(): Promise<
  ControllerResponse<Retail[] | null>
> {
  try {
    const rRetailFindAllRes = await rRetailFindAll();
    if (rRetailFindAllRes.length === 0) {
      return new ControllerResponse(404, 'No retails were found', '', null);
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      null,
      rRetailFindAllRes
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

export async function sRetailFindOneById(item: {
  retailId: number;
}): Promise<ControllerResponse<Retail | null>> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        '',
        null
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(404, 'Retail was not found', '', null);
    }
    return new ControllerResponse(
      200,
      'Query executed successfully',
      null,
      rRetailFindOneByIdRes
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

export async function sRetailInsert(item: {
  retailName: string;
}): Promise<ControllerResponse<Retail | null>> {
  try {
    if (item.retailName.length === 0) {
      return new ControllerResponse(
        400,
        'retailName must not be empty',
        '',
        null
      );
    }
    const rRetailFindOneByNameRes = await rRetailFindOneByName(item.retailName);
    if (rRetailFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'retailName is already in use',
        JSON.stringify(rRetailFindOneByNameRes),
        null
      );
    }
    const retail = new Retail(item.retailName);
    const rRetailInsertRes = await rRetailInsert(retail);
    return new ControllerResponse(
      200,
      'Retail created successfully',
      '',
      rRetailInsertRes
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

export async function sRetailRename(item: {
  retailId: number;
  retailName: string;
}): Promise<
  ControllerResponse<{
    oldValue: Retail;
    newValue: {
      retailId: number;
      retailName: string;
    };
  } | null>
> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        '',
        null
      );
    }
    if (item.retailName.length === 0) {
      return new ControllerResponse(
        400,
        'retailName must not be empty',
        '',
        null
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(404, 'Retail was not found', '', null);
    }
    const rRetailFindOneByNameRes = await rRetailFindOneByName(item.retailName);
    if (rRetailFindOneByNameRes !== null) {
      return new ControllerResponse(
        400,
        'retailName is already in use',
        JSON.stringify(rRetailFindOneByNameRes),
        null
      );
    }
    const rRetailRenameRes = await rRetailRename(
      item.retailId,
      item.retailName
    );
    return new ControllerResponse(200, 'Retail renamed successfully', null, {
      oldValue: rRetailFindOneByIdRes,
      newValue: item,
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

export async function sRetailDelete(item: {
  retailId: number;
}): Promise<ControllerResponse<Retail | null>> {
  try {
    if (item.retailId < 1) {
      return new ControllerResponse(
        400,
        'retailId must be a positive integer',
        '',
        null
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(404, 'Retail was not found', '', null);
    }
    const rRetailDeleteRes = await rRetailDelete(item.retailId);
    return new ControllerResponse(
      200,
      'Retail deleted successfully',
      null,
      rRetailFindOneByIdRes
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
