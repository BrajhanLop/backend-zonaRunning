
import { getAll, create, getOne, update, remove } from '../controllers/disponibilidad.controllers';
import {Router} from 'express'

export const routerService = Router();

routerService.route('/')
    .get(getAll) 
    .post(create) 

routerService.route('/:id')
    .get(getOne) 
    .put(update) 
    .delete(remove)