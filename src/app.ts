import { config } from "./shared/env/env.js";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { orm, syncSchema, newSchema } from "./shared/db/orm.js";
import { ARRAY_OPERATORS, RequestContext } from "@mikro-orm/core";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/swagger/spec.js";
import OpenApiValidator from "express-openapi-validator";

import { sUserInsert } from "./user/service.js";
import { UserRole } from "./shared/enums/userRole.js";

import retailRouter from "./retail/routes.js";
import authRouter from "./shared/auth/routes.js";
import userRouter from "./user/routes.js";
import categoryRouter from "./category/routes.js";
import subCategoryRouter from "./subCategory/routes.js";
import productRouter from "./product/routes.js";
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
  if (config.ORM_NEW_SCHEMA === true) {
    console.log(`\n Dropping and re-creating database schema`);
    await newSchema();
    console.log(`\n Creating default administrator user`);
    await RequestContext.create(orm.em, async () => {
      await sUserInsert({
        userName: "admin",
        userPassword: "admin",
        userRole: UserRole.administrator,
      });
    });
  }
  if (config.ORM_SYNC_SCHEMA === true) {
    console.log(`\n Syncing database schema`);
    await syncSchema();
  }

  // Swagger OpenAPI Setup (Show APIs documentation in http://DATABASE_HOST:PORT/docs)
  console.log(`\n Starting OpenAPI Swagger documentation`);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  app.use("/category", categoryRouter);
  app.use("/retail", retailRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/subCategory", subCategoryRouter);
  app.use("/product", productRouter);

  // Publish service
  console.log(`\n Publishing service`);
  app.listen(config.PORT, () => {
    console.log(
      `\n Server started. Refer to http://${config.DATABASE_HOST}:${config.PORT}/docs for API documentation`
    );
  });
}

await start();
