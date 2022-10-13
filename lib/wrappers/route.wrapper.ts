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

        const [req, res] = args;
        const returnType = Reflect.getMetadata('design:returntype', target, propertyKey)

        if (returnType && returnType.name == 'Promise') {
            const out = await originallyMethod.apply(this, args)
            res.send(out)

        } else if (returnType && returnType.name != 'Promise') {
            const out = originallyMethod.apply(this, args)
            res.send(out)
        } else {
            const value = await originallyMethod.apply(this, args)//void
            if (value)
                res.send(value)
        }
    }


    apis.push({
        routeType: items.methodType,
        path: items.path,
        method: descriptor.value,
        middlewares: middlewares
    })
    Reflect.defineMetadata(MetaKeys.routes, apis, target)

}