"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvailability = exports.remove = exports.createCita = exports.createNewAvailability = exports.deleteHour = exports.updateHour = exports.addHour = exports.create = exports.getOne = exports.getAll = void 0;
const catchError_1 = require("../utils/catchError");
const Disponibilidad_1 = __importDefault(require("../models/Disponibilidad"));
const Cita_1 = __importDefault(require("../models/Cita"));
const mongoose_1 = __importDefault(require("mongoose"));
//Get all
exports.getAll = (0, catchError_1.catchError)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const disponibilidad = yield Disponibilidad_1.default.find();
    res.json(disponibilidad);
}));
//Get one --------
exports.getOne = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        const disponibilidad = yield Disponibilidad_1.default.findById(id);
        res.json(disponibilidad);
    }
}));
exports.create = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dia, horas, profesional } = req.body;
    const newBody = {
        disponibilidad: [
            {
                dia,
                horas
            }
        ],
        profesional
    };
    const disponibilidad = new Disponibilidad_1.default(newBody);
    yield disponibilidad.save();
    if (!disponibilidad) {
        res.sendStatus(404);
    }
    else {
        res.status(201).json(disponibilidad);
    }
}));
exports.addHour = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, idDate } = req.params;
    try {
        const { Hour } = req.body;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const disponibilidad = yield Disponibilidad_1.default.findOne(elementMatch);
        if (disponibilidad) {
            const isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);
            let hour = disponibilidad.disponibilidad[isDispo].horas;
            Hour.forEach(hHoras => {
                if (hour.indexOf(hHoras) < 0) {
                    hour.push(hHoras);
                }
            });
            disponibilidad.disponibilidad[isDispo].horas = hour;
            yield disponibilidad.save();
            res.json(disponibilidad);
        }
        else {
            res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
exports.updateHour = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const { cHour, nHour } = req.body;
        const disponibilidad = yield Disponibilidad_1.default.findOne(elementMatch);
        if (disponibilidad) {
            const isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);
            const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(cHour);
            if (index >= 0) {
                disponibilidad.disponibilidad[isDispo].horas.splice(index, 1, nHour);
                yield disponibilidad.save();
                res.json(disponibilidad);
            }
            else {
                res.status(404).json({ error: "La hora no existe en la disponibilidad" });
            }
        }
        else {
            res.status(404).json({ error: 'profesional o disponibilidad no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
exports.deleteHour = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const { Hour } = req.body;
        const disponibilidad = yield Disponibilidad_1.default.findOne(elementMatch);
        if (disponibilidad) {
            const isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);
            const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(Hour);
            if (index >= 0) {
                disponibilidad.disponibilidad[isDispo].horas.splice(index, 1);
                yield disponibilidad.save();
                res.json(disponibilidad);
            }
            else {
                res.status(404).json({ error: "La hora no existe en la disponibilidad" });
            }
        }
        else {
            res.status(404).json({ error: 'profesional o disponibilidad no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
exports.createNewAvailability = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { date, hours } = req.body;
        const newBody = { dia: new Date(date), horas: hours };
        const newDisponibilidad = yield Disponibilidad_1.default.findOneAndUpdate({ profesional: id }, { $push: { disponibilidad: newBody } }, { new: true });
        if (newDisponibilidad) {
            res.json(newDisponibilidad);
        }
        else {
            res.status(404).json({ error: 'Disponibilidad no encontrada' });
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
exports.createCita = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const { hour, comments, client, service } = req.body;
        const disponibilidad = yield Disponibilidad_1.default.findOne(elementMatch);
        if (disponibilidad) {
            let isDispo = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);
            let isHour = disponibilidad.disponibilidad[isDispo].horas.indexOf(hour);
            if (isHour >= 0) {
                const date = disponibilidad.disponibilidad[isDispo].dia;
                const newBody = {
                    date,
                    hour: hour,
                    comments,
                    client,
                    service,
                    professional: id
                };
                const cita = new Cita_1.default(newBody);
                yield cita.save();
                if (cita) {
                    disponibilidad.disponibilidad[isDispo].horas.splice(isHour, 1);
                    yield disponibilidad.save();
                    res.json(cita);
                }
                else {
                    res.status(404).json({ error: "Error al agendar la cita" });
                }
            }
            else {
                res.status(404).json({ error: "La hora no existe en la disponibilidad" });
            }
        }
        else {
            res.status(404).json({ error: "El profesional o la disponibilada no existe" });
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
//Remove One --> 
exports.remove = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" });
    }
    else {
        const disponibilidad = yield Disponibilidad_1.default.deleteOne({ _id: id });
        if (disponibilidad.deletedCount == 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(204);
        }
    }
}));
exports.deleteAvailability = (0, catchError_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idDate } = req.params;
        const elementMatch = { profesional: id, disponibilidad: { $elemMatch: { _id: idDate } } };
        const disponibilidad = yield Disponibilidad_1.default.findOne(elementMatch);
        if (disponibilidad) {
            const index = disponibilidad.disponibilidad.findIndex(dispo => dispo._id.toString() === idDate);
            disponibilidad.disponibilidad.splice(index, 1);
            yield disponibilidad.save();
            res.json(disponibilidad);
        }
        else {
            res.json(404).json({ error: 'Profesional o disponibilidad no encontrada' });
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
