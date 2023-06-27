import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: {
    _id?: string;
    First_name?: string;
    Last_name?: string;
    Email?: string;
    Password?: string;
    habilitado?: boolean;
    __v?: number;
  };
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader:string = req.headers.authorization || req.headers.Authorization;

  if (!Array.isArray(authHeader) && !authHeader.startsWith('Bearer ')) {
     res.sendStatus(401);
  }



  let token: string = '';

  if(typeof authHeader === 'string'){
    authHeader.split(' ')[1]
  }

 

  const tokenSecret: Secret = process.env.TOKEN_SECRET || '';

  jwt.verify(token, tokenSecret, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      return res.sendStatus(403);
    }
    if (typeof decoded === 'string') {
      // decoded es una cadena, no tiene la propiedad user
      next();
    } else if(decoded) {
      // decoded es un objeto con la propiedad user
      req.user = decoded.user as {
        _id?: string;
        First_name?: string;
        Last_name?: string;
        Email?: string;
        Password?: string;
        habilitado?: boolean;
        __v?: number;
      };
      next();
    }
  });
};

export default verifyJWT;
