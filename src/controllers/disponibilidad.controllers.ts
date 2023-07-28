import { Request, Response } from 'express';
import { catchError } from '../utils/catchError';
import Disponibilidad from '../models/Disponibilidad';
import Cita from '../models/Cita';
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
interface ICreate {
    date: string;
    hours: string[];
    professional: string;
}
export const create = catchError(async (req: Request, res: Response) => {
    const { date, hours, professional }: ICreate = req.body;

    const newBody = {
        disponibilidad: [
            {
                date,
                hours
            }
        ],
        professional
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
    Hour: string[];
}

export const addHour = catchError(async (req: Request, res: Response) => {
    const { id, idDate } = req.params

    try {
        const { Hour }: IAvailability = req.body;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const disponibilidad = await Disponibilidad.findOne(elementMatch);

        if (disponibilidad) {

            const isDispo = disponibilidad.disponibilidad.findIndex( dispo => dispo._id.toString() === idDate);

            let hour: string[] = disponibilidad.disponibilidad[isDispo].horas;

            Hour.forEach(hHoras => {

                if (hour.indexOf(hHoras) < 0) {
                    hour.push(hHoras);
                }
            })

            disponibilidad.disponibilidad[isDispo].horas = hour;
            await disponibilidad.save()

            res.json(disponibilidad);

        } else {
            res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }

    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }

})

//update hour 
interface IUpdateHour {
    cHour: string;
    nHour: string;
}

export const updateHour = catchError(async (req: Request, res: Response) => {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };

        const { cHour, nHour }: IUpdateHour = req.body;

        const disponibilidad = await Disponibilidad.findOne(elementMatch);

        if (disponibilidad) {

            const isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);

            const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(cHour);

            if (index >= 0) {

                disponibilidad.disponibilidad[isDispo].horas.splice(index, 1, nHour);
                await disponibilidad.save();

                res.json(disponibilidad)
            } else {
                res.status(404).json({ error: "La hora no existe en la disponibilidad" });
            }

        } else {
            res.status(404).json({ error: 'profesional o disponibilidad no encontrada' });
        }

    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }

})

interface IDeleteHour {
    Hour: string;
}
export const deleteHour = catchError(async (req: Request, res: Response) => {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };

        const { Hour }: IDeleteHour = req.body;

        const disponibilidad = await Disponibilidad.findOne(elementMatch);

        if (disponibilidad) {

            const isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);

            const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(Hour);

          
            if (index >= 0) {

                disponibilidad.disponibilidad[isDispo].horas.splice(index, 1);
                await disponibilidad.save();

                res.json(disponibilidad)
            }else{
                res.status(404).json({error:"La hora no existe en la disponibilidad"})
            }

        } else {
            res.status(404).json({ error: 'profesional o disponibilidad no encontrada' });
        }

    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }

})

interface ICreateNewAvailability {
    date: string;
    hours: string[];
}

export const createNewAvailability = catchError(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { date, hours }: ICreateNewAvailability = req.body;

        const newBody = { dia: new Date(date), horas: hours }

        const newDisponibilidad = await Disponibilidad.findOneAndUpdate(
            { profesional: id },
            { $push: { disponibilidad: newBody } },
            { new: true });

        if (newDisponibilidad) {
            res.json(newDisponibilidad);
        } else {
            res.status(404).json({ error: 'Disponibilidad no encontrada' })
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

interface ICreateCita {
    hour: string;
    comments: string;
    client: string;
    service: string;
}

export const createCita = catchError(async (req: Request, res: Response) => {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };

        const { hour, comments, client, service }: ICreateCita = req.body;

        const disponibilidad = await Disponibilidad.findOne(elementMatch);

        if (disponibilidad) {

            let isDispo: number = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate)

            let isHour: number = disponibilidad.disponibilidad[isDispo].horas.indexOf(hour);

            if (isHour >= 0) {

                const date: string = disponibilidad.disponibilidad[isDispo].dia;

                const newBody = {
                    date,
                    hour: hour,
                    comments,
                    client,
                    service,
                    professional: id
                }

                const cita = new Cita(newBody);
                await cita.save();

                if (cita) {

                    disponibilidad.disponibilidad[isDispo].horas.splice(isHour, 1);
                    await disponibilidad.save();

                    res.json(cita);

                } else {
                    res.status(404).json({ error: "Error al agendar la cita" });
                }

            } else {
                res.status(404).json({ error: "La hora no existe en la disponibilidad" })
            }

        } else {
            res.status(404).json({ error: "El profesional o la disponibilada no existe" });
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

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

