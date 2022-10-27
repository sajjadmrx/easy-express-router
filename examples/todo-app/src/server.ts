import express from 'express';
import {EasyRouter} from 'easy-express-router'
import {controllers} from "./controllers/controllers";

const app = express();


EasyRouter.setControllers(controllers)

app.use(EasyRouter.initControllers({bodyParser: true}))


app.listen(3000, () => {
    console.log(`Running http://localhost:3000`)
})