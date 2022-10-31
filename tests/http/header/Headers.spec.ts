import { EasyRouter } from '../../../index';
import request from 'supertest';

import express from 'express';
import bodyParser from 'body-parser';
import { TodosController } from './todos.controller';

const app = express();

app.use(bodyParser.json());

const todosController = new TodosController();

EasyRouter.setControllers([todosController]);
app.use(EasyRouter.initControllers());

describe('http Headers()', function () {
  it('should headers have access-control-allow-origin', async () => {
    const response = await request(app).get('/todos');
    expect(response.headers).toEqual(
      expect.objectContaining({ 'access-control-allow-origin': '*' })
    );
  });
  it('should headers have customHeaders item', async () => {
    const response = await request(app).get('/todos/1');

    expect(response.headers).toEqual(
      expect.objectContaining({
        'access-control-allow-origin': '*',
        'custom-header': 'hi'
      })
    );
  });
});
