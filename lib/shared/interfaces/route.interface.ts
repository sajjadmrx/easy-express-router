import { Middleware } from '../custom-types/middleware.type';
import { ApiMethods } from '../constants/api-method.constant';

export interface RouteOptions {
  middlewares: Middleware[];
}

export type PrefixRouteOptions = Pick<RouteOptions, 'middlewares'>;

export interface MetaRoute extends Pick<RouteOptions, 'middlewares'> {
  method: ApiMethods;
  path: string;
  handler: any;
}
