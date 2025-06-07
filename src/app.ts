import express, { NextFunction, Request, Response } from "express";
import retailData from "./Data/RetailData";
import { it } from "node:test";

const app = express();

//app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Hola");
});

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000!");
});
