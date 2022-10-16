import {EasyRouter} from "../lib/easy-router";

import bodyParser from "body-parser";
import {NextFunction, Request, Response} from "express";


describe('EasyRouter', function () {


    it('should Defined', () => {
        expect(EasyRouter).toBeDefined()
    })

    it('should throw error when controllers is empty', () => {
        expect(EasyRouter.initControllers)
            .toThrowError('please first use set Controllers [EasyRouter.setControllers]')
    })
 
});