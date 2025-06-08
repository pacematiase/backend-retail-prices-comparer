import { Request, Response, NextFunction } from "express";
import RetailRepository from "./Retail-Repository.js";
import { Retail } from "./Retail-Entity.js";

const repository = new RetailRepository();
/*
export function sanitizeRetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizeRetail = {
    id: req.body.id,
    nombre: req.body.nombre,
  };
  Object.keys(req.body.sanitizeRetail).forEach((key) => {
    if (req.body.sanitizeRetail[key] === undefined) {
      delete req.body.sanitizeRetail[key];
    }
  });
  next();
}
*/
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
    } else throw new Error("Retail unknown, id: " + retId + " is not found");
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

//TODO Este no esta andando, el body queda como undefined
export async function add(req: Request, res: Response) {
  try {
    const id = req.body?.id;
    const nombre = req.body?.nombre;
    if (id !== undefined && nombre != undefined) {
      const retailNuevo = new Retail(id, nombre);
      const retailCargado = repository.add(retailNuevo);
      res.status(200).json({ message: "Retail created", data: retailCargado });
    } else {
      res.status(400).json({
        message: "Data missing in body " + req.body,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message + "   " + req.body?.id + req.body?.nombre,
    });
  }
}
