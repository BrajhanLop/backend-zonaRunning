import {Router} from 'express';
import { routerUser } from './user.router';
import { routerService } from './service.router';
import { routerProfessionals } from './professionals.router';

const globalRouter = Router();

//rutas
globalRouter.use('/professionals', routerProfessionals)
globalRouter.use("/users", routerUser)
globalRouter.use("/services", routerService)


export default globalRouter;
