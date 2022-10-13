import 'reflect-metadata'
import {MetaRoute, RouteOptions} from "../shared/interfaces/route.interface";
import {ApiMethods} from "../shared/constants/api-method.constant";
import {MetaKeys} from "../shared/constants/metaKeys.constant";

export function RouteWrapper(target: Function, propertyKey: string, descriptor: PropertyDescriptor, items: {
    options: RouteOptions,
    methodType: ApiMethods
}) {

    const apis: MetaRoute[] = Reflect.getMetadata(MetaKeys.routes, target) || [];


    items.options.path = items.options.path || '/';


    const originallyMethod = descriptor.value;

    //wrapper
    descriptor.value = async function (...args: any[]) {
        originallyMethod.apply(this, args)
    }


    apis.push({
        routeType: items.methodType,
        path: items.options.path,
        method: descriptor.value,
        middlewares: items.options.middlewares
    })
    Reflect.defineMetadata(MetaKeys.routes, apis, target)

}