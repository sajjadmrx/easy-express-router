import {EasyRouter} from "../lib/easy-router";


describe('EasyRouter', function () {


    it('should Defined', () => {
        expect(EasyRouter).toBeDefined()
    })

    it('should throw error when controllers is empty', () => {
        expect(EasyRouter.initControllers)
            .toThrowError('please first use set Controllers [EasyRouter.setControllers]')
    })


});