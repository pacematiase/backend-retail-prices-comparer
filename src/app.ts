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
import OpenApiValidator from 'express-openapi-validator';

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

  // Swagger OpenAPI Setup (Show APIs documentation in http://DATABASE_HOST:PORT/docs)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // OpenAPI validator setup, to validate that all API calls follow the schema defined in each routes.ts file and return 400 if not
  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerSpec as any,
      validateRequests: true,
    })
  );

  // Routes setup (API endpoints)
  app.use('/retail', retailRouter);
  app.use('/auth', authRouter);

  // Publish service
  app.listen(process.env.PORT, () => {
    console.log(
      `Server started. Refer to http://${process.env.DATABASE_HOST}:${process.env.PORT}/docs for API documentation`
    );
  });
}

await start();
