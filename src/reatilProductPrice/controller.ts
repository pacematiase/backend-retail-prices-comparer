import { Request, Response } from "express";
import {
  sRetailProductPriceFindAll,
  sRetailProductPriceFindByCompositeKey,
  sRetailProductPriceFindByRetailId,
  sRetailProductPriceFindByProductId,
  sRetailProductPriceFindByRetailAndProduct,
  sRetailProductPriceFindCurrentPrice,
  sRetailProductPriceInsert,
  sRetailProductPriceUpdate,
  sRetailProductPriceDelete,
} from "./service.js";

export async function cRetailProductPriceFindAll(req: Request, res: Response) {
  const result = await sRetailProductPriceFindAll();
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceFindByCompositeKey(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const result = await sRetailProductPriceFindByCompositeKey(
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

export async function cRetailProductPriceFindByRetailId(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const result = await sRetailProductPriceFindByRetailId(retailId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceFindByProductId(
  req: Request,
  res: Response
) {
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductPriceFindByProductId(productId);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceFindByRetailAndProduct(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const result = await sRetailProductPriceFindByRetailAndProduct(
    retailId,
    productId
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceFindCurrentPrice(
  req: Request,
  res: Response
) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const currentDate = req.query.date
    ? new Date(req.query.date as string)
    : undefined;
  const result = await sRetailProductPriceFindCurrentPrice(
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

export async function cRetailProductPriceInsert(req: Request, res: Response) {
  const { retailId, productId, dateFrom, price, dateTo } = req.body;
  const result = await sRetailProductPriceInsert(
    retailId,
    productId,
    new Date(dateFrom),
    price,
    dateTo ? new Date(dateTo) : undefined
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceUpdate(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const { price, dateTo } = req.body;
  const result = await sRetailProductPriceUpdate(
    retailId,
    productId,
    dateFrom,
    price,
    dateTo ? new Date(dateTo) : undefined
  );
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}

export async function cRetailProductPriceDelete(req: Request, res: Response) {
  const retailId: number = parseInt(req.params.retailId);
  const productId: number = parseInt(req.params.productId);
  const dateFrom: Date = new Date(req.params.dateFrom);
  const result = await sRetailProductPriceDelete(retailId, productId, dateFrom);
  res.status(result.statusCode).json({
    message: result.message,
    errDetails: result.errDetails,
    data: result.data,
  });
}
