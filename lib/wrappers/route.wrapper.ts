import 'reflect-metadata';
import { MetaRoute, RouteOptions } from '../shared/interfaces/route.interface';
import { ApiMethods } from '../shared/constants/api-method.constant';
import { MetaKeys } from '../shared/constants/metaKeys.constant';
import { Middleware } from '../shared/custom-types/middleware.type';
import { Header } from '../shared/interfaces/decorators/headers.interface';
import { _controllers } from '../easy-router';

interface Items {
  options: RouteOptions;
  methodType: ApiMethods;
  path: string;
}

export function RouteWrapper(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  items: Items
): void {
  const apis: MetaRoute[] = Reflect.getMetadata(MetaKeys.routes, target) || [];

  items.path = items.path || '';

  const originallyMethod = descriptor.value;

  const middlewares: Middleware[] = items.options?.middlewares || [];

  const headers: Header[] =
    Reflect.getMetadata(MetaKeys.headers, target[propertyKey]) || [];

  //wrapper
  descriptor.value = async function (...args: any[]) {
    const [req, res] = args;

    headers.length &&
      headers.forEach((header: Header) => {
        res.setHeader(header.key, header.value);
      });

    const properties: object = _controllers.find(
      (control) => control.constructor == target.constructor
    );
    const returnType = Reflect.getMetadata(
      'design:returntype',
      target,
      propertyKey
    );

    if (returnType && returnType.name == 'Promise') {
      const out = await originallyMethod.apply(properties, args);
      res.send(out);
    } else if (returnType && returnType.name != 'Promise') {
      const out = originallyMethod.apply(properties, args);
      res.send(out);
    } else {
      const value = await originallyMethod.apply(properties, args);
      if (value) res.send(value);
    }
  };

  apis.push({
    method: items.methodType,
    path: items.path,
    handler: descriptor.value,
    middlewares: middlewares
  });
  Reflect.defineMetadata(MetaKeys.routes, apis, target);
}
