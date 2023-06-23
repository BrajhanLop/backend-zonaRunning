import {Request, Response} from 'express'
import {catchError} from '../utils/catchError'

import User from '../models/User'

export const getAll = catchError(async(req:Request, res:Response)=> {

         const user = await User.find();

         res.json(user)

})

export const create = catchError(async(req:Request, res:Response)=> {

    const body = req.body;

    const user = new User(body);

    await user.save()

    res.sendStatus(201)

})

export const getOne = catchError(async(req:Request, res:Response)=> {

    const {id} = req.params;

    const user = await User.findById(id);

    res.json(user)

})


export const update = catchError(async(req:Request, res:Response)=> {

    const {id} = req.params;

    const body = req.body;

    const user = await User.findByIdAndUpdate(
        id,
        body
    );

    res.sendStatus(204).json(user)

})