import {Router} from 'express'
import {create,getOne,getAll,update} from '../controllers/user.controllers'

export const routerUser = Router()


routerUser.route('/')
        .get(getAll)
        .post(create)

routerUser.route('/:id')
        .get(getOne)
        .put(update)