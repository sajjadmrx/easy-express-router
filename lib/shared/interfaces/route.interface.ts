import {Middleware} from "../custom-types/middleware.type";

export interface RouteOptions {
    middlewares: Middleware[],
}

export interface PrefixRouteOptions extends Pick<RouteOptions, 'middlewares'> {

}