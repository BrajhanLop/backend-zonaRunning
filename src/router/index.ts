import {Router} from 'express';
import { routerUser } from './user.router';

const globalRouter = Router();

//rutas
globalRouter.use("/users", routerUser)


export default globalRouter;
