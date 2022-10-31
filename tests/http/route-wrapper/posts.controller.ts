import { Controller, Get, Put } from '../../../lib/decorators';
import { Request, Response } from 'express';
import { wait } from '../../shared/tools/wait';

@Controller('posts')
export class PostsController {
  constructor(private db: any[]) {}

  @Get('/db')
  async fetchDB() {
    return this.db;
  }

  @Get('/')
  findAll() {
    return {
      postId: 1
    };
  }

  @Get('/:id')
  async findOne(req: Request, res: Response): Promise<void> {
    res.json({ postId: Number(req.params.id) });
  }

  @Put('/:id/title')
  async updateTitle(req: Request, res: Response): Promise<any> {
    const title = req.body.title;
    await wait(1000);
    return {
      postId: Number(req.params.id),
      title: title
    };
  }
}
