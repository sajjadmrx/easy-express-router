import {NextFunction, Response, Request} from "express";

export type Middleware = (req: Request, Response: Response, next: NextFunction) => any
