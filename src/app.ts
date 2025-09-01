import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import retailRouter from './retail/routes.js';
import authRouter from './shared/jwt/routes.js';
import { orm, syncSchema, newSchema } from './shared/db/orm.js';
import { ARRAY_OPERATORS, RequestContext } from '@mikro-orm/core';
import { verifyToken } from './shared/jwt/controller.js';

async function start() {
  const app = express();
  // Enable json usage
  app.use(express.json());

  // Create RequestContext to use ORM without interferring between requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    RequestContext.create(orm.em, next);
  });

  // Never run syncSchema in a production environment!!! It could drop the database
  await syncSchema();

  app.use('/retail', retailRouter);
  app.use('/auth', authRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
  });
}

await start();
