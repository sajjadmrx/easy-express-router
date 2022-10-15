import axios, {Axios} from 'axios'
import {Todo} from "../interfaces/todo.interface";


export class TodoRepository {

    constructor(private myAxios: Axios) {
    }

    async find(): Promise<Todo[]> {
        const result = await this.myAxios.get('/');
        return result.data.data
    }

    async findById(id: number): Promise<Todo | undefined> {
        const result = await this.myAxios.get(`/${id}`);
        return result.data.data
    }

    async create(data: Todo): Promise<Todo> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(data)
            }, 1000)
        })
    }

    async deleteById(id: number): Promise<number> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                const values: Array<number> = [0, 1]
                const count: number = values[Math.floor(Math.random() * values.length)]
                res(count)
            }, 1000)
        })
    }
}