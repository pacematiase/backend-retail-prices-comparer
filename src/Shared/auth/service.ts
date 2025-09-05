import { config } from '../env/env.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../enums/userRole.js';
import { sUserGetHashedPassword } from '../../user/service.js';
import { ControllerResponse } from '../classes/controllerResponse.js';

// to generate a secret key, run node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN;
const BCRYPT_SALT = config.BCRYPT_SALT; // Higher = safer & slower

interface AuthRequest extends Request {
  userId?: string;
  userRole?: UserRole;
}

interface JwtPayload {
  userId: string;
  userRole: UserRole;
}

export async function sHashPassword(userPassword: string) {
  return bcrypt.hash(userPassword, BCRYPT_SALT);
}

export async function sAuthLogin(item: {
  userName: string;
  userPassword: string;
}): Promise<ControllerResponse<{ token: string } | null>> {
  try {
    let generateToken = false;
    const user = await sUserGetHashedPassword({ userName: item.userName });
    if (user.data) {
      generateToken = await bcrypt.compare(
        item.userPassword,
        user.data.userPassword
      );
    }
    if (user.data && generateToken === true) {
      const token = jwt.sign(
        {
          userId: user.data.userId,
          userRole: user.data.userRole,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      return new ControllerResponse(
        200,
        'Authentication was successful',
        null,
        {
          token: token,
        }
      );
    }
    return new ControllerResponse(
      401,
      'Either the user does not exist or the password is incorrect',
      '',
      null
    );
  } catch (err) {
    return new ControllerResponse(
      500,
      'There was an unexpected error',
      JSON.stringify(err),
      null
    );
  }
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
