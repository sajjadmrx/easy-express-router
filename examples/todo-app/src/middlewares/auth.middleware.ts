import { NextFunction, Request, Response } from 'express';

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string = req.headers.authorization;
  if (!token) {
    res.status(401).send('Unauthorized');
  } else {
    //check token;
    next();
  }
}
