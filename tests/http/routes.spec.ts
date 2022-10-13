import {Controller, EasyRouter, Get, Patch, Put} from '../../index'
import request from 'supertest'

import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {Middleware} from "../../lib/shared/custom-types/middleware.type";

const app = express();

app.use(bodyParser.json())

let usersDB = [{
    id: 1,
    username: 'sajjadmrx',
    avatar: 'https://random.com/xx.png'
}]

const checkBodyMiddleware: Middleware = (req: Request, res: Response, next: NextFunction) => {
    if (!Object.values(req.body).length)
        res.status(400).send('INVALID_BODY')
    else
        next()
}

@Controller('/users')
class Users {

    @Get('/')
    findAll(req: Request, res: Response) {
        res.status(200).json([])
    }

    @Get('/:userId')
    findByUserId(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        res.status(200).json(user)
    }

    @Put(':userId/username')
    updateRole(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        user.username = 'test';
        res.status(200).json(user)
    }

    @Patch(':userId', {
        middlewares: [checkBodyMiddleware]
    })
    update(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        user.avatar = 'AVATAR';
        user.username = 'test'
        res.status(200).json(user)
    }
}


EasyRouter.setControllers([new Users()])

describe('Http', function () {
    beforeEach(() => {
        app.use(EasyRouter.initControllers())
    })


    describe('Get', function () {


        it('should responds 200', (done) => {
            request(app)
                .get('/users')
                .expect(200, done)
        })

        it('should responds 200 and user by UserId', (done) => {
            request(app)
                .get('/users/1')
                .expect(200, usersDB[0], done)

        })
    });

    describe('Put', function () {
        it("should update username and responds 200", (done) => {
            const user = usersDB[0];
            user.username = 'test'
            request(app)
                .put('/users/1/username')
                .expect(200, user, done)
        })
    });


    describe('middleware', function () {
        it('should responds 400 when body is empty', (done) => {
            request(app)
                .patch('/users/1')
                .expect(400, done)
        })
        it("should responds 200 and call next in to middleware", (done) => {
            request(app)
                .patch('/users/1')
                .send({username: 'mrx'})
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    });


});