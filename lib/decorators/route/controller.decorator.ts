import 'reflect-metadata';

import {RouteOptions} from "../../interfaces/route-options.interface";
import {RouteMetaKeys} from "../../constants/route-metaKeys.constant";

export function Controller(prefix: string, options?: RouteOptions) {
    return (target: any) => {
        if (!prefix)
            prefix = '/';

        if (!prefix.startsWith('/'))
            prefix = `/${prefix}`;


        Reflect.defineMetadata(RouteMetaKeys.PREFIX, prefix, target.prototype)
        Reflect.defineMetadata(RouteMetaKeys.PREFIX_OPTIONS, options, target.prototype)
    }
}