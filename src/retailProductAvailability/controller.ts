import { Request, Response } from "express";
import {
  sRetailProductAvailabilityFindAll,
  sRetailProductAvailabilityFindByCompositeKey,
  sRetailProductAvailabilityFindByRetailId,
  sRetailProductAvailabilityFindByProductId,
  sRetailProductAvailabilityFindByRetailAndProduct,
  sRetailProductAvailabilityFindCurrentAvailability,
  sRetailProductAvailabilityFindAvailableInRange,
  sRetailProductAvailabilityInsert,
  sRetailProductAvailabilityUpdate,
  sRetailProductAvailabilityDelete,
} from "./service.js";

export async function cRetailProductAvailabilityFindAll(
  req: Request,
  res: Response
) {
  const result = await sRetailProductAvailabilityFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindByCompositeKey(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const result = await sRetailProductAvailabilityFindByCompositeKey(
    retailId,
    productId,
    dateFrom
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindByRetailId(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailProductAvailabilityFindByRetailId(retailId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindByProductId(
  req: Request,
  res: Response
) {
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductAvailabilityFindByProductId(productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindByRetailAndProduct(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductAvailabilityFindByRetailAndProduct(
    retailId,
    productId
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindCurrentAvailability(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const currentDate = req.query.date
    ? new Date(req.query.date as string)
    : undefined;
  const result = await sRetailProductAvailabilityFindCurrentAvailability(
    retailId,
    productId,
    currentDate
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityFindAvailableInRange(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const startDate: Date = new Date(req.query.startDate as string);
  const endDate: Date = new Date(req.query.endDate as string);
  const result = await sRetailProductAvailabilityFindAvailableInRange(
    retailId,
    productId,
    startDate,
    endDate
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityInsert(
  req: Request,
  res: Response
) {
  const { retailId, productId, dateFrom, dateTo } = req.body;
  const result = await sRetailProductAvailabilityInsert(
    retailId,
    productId,
    new Date(dateFrom),
    dateTo ? new Date(dateTo) : undefined
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityUpdate(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const { dateTo } = req.body;
  const result = await sRetailProductAvailabilityUpdate(
    retailId,
    productId,
    dateFrom,
    dateTo ? new Date(dateTo) : undefined
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductAvailabilityDelete(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const result = await sRetailProductAvailabilityDelete(
    retailId,
    productId,
    dateFrom
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
