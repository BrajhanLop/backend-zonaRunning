import mongoose,{Schema, Document} from 'mongoose'

export interface IUser extends Document{
    firstName:string,
    lastName:string,
    phone:string,
    img:string,
    email:string,
    password:string,
    country:string,
    isVerified:boolean
};

const UserSchema:Schema = new Schema({
    firstName:{},
    lastName:{type: String, required: true},
    phone:{type: String, required: true},
    img:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    country:{type: String, required: true},
    isVerified:{type: Boolean, default: false}
});

export default mongoose.model<IUser>('User', UserSchema);