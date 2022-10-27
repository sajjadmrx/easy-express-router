import {EasyRouter, Get, Put} from '../../../index'
import request from 'supertest'
import express from "express";
import bodyParser from "body-parser";
import {UsersController} from "./users.controller";
import {usersDB} from "./db";

const app = express();
app.use(bodyParser.json())

const usersController = new UsersController()
EasyRouter.setControllers([usersController])

describe('Routes', function () {

    beforeEach(() => {
        app.use(EasyRouter.initControllers())
    })


    describe('Get', function () {


        it('should responds 200', async () => {
            const response = await request(app)
                .get('/users');
            expect(response.status).toBe(200)
        })

        it('should responds user by UserId', async () => {
            const response = await request(app)
                .get('/users/1')
            expect(response.body).toEqual(usersDB[0])
        })
    });

    describe('Put', function () {
        it("should update username and responds 200", async () => {
            const user = usersDB[0];
            user.username = 'test'
            const response = await request(app)
                .put('/users/1/username')
            expect(response.status).toBe(200)
        })
    });


    describe('middleware', function () {
        it('should responds 400 when body is empty', async () => {
            const response = await request(app)
                .patch('/users/1');
            expect(response.status).toBe(400)
        })
        it("should responds 200 and call next() in middleware", async () => {
            const response = await request(app)
                .patch('/users/1')
                .send({username: 'mrx'})
                .set('Accept', 'application/json');
            expect(response.status).toBe(200)
        })
    });


});