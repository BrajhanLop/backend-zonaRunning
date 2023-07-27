import {Router} from 'express';
import { routerUser } from './user.router';
import { routerService } from './service.router';
import { routerProfessionals } from './professionals.router';
import { routerAvatar } from './avatar.router';
import { routerClients } from './client.router';
import { citaRouter } from './cita.router';

const globalRouter = Router() ;

//rutas
<<<<<<< HEAD
globalRouter.use('/professionals', routerProfessionals);
globalRouter.use("/users", routerUser);
globalRouter.use("/services", routerService);
globalRouter.use('/avatars', routerAvatar);
globalRouter.use('/availability');
=======
globalRouter.use('/professionals', routerProfessionals)
globalRouter.use('/clients', routerClients )
globalRouter.use("/users", routerUser)
globalRouter.use("/services", routerService)
globalRouter.use("/citas", citaRouter)
globalRouter.use('/avatars', routerAvatar)
>>>>>>> 296d196c8c6dc9d06ef62bda8e8e8536e6bde21d


export default globalRouter;
