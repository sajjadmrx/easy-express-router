import {RouteOptions} from "../../shared/interfaces/route.interface";
import {RouteHandler} from "../../handlers/route.handler";
import {ApiMethods} from "../../shared/constants/api-method.constant";

export function Get(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.GET, path, options)
}

export function Post(path: string, options?: RouteOptions) {
    return RouteHandler(ApiMethods.POST, path, options)
}