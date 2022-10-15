import express, {Router} from 'express'
import {RouteMetaKeys} from "./shared/constants/route-metaKeys.constant";
import {MetaRoute, PrefixRouteOptions} from "./shared/interfaces/route.interface";
import {MetaKeys} from "./shared/constants/metaKeys.constant";
import {Middleware} from "./shared/custom-types/middleware.type";

const easyExpress = express.Router()


export let _controllers: Array<object> = []

export class EasyRouter {

    static setControllers(controllers: object[]) {
        _controllers = controllers
    }


    static initControllers(): Router {
        if (!_controllers.length)
            throw new Error('please first use set Controllers [EasyRouter.setControllers]')

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
