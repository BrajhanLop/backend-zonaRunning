import {Router} from 'express';

const globalRouter = Router();

//rutas
globalRouter.get('/', (_req, res) => {
    res.send("welcome to express")
})

export default globalRouter;
