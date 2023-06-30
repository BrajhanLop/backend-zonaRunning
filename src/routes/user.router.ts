import {Router} from 'express'
import {create,getOne,getAll,update, remove, login, verifyCode, logged} from '../controllers/user.controllers'
import verifyJWT from '../utils/verifyJWT'

export const routerUser = Router()


routerUser.route('/')
        .get(verifyJWT,getAll) //Getting all users
        .post(create) // Creating a new user 
        
routerUser.route('/login')
        .post(login)

routerUser.route('/me')
        .get(verifyJWT,logged)
        

        
routerUser.route('/:id')
        .get(verifyJWT, getOne) //getting one user
        .put(verifyJWT,update) //updating one user
        .delete(verifyJWT,remove) //removing one user 
        
routerUser.route('/verify/:code')
    .get(verifyCode)