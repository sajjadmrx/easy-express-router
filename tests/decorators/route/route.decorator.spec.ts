import 'reflect-metadata'
import {NextFunction, Request, Response} from "express";


import {Get, Post, Controller} from "../../../lib/decorators";
import {MetaKeys} from "../../../lib/shared/constants/metaKeys.constant";
import {MetaRoute} from "../../../lib/shared/interfaces/route.interface";
import {ApiMethods} from "../../../lib/shared/constants/api-method.constant";

describe('Routes', function () {

    describe('Get()', function () {
        it('should push Get api without middlewares', () => {
            @Controller('users')
            class User {

                @Get('/me')
                profile() {
                }
            }

            const myData: MetaRoute = {
                path: '/me',
                routeType: ApiMethods.GET,
                middlewares: [],
                method: User.prototype.profile
            }

            const metaData = Reflect.getMetadata(MetaKeys.routes, User.prototype)

            expect(metaData)
                .toEqual([myData])


        })
        it('should push Get Api With middlewares', () => {
            const checkRole = (req: Request, res: Response, next: NextFunction) => {
                //--- check role
                next()
            }

            class Users {

                @Get('/:userId', {middlewares: [checkRole]})
                findUser() {
                }

            }

            const myData: MetaRoute = {
                path: '/:userId',
                routeType: ApiMethods.GET,
                middlewares: [checkRole],
                method: Users.prototype.findUser
            }

            const metaData = Reflect.getMetadata(MetaKeys.routes, Users.prototype)

            expect(metaData)
                .toEqual([myData])


            Reflect.deleteMetadata(MetaKeys.routes, Users.prototype)

        })
    });

    describe('Post()', function () {
        it('should push Post api ', () => {
            class Users {
                @Post('/:userId')
                update() {
                }
            }

            const myData: MetaRoute = {
                path: '/:userId',
                routeType: ApiMethods.POST,
                middlewares: [],
                method: Users.prototype.update
            }

            const metaData = Reflect.getMetadata(MetaKeys.routes, Users.prototype)
            expect(metaData)
                .toEqual([myData])


        })
    });
});