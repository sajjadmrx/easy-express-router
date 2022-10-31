import axios from 'axios';
import { TodoController } from './todo.controller';
import { TodoRepository } from '../repositories/todo.repository';

//repositories
const todoRepository: TodoRepository = new TodoRepository(
  axios.create({ baseURL: 'https://reqres.in/api/todos' })
);

//controllers
const todoController: TodoController = new TodoController(todoRepository);

export const controllers: Object[] = [todoController];
