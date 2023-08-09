import mongoose, {Schema, Document} from 'mongoose';

export interface IAccessToken extends Document{
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
    professional: Schema.Types.ObjectId;
}

const AccessCalendarSchema:Schema = new Schema({
    access_token: {type: String, required: true},
    refresh_token: {type: String, required: true},
    scope: {type: String, required: true},
    token_type: {type: String, required: true},
    expiry_date: {type: Number, required: true},
    professional: {type: Schema.Types.ObjectId, require: true}
});

export default mongoose.model<IAccessToken>('AccessCalendar', AccessCalendarSchema);