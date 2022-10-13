import 'reflect-metadata';
import {Controller} from "../../../lib/decorators/route/controller.decorator";
import {RouteMetaKeys} from "../../../lib/constants/route-metaKeys.constant";

describe('Controller()', function () {
    it('should defined', () => {
        expect(Controller)
    })
    it("should set prefix to '/' when prefix is falsy", () => {
        @Controller('')
        class myClass {
        }


        expect(Reflect.getMetadata(RouteMetaKeys.PREFIX, myClass.prototype))
            .toBe('/')
    })
    it("should add '/' to prefix when prefix not starts with '/'", () => {
        @Controller('users')
        class User {

        }

        expect(Reflect.getMetadata(RouteMetaKeys.PREFIX, User.prototype))
            .toBe('/users')
    })
});
