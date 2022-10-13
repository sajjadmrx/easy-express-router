import 'reflect-metadata';

import {PrefixRouteOptions} from "../../shared/interfaces/route.interface";
import {RouteMetaKeys} from "../../shared/constants/route-metaKeys.constant";

export function Controller(prefix: string, options?: PrefixRouteOptions) {
    return (target: Function) => {
        if (!prefix)
            prefix = '/';

        if (!prefix.startsWith('/'))
            prefix = `/${prefix}`;


        Reflect.defineMetadata(RouteMetaKeys.PREFIX, prefix, target.prototype)
        Reflect.defineMetadata(RouteMetaKeys.PREFIX_OPTIONS, options, target.prototype)
    }
}