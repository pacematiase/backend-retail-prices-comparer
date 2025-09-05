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
      ORM_SYNC_SCHEMA: string;
      ORM_NEW_SCHEMA: string;
      JWT_EXPIRES_IN: string;
      BCRYPT_SALT: string;
    }
  }
}
