import { Schema, model, Document } from 'mongoose';

interface IDate {
    dia:string;
    horas: string[];
}

interface IDisponibilidad extends Document {
    disponibilidad: IDate[];
    profesional: Schema.Types.ObjectId;
}

const professionSchema = new Schema<IDisponibilidad>({
    
    disponibilidad: [
        {
            dia: {type: String},
            horas: {type: [String]}
        }
    ],
    profesional: {type: Schema.Types.ObjectId, ref:'Profession', required: true}

});

const ProfessionModel = model<IDisponibilidad>('Profession', professionSchema);

export default ProfessionModel;
