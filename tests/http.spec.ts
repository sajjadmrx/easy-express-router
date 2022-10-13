import {Controller, EasyRouter, Get} from '../lib'
import request from 'supertest'

import express, {Request, Response} from "express";

const app = express();

@Controller('/users')
class Users {

    @Get('')
    findAll(req: Request, res: Response) {
        res.status(200).json([])
    }
}


EasyRouter.setControllers([new Users()])


describe('Http', function () {
    beforeEach(() => {
        app.use(EasyRouter.initControllers())
    })
    it('should responds 200', (done) => {
        request(app)
            .get('/users')
            .expect(200, done)
    })
});