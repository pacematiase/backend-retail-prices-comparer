// Added to Request interface fields userId and userRole so that they can be understood by TypeScript

import { UserRole } from '../shared/enums/userRole';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    userRole?: UserRole;
  }
}
