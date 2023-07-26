import {Router} from 'express';
import { routerUser } from './user.router';
import { routerService } from './service.router';
import { routerProfessionals } from './professionals.router';
import { routerAvatar } from './avatar.router';

const globalRouter = Router() ;

//rutas
globalRouter.use('/professionals', routerProfessionals);
globalRouter.use("/users", routerUser);
globalRouter.use("/services", routerService);
globalRouter.use('/avatars', routerAvatar);
globalRouter.use('/availability');


export default globalRouter;
