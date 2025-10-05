import { ControllerResponse } from '../shared/classes/controllerResponse.js';
import {
  rRetailFindAll,
  rRetailFindOneById,
  rRetailFindOneByName,
  rRetailInsert,
  rRetailUpdate,
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
  retailUrl?: string;
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
    const retail = new Retail(item.retailName, item.retailUrl);
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

export async function sRetailUpdate(item: {
  retailId: number;
  retailName?: string;
  retailUrl?: string;
}): Promise<
  ControllerResponse<{
    oldValue: Retail;
    newValue: {
      retailId: number;
      retailName?: string;
      retailUrl?: string;
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
    const receivedUrl = item.retailUrl && item.retailUrl.length > 0;
    const receivedName = item.retailName && item.retailName.length > 0;
    if (!receivedUrl && !receivedName) {
      return new ControllerResponse(
        400,
        'Either retailName or retailUrl must have a value',
        '',
        null
      );
    }
    const rRetailFindOneByIdRes = await rRetailFindOneById(item.retailId);
    if (rRetailFindOneByIdRes === null) {
      return new ControllerResponse(404, 'Retail was not found', '', null);
    }
    if (receivedName) {
      const rRetailFindOneByNameRes = await rRetailFindOneByName(
        item.retailName!
      );
      if (
        rRetailFindOneByNameRes !== null &&
        rRetailFindOneByNameRes.retailId !== item.retailId
      ) {
        return new ControllerResponse(
          400,
          'retailName is already in use',
          JSON.stringify(rRetailFindOneByNameRes),
          null
        );
      }
    }
    let newValues: { retailName?: string; retailUrl?: string } = {};
    if (receivedUrl) newValues.retailUrl = item.retailUrl;
    if (receivedName) newValues.retailName = item.retailName;
    const rRetailUpdateRes = await rRetailUpdate(item.retailId, newValues);
    return new ControllerResponse(200, 'Retail updated successfully', null, {
      oldValue: rRetailFindOneByIdRes,
      newValue: {
        retailId: item.retailId,
        retailName: item.retailName
          ? item.retailName
          : rRetailFindOneByIdRes.retailName,
        retailUrl: item.retailUrl
          ? item.retailUrl
          : rRetailFindOneByIdRes.retailUrl,
      },
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
