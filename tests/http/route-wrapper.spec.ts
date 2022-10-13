import {Controller, EasyRouter, Get, Patch, Put} from '../../index'
import request from 'supertest'

import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {RouteWrapper} from "../../lib/wrappers/route.wrapper";

const wait = (ms: number) => new Promise((res, rej) => setTimeout(() => res(true), ms))

const app = express();
app.use(bodyParser.json())

const postsDB: any[] = []

@Controller('posts')
class Posts {

    constructor(private db: any[]) {
    }

    @Get('')
    findAll() {
        return {
            postId: 1
        }
    }

    @Get('/:id')
    async findOne(req: Request, res: Response): Promise<void> {
        res.json({postId: Number(req.params.id)})
    }

    @Put('/:id/title')
    async updateTitle(req: Request, res: Response): Promise<any> {
        const title = req.body.title;
        await wait(1000)
        return {
            postId: Number(req.params.id),
            title: title
        }
    }

}

EasyRouter.setControllers([new Posts(postsDB)])
app.use(EasyRouter.initControllers())
describe('RouteWrapper', function () {
    it('should defined', () => {
        expect(RouteWrapper)
            .toBeDefined()
    })

    it("should responds postId with 'return'", async () => {
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
});