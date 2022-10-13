import 'reflect-metadata'
import {MetaRoute, RouteOptions} from "../shared/interfaces/route.interface";
import {ApiMethods} from "../shared/constants/api-method.constant";
import {MetaKeys} from "../shared/constants/metaKeys.constant";
import {Middleware} from "../shared/custom-types/middleware.type";

export function RouteWrapper(target: object, propertyKey: string, descriptor: PropertyDescriptor, items: {
    options: RouteOptions,
    methodType: ApiMethods,
    path: string
}) {

    const apis: MetaRoute[] = Reflect.getMetadata(MetaKeys.routes, target) || [];


    items.path = items.path || '';


    const originallyMethod = descriptor.value;

    const middlewares: Middleware[] = items.options?.middlewares || []

    //wrapper
    descriptor.value = async function (...args: any[]) {
        originallyMethod.apply(this, args)
    }


    apis.push({
        routeType: items.methodType,
        path: items.path,
        method: descriptor.value,
        middlewares: middlewares
    })
    Reflect.defineMetadata(MetaKeys.routes, apis, target)

}