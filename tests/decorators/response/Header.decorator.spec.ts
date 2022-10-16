import 'reflect-metadata'


import {Headers} from "../../../lib/decorators";
import {MetaKeys} from "../../../lib/shared/constants/metaKeys.constant";
import {Header} from "../../../lib/shared/interfaces/decorators/headers.interface";

describe('Header()', function () {
    it('should defined', () => {
        expect(Headers).toBeDefined()
    });
    it('should set key value to meta data', () => {
        const myHeader = {key: 'content-type', value: 'application/json'}

        class User {

            @Headers(myHeader)
            findAll() {
            }
        }

        const data = Reflect.getMetadata(MetaKeys.headers, User.prototype.findAll)
        expect(data)
            .toEqual([myHeader])

    });
    it('should set Headers to meta data', () => {
        const headers: Header[] = [
            {key: 'content-type', value: 'application/json'},
            {key: 'content-length', value: '100'},
            {key: 'Access-Control-Allow-Origin', value: '*'}
        ]

        class Posts {
            @Headers(headers)
            find() {
            }
        }

        const data = Reflect.getMetadata(MetaKeys.headers, Posts.prototype.find);
        expect(data)
            .toEqual(headers)
    });
});