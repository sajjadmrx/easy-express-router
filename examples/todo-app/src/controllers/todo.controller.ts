import {Controller, Delete, Get, HttpStatus, Post} from "easy-express-router";
import {TodoRepository} from "../repositories/todo.repository";
import {Request, Response} from "express";
import {Todo} from "../interfaces/todo.interface";
import {CheckBodyMiddleware} from "../middlewares/check-body.middleware";
import {AuthMiddleware} from "../middlewares/auth.middleware";

@Controller('todos', {
    middlewares: [AuthMiddleware]
})
export class TodoController {
    constructor(private dbRepository: TodoRepository) {
    }

    @Get('/')
    async find() {
        return this.dbRepository.find()
    }

    @Get('/:id')
    async findOne(req: Request, res: Response) {
        return this.dbRepository.findById(Number(req.params.id))
    }

    @Get('/:id/year')
    async getYearByTodoId(req: Request, res: Response) {
        const todo: Todo | undefined = await this.dbRepository.findById(Number(req.params.id));
        if (!todo) {
            res.status(404);
            return 'Todo Not Found'
        }
        return {
            year: todo.year
        }
    }

    @Post('/', {middlewares: [CheckBodyMiddleware]})
    async create(req: Request, res: Response) {
        const data = req.body;
        const todo = await this.dbRepository.create(data)
        res.json(todo)
        //call logger;
    }

    @Delete(':id')
    async delete(req: Request, res: Response): Promise<void> {
        const todoId: number = Number(req.params.id);
        const deletedCount: number = await this.dbRepository.deleteById(todoId);
        if (deletedCount >= 1) {
            res.status(HttpStatus.OK)
                .send('Success');
        } else {
            res.status(HttpStatus.NOT_FOUND)
                .send('todo not found!')
        }
    }

}