import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export {};

// types of environment variables for local implementation

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_DEBUG: string;
      ORM_SYNC_SCHEMA: string;
      ORM_NEW_SCHEMA: string;
      JWT_EXPIRES_IN: string;
      BCRYPT_SALT: string;
    }
  }
}

console.log(
  `\n Configuring environment variables. Selected environment: ${
    process.env.NODE_ENV || 'local'
  }`
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(
  __dirname,
  `../../../.env.${process.env.NODE_ENV || 'local'}`
);

dotenv.config({
  path: envPath,
  quiet: true,
});

export const config = {
  PORT: parseInt(process.env.PORT),
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT),
  DATABASE_DEBUG:
    process.env.DATABASE_DEBUG === 'true' &&
    process.env.NODE_ENV !== 'production'
      ? true
      : false,
  ORM_SYNC_SCHEMA:
    process.env.ORM_SYNC_SCHEMA === 'true' &&
    process.env.NODE_ENV !== 'production'
      ? true
      : false,
  ORM_NEW_SCHEMA:
    process.env.ORM_NEW_SCHEMA === 'true' &&
    process.env.NODE_ENV !== 'production'
      ? true
      : false,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN),
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT),
};
