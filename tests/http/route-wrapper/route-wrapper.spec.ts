import request from 'supertest'
import express from "express";
import bodyParser from "body-parser";

import {EasyRouter} from '../../../index'
import {RouteWrapper} from "../../../lib/wrappers/route.wrapper";
import {PostsController} from "./posts.controller";
import {postsDB} from "./db";


const app = express();
app.use(bodyParser.json())


const postsController = new PostsController(postsDB)

EasyRouter.setControllers([postsController])
app.use(EasyRouter.initControllers())


describe('RouteWrapper', function () {
    it('should defined', () => {
        expect(RouteWrapper)
            .toBeDefined()
    })

    it("should response postId with 'return'", async () => {
        const response = await request(app)
            .get('/posts')
            .set('Accept', 'application/json');

        expect(response.body).toEqual({postId: 1})
    })

    it('should not called automatics response methods in wrapper when use res', async () => {
        const response = await request(app)
            .get('/posts/2')
            .set('Accept', 'application/json');
        expect(response.body).toEqual({postId: 2})
    })

    it('should update title and responds with automatics response methods in wrapper', async () => {
        const response = await request(app)
            .put('/posts/2/title')
            .set('Accept', 'application/json')
            .send({title: 'iphone 14'})
        expect(response.body).toEqual({
            postId: 2,
            title: 'iphone 14'
        })
    })
    it('should use dependency Injection data', async () => {
        const response = await request(app)
            .get("/posts/db");
        expect(response.body).toEqual(postsDB)
    })
});