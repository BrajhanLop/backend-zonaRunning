import { Request, Response } from 'express';
import { catchError } from '../utils/catchError';
import Disponibilidad from '../models/Disponibilidad';
import mongoose from 'mongoose';

//Get all
export const getAll = catchError(async (_req: Request, res: Response): Promise<void> => {
    const disponibilidad = await Disponibilidad.find()

    res.json(disponibilidad)
});

//Get one --------
export const getOne = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    } else {
        const disponibilidad = await Disponibilidad.findById(id);
        res.json(disponibilidad)
    }
})

//Post create 
interface ICreate{
    dia: string;
	horas: string[];
	profesional:string;
}
export const create = catchError(async (req: Request, res: Response) => {
    const {dia, horas, profesional}:ICreate = req.body;

    const newBody = {
        disponibilidad: [
            {
                dia,
                horas
            }
        ],
        profesional
    }

    const disponibilidad = new Disponibilidad(newBody);
    await disponibilidad.save()

    if (!disponibilidad) {
        res.sendStatus(404)
    } else {
        res.status(201).json(disponibilidad);
    }
});


//Put addNewHour -->
interface IAvailability {
    dia: Date;
    hora: string[];
}

export const addHour = catchError(async (req: Request, res: Response) => {
    const { id, idDate} = req.params

    try {
        const { dia, hora }: IAvailability = req.body;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const disponibilidad = await Disponibilidad.findOne(elementMatch);

        if (disponibilidad) {
            let hour: string[] = disponibilidad.disponibilidad[0].horas;

            hora.forEach(hHoras => {

                if (hour.indexOf(hHoras) < 0) {
                    hour.push(hHoras);
                }
            })

            const newBody = {
                disponibilidad: [
                    {
                        dia: new Date(dia),
                        horas: hour
                    }
                ]
            }

            const updateDipo = await Disponibilidad.findOneAndUpdate(elementMatch, newBody, { new: true });

            if (updateDipo) {
                res.json(updateDipo)
            } else {
                res.status(500).json({ error: "Error no se pudo actualizar la disponibilidad" });
            }

        } else {
            res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }

    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }

})

//update hour 
interface IUpdateHour{
    dia: Date;
    cHora: string;
    nHora: string;
}

export const updateHour = catchError(async (req:Request, res:Response)=> {
  try {
    const{id, idDate} = req.params;
    const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };

    const {dia, cHora, nHora}:IUpdateHour = req.body;

    const disponibilidad = await Disponibilidad.findOne(elementMatch);

    if(disponibilidad){
        const hour:string[] = disponibilidad.disponibilidad[0].horas;

        if(hour.indexOf(cHora) >= 0){   
            if(hour.indexOf(nHora) < 0){
                hour.splice(hour.indexOf(cHora),1,nHora);
            }
        }

        const newBody = {
            disponibilidad: [
                {
                    dia: new Date(dia),
                    horas: hour
                }
            ]
        }

        const updateDisponibilidad = await Disponibilidad.findOneAndUpdate(elementMatch,newBody,{new: true});

        if(updateDisponibilidad){
            res.json(updateDisponibilidad);
        }else{
            res.status(404).json({error: 'No se pudo actualizar la hora'});
        }

    }else{
        res.status(404).json({error: 'profesional o disponibilidad no encontrada'});
    }

  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }
    
})

interface IDeleteHour{
    dia: Date;
    Hora: string;
}
export const deleteHour = catchError(async (req:Request, res:Response)=> {
    try {
      const{id, idDate} = req.params;
      const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
  
      const {dia, Hora}:IDeleteHour = req.body;
  
      const disponibilidad = await Disponibilidad.findOne(elementMatch);
  
      if(disponibilidad){
        
          const hour:string[] = disponibilidad.disponibilidad[0].horas;
          const index = hour.indexOf(Hora);
  
          let updateDisponibilidad;
  
          if(index >= 0){
            hour.splice(index,1);
           
            const newBody = {
                disponibilidad: [
                    {
                        dia: new Date(dia),
                        horas: hour
                    }
                ]
            }
    
             updateDisponibilidad = await Disponibilidad.findOneAndUpdate(elementMatch,newBody,{new: true});
    
          }

          if(updateDisponibilidad){
              res.json(updateDisponibilidad);
          }else{
              res.status(404).json({error: 'No se pudo eliminar la hora | la hora no existe'});
          }
  
      }else{
          res.status(404).json({error: 'profesional o disponibilidad no encontrada'});
      }
  
    } catch (error) {
      console.error(error)
      res.sendStatus(500);
    }
      
  })
  

//Remove One --> 
export const remove = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    } else {

        const disponibilidad = await Disponibilidad.deleteOne({ _id: id });

        if (disponibilidad.deletedCount == 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204)
        }
    }
})

