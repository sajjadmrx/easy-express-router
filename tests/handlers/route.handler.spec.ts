import 'reflect-metadata'
import {RouteHandler} from "../../lib/handlers/route.handler";
import {ApiMethods} from "../../lib/shared/constants/api-method.constant";

import {MetaKeys} from "../../lib/shared/constants/metaKeys.constant";
import {Get} from "../../lib/decorators/route/methods.decorator";


describe('RouteHandler()', function () {

    it('should defined', () => {
        expect(RouteHandler).toBeDefined()
    })
    it('should push api', () => {

        class Users {
            @Get('users')
            find() {
            }
        }

        expect(Reflect.getMetadata(MetaKeys.routes, Users.prototype))
            .toHaveLength(1)

        Reflect.deleteMetadata(MetaKeys.routes, Users)
    })
});
