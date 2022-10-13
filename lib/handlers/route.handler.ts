import {ApiMethods} from "../shared/constants/api-method.constant";
import {RouteOptions} from "../shared/interfaces/route.interface";
import {RouteWrapper} from "../wrappers/route.wrapper";

export function RouteHandler(methodType: ApiMethods, path: string, options?: RouteOptions) {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
        RouteWrapper(target, propertyKey, descriptor, {options, methodType, path})
    }
}