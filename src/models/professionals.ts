import { Schema, model, Document } from 'mongoose';

interface IProfession extends Document {
  especialidad: string;
  rating: number;
  descripcion: string;
  user: Schema.Types.ObjectId
}

const professionSchema = new Schema<IProfession>({
  especialidad: { type: String, required: true },
  rating: { type: Number, required: true },
  descripcion: { type: String, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true }

});

const ProfessionModel = model<IProfession>('Profession', professionSchema);

export default ProfessionModel;
