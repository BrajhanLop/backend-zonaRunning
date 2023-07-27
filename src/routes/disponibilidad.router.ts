
import { getAll, create, getOne, remove, addHour, updateHour, deleteHour } from '../controllers/disponibilidad.controllers';
import {Router} from 'express'

export const routerDisponibilidad = Router();

routerDisponibilidad.route('/')
    .get(getAll) 
    .post(create) 


routerDisponibilidad.route('/:id')
    .delete(remove)
    .get(getOne) 

routerDisponibilidad.route('/addNewHour/:id/:idDate')    
    .put(addHour) 

routerDisponibilidad.route('/updateHour/:id/:idDate')
    .put(updateHour)

routerDisponibilidad.route('/deleteHour/:id/:idDate')
    .put(deleteHour);