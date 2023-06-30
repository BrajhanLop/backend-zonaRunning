import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import globalRouter from './routes';
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
app.get("/", (_req:Request, res:Response) => {
        return res.send("Welcome to express")
})

//Middlewares despues de las rutas
app.use(errorHandler)



export default app;