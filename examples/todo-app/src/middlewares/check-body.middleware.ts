import { NextFunction, Request, Response } from 'express';

export function CheckBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.keys(req.body).length < 1) res.status(400).send('INVALID_BODY');
  else next();
}
