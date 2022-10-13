import express, {Router} from 'express'
import {RouteMetaKeys} from "./shared/constants/route-metaKeys.constant";
import {MetaRoute, PrefixRouteOptions} from "./shared/interfaces/route.interface";
import {MetaKeys} from "./shared/constants/metaKeys.constant";
import {Middleware} from "./shared/custom-types/middleware.type";

const easyExpress = express.Router()


let _controllers: Array<object> = []

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

            const routes: MetaRoute[] = Reflect.getMetadata(MetaKeys.routes, controller);

            const prefixMiddlewares: Middleware[] = prefixOptions?.middlewares || []

            routes.forEach((route: MetaRoute) => {
                if (route.middlewares.length || prefixMiddlewares.length) {

                    const middlewares: Middleware[] = [...new Set([...route.middlewares, ...prefixMiddlewares])];

                    (easyExpress as any)[route.routeType](`${prefix}/${route.path}`, middlewares, route.method)

                } else
                    (easyExpress as any)[route.routeType](`${prefix}/${route.path}`, route.method)
            })

        })
        return easyExpress
    }
}
