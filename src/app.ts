import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import globalRouter from './router';

//esta es nuestra aplicacion
const app = express();

//middlewares
app.use(express.json());
app.use(
    helmet({
        crossOriginEmbedderPolicy:false
    })
)
app.use(cors());

app.use('/', globalRouter);



export default app;