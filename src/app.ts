import "reflect-metadata" 
import express, { NextFunction, Request, Response } from "express";
import { it } from "node:test";
import retailRouter from "./Retail/Retail-Routes.js";
import { orm, syncSchema } from "./Shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";
const app = express();

//Habilitamos el uso de JSON
app.use(express.json());

// Usamos RequestContext para poder usar el ORM y evitar interferencia entre las peticiones
app.use((req: Request, res: Response, next: NextFunction) => {
  RequestContext.create(orm.em, next);
})

app.use("/Retail", retailRouter);

/*app.use("/Prueba", (req: Request, res: Response) => {
  res.send("Hola");
});*/

await syncSchema(); // Never in production !!!
app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
