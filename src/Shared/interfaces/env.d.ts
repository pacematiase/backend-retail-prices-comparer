export {};

// types of environment variables for local implementation

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
    }
  }
}
