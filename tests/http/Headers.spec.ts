import {Controller, EasyRouter, Get, Headers} from '../../index'
import request from 'supertest'

import express from "express";
import bodyParser from "body-parser";
import {Header} from "../../lib/shared/interfaces/decorators/headers.interface";

const app = express();

app.use(bodyParser.json())

const customHeaders: Header[] = [
    {key: 'content-type', value: 'application/json'},
    {key: 'custom-header', value: 'hi'},
    {key: 'access-control-allow-origin', value: '*'}
]

@Controller('todos')
class Todo {

    @Get('')
    @Headers({key: 'access-control-allow-origin', value: '*'})
    find() {
        return []
    }

    @Get('/:id')
    @Headers(customHeaders)
    findOne() {
        return {}
    }

}

EasyRouter.setControllers([new Todo()])
app.use(EasyRouter.initControllers())
describe('http Headers()', function () {
    it('should headers have access-control-allow-origin', async () => {
        const response = await request(app)
            .get('/todos');
        expect(response.headers)
            .toEqual(expect.objectContaining({'access-control-allow-origin': '*'}))
    })
    it('should headers have customHeaders item', async () => {
        const response = await request(app)
            .get('/todos/1');

        expect(response.headers)
            .toEqual(expect.objectContaining({
                'access-control-allow-origin': '*',
                'custom-header': 'hi'
            }))
    })
});