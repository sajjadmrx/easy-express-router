import {RouteOptions} from "../../shared/interfaces/route.interface";
import {RouteHandler} from "../../handlers/route.handler";
import {ApiMethods} from "../../shared/constants/api-method.constant";

export function Get(path: string, options?: RouteOptions) {
    return (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {
        options.path = path
        return RouteHandler(ApiMethods.GET, options)
    }
}

export function Post(path: string, options?: RouteOptions) {
    return (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {
        options.path = path
        return RouteHandler(ApiMethods.POST, options)
    }
}