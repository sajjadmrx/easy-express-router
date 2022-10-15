import {RouteOptions} from "../../shared/interfaces/route.interface";
import {RouteHandler} from "../../handlers/route.handler";
import {ApiMethods} from "../../shared/constants/api-method.constant";

export function Get(path: string, options?: RouteOptions) {
    return RouteHandler.bind(this)(ApiMethods.GET, path, options)
}

export function Post(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.POST, path, options)
}

export function Put(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.PUT, path, options)
}

export function Patch(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.PATCH, path, options)
}

export function Delete(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.DELETE, path, options)
}

export function Head(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.HEAD, path, options)
}

export function Options(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.OPTIONS, path, options)
}