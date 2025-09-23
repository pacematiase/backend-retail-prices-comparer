// Test setup file for Jest
import "reflect-metadata";

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore console.log in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
process.env.JWT_EXPIRES_IN = "3600";
process.env.BCRYPT_SALT = "10";
process.env.DATABASE_HOST = "localhost";
process.env.DATABASE_PORT = "3306";
process.env.DATABASE_NAME = "test_db";
process.env.DATABASE_USER = "test_user";
process.env.DATABASE_PASSWORD = "test_password";
process.env.DATABASE_DEBUG = "false";
process.env.ORM_SYNC_SCHEMA = "false";
process.env.ORM_NEW_SCHEMA = "false";
