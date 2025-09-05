import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import retailRouter from './retail/routes.js';
import authRouter from './shared/jwt/routes.js';
import userRouter from './user/routes.js';
import { orm, syncSchema, newSchema } from './shared/db/orm.js';
import { ARRAY_OPERATORS, RequestContext } from '@mikro-orm/core';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './shared/swagger/spec.js';
import OpenApiValidator from 'express-openapi-validator';
import { User, UserRole } from './user/entity.js';

async function start() {
  // Express setup
  console.log(`\n Starting express`);
  const app = express();
  // Enable json usage
  console.log(`\n Starting express JSON parser`);
  app.use(express.json());

  // ORM (database) setup
  // Create RequestContext to use ORM without interferring between requests
  console.log(`\n Setting up concurrency for mikroORM`);
  app.use((req: Request, res: Response, next: NextFunction) => {
    RequestContext.create(orm.em, next);
  });
  // Never run syncSchema or newSchema in a production environment!!! It could drop the database
  if (process.env.ORM_NEW_SCHEMA === 'true') {
    console.log(`\n Dropping and re-creating database schema`);
    await newSchema();
    console.log(`\n Creating default administrator user`);
    await orm.em.insert(
      User,
      new User('admin', 'admin', UserRole.administrator)
    );
  }
  if (process.env.ORM_SYNC_SCHEMA === 'true') {
    console.log(`\n Syncing database schema`);
    await syncSchema();
  }

  // Swagger OpenAPI Setup (Show APIs documentation in http://DATABASE_HOST:PORT/docs)
  console.log(`\n Starting OpenAPI Swagger documentation`);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // OpenAPI validator setup, to validate that all API calls follow the schema defined in each routes.ts file and return 400 if not
  console.log(`\n Enabling OpenAPI Payload schema validator`);
  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerSpec as any,
      validateRequests: true,
    })
  );

  // Routes setup (API endpoints)
  console.log(`\n Opening endpoints`);
  app.use('/retail', retailRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);

  // Publish service
  console.log(`\n Publishing service`);
  app.listen(process.env.PORT, () => {
    console.log(
      `\n Server started. Refer to http://${process.env.DATABASE_HOST}:${process.env.PORT}/docs for API documentation`
    );
  });
}

await start();
