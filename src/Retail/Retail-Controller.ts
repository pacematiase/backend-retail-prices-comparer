import { Request, Response, NextFunction } from "express";
import retailData from "../Data/RetailData";

function findAll(req: Request, res: Response) {
  res.json(retailData);
}
