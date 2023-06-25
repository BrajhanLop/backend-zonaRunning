import {Router} from 'express'
import {create,getOne,getAll,update, remove} from '../controllers/user.controllers'

export const routerUser = Router()


routerUser.route('/')
        .get(getAll) //Getting all users
        .post(create) // Creating a new user

routerUser.route('/:id')
        .get(getOne) //getting one user
        .put(update) //updating one user
        .delete(remove) //removing one user