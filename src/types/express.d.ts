// Added to Request interface fields userId and userRole so that they can be understood by TypeScript

import { UserRole } from '../shared/enums/userRole';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRole;
    }
  }

  interface JwtPayload {
    userId: number;
    userRole: UserRole;
  }
  
  interface HashedPasswordPayload {
  userId: number;
  userRole: UserRole;
  userPassword: string;
}
}

export {};