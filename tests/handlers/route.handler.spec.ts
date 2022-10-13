import 'reflect-metadata'
import {RouteHandler} from "../../lib/handlers/route.handler";
import {ApiMethods} from "../../lib/shared/constants/api-method.constant";

import {MetaKeys} from "../../lib/shared/constants/metaKeys.constant";


describe('RouteHandler()', function () {

    it('should defined', () => {
        expect(RouteHandler).toBeDefined()
    })
    it('should push api', () => {
        function Users() {
        }

        RouteHandler(ApiMethods.GET, 'users', {middlewares: []})(Users, 'find', {} as any)

        expect(Reflect.getMetadata(MetaKeys.routes, Users))
            .toHaveLength(1)

        Reflect.deleteMetadata(MetaKeys.routes, Users)
    })
});
