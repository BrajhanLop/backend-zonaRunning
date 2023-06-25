import { Request, Response } from 'express'
import { catchError } from '../utils/catchError'
import { inteUser } from '../utils/utilIntefaces'

import User from '../models/User'
import mongoose from 'mongoose'


//GET all-> /users ------------ public EndPoint 
export const getAll = catchError(async (_req: Request, res: Response) => {

    const user = await User.find();

    res.json(user)

})

//Post -> /users ------------ public EndPoint 
export const create = catchError(async (req: Request, res: Response) => {

    const {
        First_name,
        Last_name,
        Email,
        Password,
        role
    }: inteUser = req.body;

    const body: inteUser = {
        First_name,
        Last_name,
        Email,
        Password,
        role
    }

    const user = new User(body);

    await user.save()

    if (!user) {
        res.sendStatus(404)

    } else {
        res.sendStatus(201)
    }


})


//GET One -> /users/:id ------------ public EndPoint 
export const getOne = catchError(async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: 'ID invalid' });
    } else {

        const user = await User.findById(id);
        
        res.json(user)
        
    }



})


//Remove One -> /users/:id ------------ public EndPoint 
export const remove = catchError(async (req:Request, res:Response) =>{

    const {id} = req.params


        if(!mongoose.isValidObjectId(id)){
            res.status(404).json({message:"ID invalid"})
        }else{

            const deleteUser = await User.deleteOne({_id:id});

            if(deleteUser.deletedCount == 0){
                res.sendStatus(404);
            }else{
                res.sendStatus(204)
            }
    
        }

   

});

//put One -> /users/:id ------------ public EndPoint 
export const update = catchError(async (req: Request, res: Response) => {

    const { id } = req.params;

    const body:inteUser = req.body;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"})
    }else{

        if(Object.keys(body).length == 0){
            res.status(404).json({message:"Empty body"})
        }else{
            const user = await User.findByIdAndUpdate(
                {_id:id},
                body,
                {new:true}
            );
            
            if(!user){
                res.status(404).json({message:"User not found"})
            }else{
                res.json(user)
            }
        }
    }

   

})