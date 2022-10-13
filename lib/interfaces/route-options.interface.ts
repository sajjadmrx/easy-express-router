import {Router, Request, Response, NextFunction} from 'express';


type Middleware = (req: Request, Response: Response, next: NextFunction) => any

export interface RouteOptions {
    middlewares: Middleware[],
}