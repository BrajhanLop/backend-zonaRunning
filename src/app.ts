import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import globalRouter from './router';
import errorHandler  from './utils/errorHandler';

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

app.use('/api/v1', globalRouter);

//Middlewares despues de las rutas
app.use(errorHandler)



export default app;