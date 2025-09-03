import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import retailRouter from './retail/routes.js';
import authRouter from './shared/jwt/routes.js';
import { orm, syncSchema, newSchema } from './shared/db/orm.js';
import { ARRAY_OPERATORS, RequestContext } from '@mikro-orm/core';
import { verifyToken } from './shared/jwt/controller.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './shared/swagger/spec.js';

async function start() {
  // Express setup
  const app = express();
  // Enable json usage
  app.use(express.json());

  // ORM Setup
  // Create RequestContext to use ORM without interferring between requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    RequestContext.create(orm.em, next);
  });
  // Never run syncSchema in a production environment!!! It could drop the database
  await syncSchema();

  // Swagger Setup (Show APIs documentation in https://DATABASE_HOST:PORT/docs)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes setup (API endpoints)
  app.use('/retail', retailRouter);
  app.use('/auth', authRouter);

  // Publish service
  app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
  });
}

await start();
