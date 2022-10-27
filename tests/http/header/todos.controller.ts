import {Controller, Get, Headers} from "../../../lib/decorators";
import {customHeaders} from "./headers";

@Controller('todos')
export class TodosController {

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