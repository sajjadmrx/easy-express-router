import express from 'express';
import {EasyRouter} from 'easy-express-router'
import {controllers} from "./controllers/controllers";
import bodyParser from 'body-parser'

const app = express();


EasyRouter.setControllers(controllers)

app.use(bodyParser.json())
app.use(EasyRouter.initControllers())


app.listen(3000, () => {
    console.log(`Running http://localhost:3000`)
})