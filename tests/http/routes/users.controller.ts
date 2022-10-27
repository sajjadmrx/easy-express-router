import {Controller, Get, Patch, Put} from "../../../lib/decorators";
import {NextFunction, Request, Response} from "express";
import {Middleware} from "../../../lib/shared/custom-types/middleware.type";
import {usersDB} from "./db";


const checkBodyMiddleware: Middleware = (req: Request, res: Response, next: NextFunction) => {
    if (!Object.values(req.body).length)
        res.status(400).send('INVALID_BODY')
    else
        next()
}

@Controller('/users')
export class UsersController {

    @Get('/')
    findAll(req: Request, res: Response) {
        res.status(200).json([])
    }

    @Get('/:userId')
    findByUserId(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        res.status(200).json(user)
    }

    @Put(':userId/username')
    updateRole(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        user.username = 'test';
        res.status(200).json(user)
    }

    @Patch(':userId', {
        middlewares: [checkBodyMiddleware]
    })
    update(req: Request, res: Response) {
        const user = usersDB.find((a: any) => a.id == req.params.userId)
        user.avatar = 'AVATAR';
        user.username = 'test'
        res.status(200).json(user)
    }
}