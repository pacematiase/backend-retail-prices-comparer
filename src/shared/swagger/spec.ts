import { config } from "../env/env.js";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    security: [{ bearerAuth: [] }],
    info: {
      title: "Retail prices comparer",
      version: "1.0.1",
      description: `
# Welcome to Retail prices comparer (backend app)

## Getting Started

- Base URL: \`http://${config.DATABASE_HOST}:${config.PORT}\`
- All endpoints accept and return JSON.

## Authentication

To access protected endpoints:

1. Call **POST /auth/login** with your credentials to obtain a JWT token.
2. Include the token in the **Authorization header** of subsequent requests:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

> Note: This documentation is auto-generated from JSDoc comments.
      `,
    },

    // Tags: To group APIs by title

    tags: [
      {
        name: "Auth",
        description: "Authentication functions",
      },
      {
        name: "Retail",
        description: "Retails CRUD",
      },
      {
        name: "User",
        description: "Users CRUD",
      },
      {
        name: "Category",
        description: "Categories CRUD",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // .ts files from which to get the API descriptions.

  apis: ["./src/**/routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
