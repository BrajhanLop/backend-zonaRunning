import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import globalRouter from './routes';
import errorHandler  from './utils/errorHandler';
import path from 'path';
import fileupload from 'express-fileupload';
import * as dotenv from "dotenv";
dotenv.config();

//esta es nuestra aplicacion
const app = express();

//middlewares
app.use(
    fileupload()
);
app.use(express.json());
app.use(
    helmet({
        crossOriginEmbedderPolicy:false
    })
)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', globalRouter);
app.get("/", async(req:Request, res:Response) => {
    const {
        code
    } = req.query;
   res.redirect(`/api/v1/availability/getToken?code=${code}`);
})

//Middlewares despues de las rutas
app.use(errorHandler)

export default app;