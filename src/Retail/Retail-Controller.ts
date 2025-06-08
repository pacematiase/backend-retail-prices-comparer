import { Request, Response, NextFunction } from "express";
import RetailRepository from "./Retail-Repository.js";
import { Retail } from "./Retail-Entity.js";

const repository = new RetailRepository();

export async function findAll(req: Request, res: Response) {
  const retails = repository.findAll();
  res.status(200).json({ message: "Retails", data: retails });
}

export async function findOne(req: Request, res: Response) {
  try {
    const retId = req.params.id;
    const retailId: number = parseInt(retId);
    const retail = repository.findOne({ id: retailId });
    if (retail !== undefined) {
      res.status(200).json({ message: "Retail Found", data: retail });
    } else throw new Error("Retail unknown, id: " + retId + "is not found");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  const retId = req.params.id;
  const retailId: number = parseInt(retId);
  const retail = repository.delete({ id: retailId });
  res.status(200).json({ message: "Retail Deleted", data: retail });
}
