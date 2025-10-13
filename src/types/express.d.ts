// Added to Request interface fields userId and userRole so that they can be understood by TypeScript

import { UserRole } from '../shared/enums/userRole';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    userRole?: UserRole;
  }
}


import { UserRole } from '../shared/enums/userRole';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRole;
    }
  }
}
