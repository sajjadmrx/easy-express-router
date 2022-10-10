import {Router, Request, Response, NextFunction} from 'express';


type Middleware = (req: Request, Response: Response, next: NextFunction) => any

export interface RouteOptions{
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'search' | 'connect' | 'all' | 'copy';
    middlewares: Middleware[],
}