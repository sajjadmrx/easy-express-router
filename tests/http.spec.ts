import {Controller, EasyRouter, Get, Put} from '../lib'
import request from 'supertest'

import express, {Request, Response} from "express";

const app = express();


let usersDB = [{
    id: 1,
    username: 'sajjadmrx',
    avatar: 'https://random.com/xx.png'
}]

@Controller('/users')
class Users {

    @Get('/')
    findAll(req: Request, res: Response) {
        res.status(200).json([])
    }

    @Get('/:userId')
    findByUserId(req: Request, res: Response) {
        //User.findOne({userId:req.params.userId})
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        res.status(200).json(user)
    }

    @Put(':userId/username')
    updateRole(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        user.username = 'test';
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

});