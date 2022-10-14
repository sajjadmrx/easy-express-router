import 'reflect-metadata'
import {MetaKeys} from "../../shared/constants/metaKeys.constant";
import {Header} from "../../shared/interfaces/decorators/headers.interface";

export function Headers(_headers: Header)
export function Headers(_headers: Array<Header>)
export function Headers(_headers: Header | Array<Header>) {
    return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!Array.isArray(_headers))
            _headers = [_headers]
        Reflect.defineMetadata(MetaKeys.headers, _headers, target[propertyKey])
    }
}