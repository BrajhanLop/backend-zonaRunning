import { Router } from 'express'

export const globalRouter = Router()

// colocar las rutas aquí
globalRouter.get('/', (req, res) => {
    res.send("Welcome to express");
});



