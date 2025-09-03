import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    security: [{ bearerAuth: [] }],
    info: {
      title: 'Retail prices comparer',
      version: '1.0.0',
      description: `
# Welcome to Retail prices comparer (backend app)

## Getting Started

- Base URL: \`http://${process.env.DATABASE_HOST}:${process.env.PORT}\`
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
    tags: [
      {
        name: 'Authentication',
        description: 'Operation to get an access token',
      },
      {
        name: 'Retail',
        description: 'Retail CRUD',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/**/routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
