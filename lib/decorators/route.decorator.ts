import {RouteOptions} from "../interfaces/route-options.interface";
import {Router, Request, Response, NextFunction} from 'express';
const router = Router()

export function Route(option:RouteOptions){
    return (target:any,propertyKey:string,descriptor)=>{
        if (option.middlewares.length) {
            (router as any)[option.method](option.path,option.middlewares.map(m=>m),target[propertyKey])
            //ex: router.get(path,mid1,mid2,controller)
        }
        else
            (router as any)[option.method](option.path,target[propertyKey])
        
    }
}
export const easyRouter = router