import jwt from 'jsonwebtoken';

// to generate a secret key, run node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h'; // token expiry

interface JwtPayload {
  userId: string;
  userRole: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
