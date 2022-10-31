# Easy Express Router for Typescript

Allows us to write express routers in typescript way (class-based, typesafe and asynchronous). It's a pluggable library
so it's totally compatible with legacy codes, not enforcing application to use its styles.

## Installation

```bash
npm i easy-express-router
```

## tsconfig

- This is for typescript only. So we need [typescript](https://www.npmjs.com/package/typescript)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) must be turned on (`tsconfig.json`)

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

# Getting started

- [Usage](#usage)
- [Route Decorators](#route-decorators)
- [Response Decorators](#response-decorators)
- [Enums](#enums)
- [Contributing](#contributing)

# Usage

1. Pretty straight forward, first having routing/Controller class:

```ts
import { Controller } from 'easy-express-router';

@Controller('todos')
class Todos {
  constructor() {}

  @Get('/')
  async find(req: Request, res: Response): Promise<Todo[]> {
    return [];
  }

  @Get('/:id')
  async findOne(req: Request, res: Response): Promise<void> {
    res.json({
      todoId: Number(req.params.id),
      titie: 'lerning js'
    });
  }
}
```

2. Set Controllers

```ts
import { EasyRouter } from 'easy-express-router';

// controllers
const todosController: Todos = new Todos();

EasyRouter.setControllers([todosController]);
```

3. Init to app.use

```ts
import { EasyRouter } from 'easy-express-router';

app.use(EasyRouter.initControllers({ bodyParser: true })); // options is optional
```

#### - and Done! 🧹✅

##### Examples:

- [Todo App](./examples/todo-app)

# Route Decorators

- Get()
- Post()
- Put()
- Patch()
- Delete()
- Head()
- Options()

# Response Decorators

### Headers()

- To specify a custom response header, you can either use @Headers() decorator or a library-specific response object (
  and call res.header() directly).

```ts
import { Controller, EasyRouter } from 'easy-express-router';

@Controller('todos')
class Todos {
  constructor() {}

  @Get('/')
  @Headers({ key: 'Cache-Control', value: 'none' }) //or [{key,value}]
  async find(req: Request, res: Response): Promise<Todo[]> {
    return [];
  }
}
```

# Enums

- HttpStatus

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
