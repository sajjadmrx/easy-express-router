import 'reflect-metadata'
import express, {Router} from 'express'
import bodyParser from "body-parser";


import {RouteMetaKeys} from "./shared/constants/route-metaKeys.constant";
import {MetaRoute, PrefixRouteOptions} from "./shared/interfaces/route.interface";
import {MetaKeys} from "./shared/constants/metaKeys.constant";
import {Middleware} from "./shared/custom-types/middleware.type";
import {InitControllerOptions} from "./shared/interfaces/easyRouter.interface";

const easyExpress = express.Router()


export let _controllers: Array<object> = []

export class EasyRouter {

    static setControllers(controllers: object[]) {
        _controllers = controllers
    }


    static initControllers(options?: InitControllerOptions): Router {
        if (!_controllers.length)
            throw new Error('please first use set Controllers [EasyRouter.setControllers]')

        if (options) {
            if (options.bodyParser)
                easyExpress.use(bodyParser.json());
        }

        _controllers.forEach((controller: any) => {

            const prefix: string = Reflect.getMetadata(RouteMetaKeys.PREFIX, controller);
            const prefixOptions: PrefixRouteOptions = Reflect.getMetadata(RouteMetaKeys.PREFIX_OPTIONS, controller)

            const routes: MetaRoute[] = Reflect.getMetadata(MetaKeys.routes, controller) || []

            const prefixMiddlewares: Middleware[] = prefixOptions?.middlewares || []

            routes.forEach((route: MetaRoute) => {
                let path: string = route.path;
                if (path && path.startsWith('/')) {
                    path = path.substring(1)
                }
                if (route.middlewares.length || prefixMiddlewares.length) {

                    const middlewares: Middleware[] = [...new Set([...prefixMiddlewares, ...route.middlewares])];

                    (easyExpress as any)[route.routeType](`${prefix}/${path}`, middlewares, route.method)

                } else
                    (easyExpress as any)[route.routeType](`${prefix}/${path}`, route.method)
            })

        })
        return easyExpress
    }
}
