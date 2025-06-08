import express, { NextFunction, Request, Response } from "express";
import { it } from "node:test";
import retailRouter from "./Retail/Retail-Routes.js";

const app = express();

//Habilitamos el uso de JSON
app.use(express.json());

app.use("/Retail", retailRouter);

/*app.use("/Prueba", (req: Request, res: Response) => {
  res.send("Hola");
});*/

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
