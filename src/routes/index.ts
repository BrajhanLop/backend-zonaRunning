import {Router} from 'express';
import { routerUser } from './user.router';
import { routerService } from './service.router';
import { routerProfessionals } from './professionals.router';
<<<<<<< HEAD
import { routerAvatar } from './avatar.router';
=======
>>>>>>> 84627d5512e05838a7ae26d41f00d382556b5a33

const globalRouter = Router() ;

//rutas
globalRouter.use('/professionals', routerProfessionals)
globalRouter.use("/users", routerUser)
globalRouter.use("/services", routerService)
globalRouter.use('/avatars', routerAvatar)


export default globalRouter;
