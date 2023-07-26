import {Request, Response} from 'express';
import {catchError} from '../utils/catchError';
import Disponibilidad from '../models/Disponibilidad';
import mongoose from 'mongoose';

//Get all services -------- public endPoint
export const getAll = catchError(async (_req:Request, res:Response): Promise<void> => {
     const disponibilidad = await Disponibilidad.find()
     
     res.json(disponibilidad) 
});

//Post one services ---------- public endPoint
export const create = catchError(async (req:Request, res:Response)=> {
    const body = req.body;

    const disponibilidad = new Disponibilidad(body);
    await disponibilidad.save()

    if(!disponibilidad){
        res.sendStatus(404)
    }else{
        res.sendStatus(201)
    }

});

//Get one --------/services/:id ------- public EndPoint
export const getOne = catchError(async (req:Request, res:Response) => {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{
        const disponibilidad = await Disponibilidad.findById(id);
        res.json(disponibilidad)
    }
})

//Put One --> /services/:id ------- public EndPoint
export const update = catchError(async (req:Request, res:Response)=>{
    const {id} = req.params;
    const body = req.body;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{

        if(Object.keys(body).length == 0){
            res.status(404).json({message:"Empty body"})
        }else{
            const disponibilidad = await Disponibilidad.findByIdAndUpdate(
                {_id:id},
                body,
                {new:true}
            )
                
            if(!disponibilidad){
                res.status(404).json({message:"Disponibilidad not found"});
            }else{
                res.json(disponibilidad)
            }
        }

    }

} )

//Remove One --> /services ----------- public endPont
export const remove = catchError(async (req:Request, res:Response)=> {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({message:"ID invalid"});
    }else{

        const disponibilidad = await Disponibilidad.deleteOne({_id:id});

        if(disponibilidad.deletedCount == 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(204)
        }
    }
})

